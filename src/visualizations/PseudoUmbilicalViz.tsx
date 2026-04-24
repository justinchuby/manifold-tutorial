import { useMemo, useState, useCallback, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';
import { VIZ_CLASSES, VIZ_COLORS } from './theme';

// HSL to hex color for gradient wireframes
function hsl(h: number, s: number, l: number): string {
  const c = new THREE.Color();
  c.setHSL(h, s, l);
  return '#' + c.getHexString();
}

// Example 6.6 from Chen-Li (2004): flat torus τ_a in E⁶ with c# = 4
// τ_a(u,v) = (2/√6a)(cos(au/√2)cos(√3av/√2), cos(au/√2)sin(√3av/√2),
//   cos(√2au)/√2, sin(au/√2)cos(√3av/√2), sin(au/√2)sin(√3av/√2), sin(√2au)/√2)
function torusE6(u: number, v: number, a: number): number[] {
  const s6a = 2 / (Math.sqrt(6) * a);
  const au_s2 = a * u / Math.sqrt(2);
  const av_s32 = Math.sqrt(3) * a * v / Math.sqrt(2);
  const a2u = Math.sqrt(2) * a * u;
  return [
    s6a * Math.cos(au_s2) * Math.cos(av_s32),
    s6a * Math.cos(au_s2) * Math.sin(av_s32),
    s6a * Math.cos(a2u) / Math.sqrt(2),
    s6a * Math.sin(au_s2) * Math.cos(av_s32),
    s6a * Math.sin(au_s2) * Math.sin(av_s32),
    s6a * Math.sin(a2u) / Math.sqrt(2),
  ];
}

// Project 6D point to 3D using a projection matrix
function project6Dto3D(p6: number[], proj: number[][]): THREE.Vector3 {
  return new THREE.Vector3(
    proj[0][0]*p6[0] + proj[0][1]*p6[1] + proj[0][2]*p6[2] + proj[0][3]*p6[3] + proj[0][4]*p6[4] + proj[0][5]*p6[5],
    proj[1][0]*p6[0] + proj[1][1]*p6[1] + proj[1][2]*p6[2] + proj[1][3]*p6[3] + proj[1][4]*p6[4] + proj[1][5]*p6[5],
    proj[2][0]*p6[0] + proj[2][1]*p6[1] + proj[2][2]*p6[2] + proj[2][3]*p6[3] + proj[2][4]*p6[4] + proj[2][5]*p6[5],
  );
}

// Trace a true normal section curve on a parametric surface in E⁶.
// At point (u0,v0), intersects the projected 3D surface with the plane
// containing the tangent to the highlighted curve and the surface normal.
// Uses predictor-corrector marching along the implicit level curve f(u,v)=0.
function traceNormalSection(
  surfaceFunc: (u: number, v: number) => number[],
  u0: number, v0: number,
  proj: number[][],
  tangentDir: 'u' | 'v',
  stepsPerSide: number,
  stepSize: number,
): THREE.Vector3[] {
  const eps = 1e-4;
  const s0 = surfaceFunc(u0, v0);
  if (!s0.every(x => isFinite(x))) return [];
  const p = project6Dto3D(s0, proj);

  const sUp = surfaceFunc(u0 + eps, v0), sUm = surfaceFunc(u0 - eps, v0);
  const sVp = surfaceFunc(u0, v0 + eps), sVm = surfaceFunc(u0, v0 - eps);
  if (![sUp, sUm, sVp, sVm].every(s => s.every(x => isFinite(x)))) return [];

  const pUp = project6Dto3D(sUp, proj), pUm = project6Dto3D(sUm, proj);
  const pVp = project6Dto3D(sVp, proj), pVm = project6Dto3D(sVm, proj);
  const dpdu = new THREE.Vector3().subVectors(pUp, pUm).multiplyScalar(0.5 / eps);
  const dpdv = new THREE.Vector3().subVectors(pVp, pVm).multiplyScalar(0.5 / eps);

  const T = (tangentDir === 'u' ? dpdu.clone() : dpdv.clone()).normalize();
  const N = new THREE.Vector3().crossVectors(dpdu, dpdv).normalize();
  if (N.lengthSq() < 1e-6) return [];
  const B = new THREE.Vector3().crossVectors(T, N).normalize();
  if (B.lengthSq() < 1e-6) return [];

  // f(u,v) = (proj(surface(u,v)) - p) · B = 0 defines the cutting plane
  const px = p.x, py = p.y, pz = p.z;
  const bx = B.x, by = B.y, bz = B.z;
  const f = (u: number, v: number): number => {
    const s = surfaceFunc(u, v);
    if (!s.every(x => isFinite(x))) return NaN;
    const rx = proj[0][0]*s[0]+proj[0][1]*s[1]+proj[0][2]*s[2]+proj[0][3]*s[3]+proj[0][4]*s[4]+proj[0][5]*s[5] - px;
    const ry = proj[1][0]*s[0]+proj[1][1]*s[1]+proj[1][2]*s[2]+proj[1][3]*s[3]+proj[1][4]*s[4]+proj[1][5]*s[5] - py;
    const rz = proj[2][0]*s[0]+proj[2][1]*s[1]+proj[2][2]*s[2]+proj[2][3]*s[3]+proj[2][4]*s[4]+proj[2][5]*s[5] - pz;
    return rx * bx + ry * by + rz * bz;
  };

  const traceSide = (dir: number): THREE.Vector3[] => {
    const pts: THREE.Vector3[] = [];
    let u = u0, v = v0;
    for (let i = 0; i < stepsPerSide; i++) {
      const fu = (f(u + eps, v) - f(u - eps, v)) / (2 * eps);
      const fv = (f(u, v + eps) - f(u, v - eps)) / (2 * eps);
      const gN = Math.sqrt(fu * fu + fv * fv);
      if (gN < 1e-10 || !isFinite(gN)) break;
      // Predictor: step along level curve (perpendicular to gradient)
      u += dir * (-fv / gN) * stepSize;
      v += dir * (fu / gN) * stepSize;
      // Corrector: Newton step back to f=0
      const fVal = f(u, v);
      if (!isFinite(fVal)) break;
      const fu2 = (f(u + eps, v) - f(u - eps, v)) / (2 * eps);
      const fv2 = (f(u, v + eps) - f(u, v - eps)) / (2 * eps);
      const gN2 = fu2 * fu2 + fv2 * fv2;
      if (gN2 > 1e-12) { u -= fVal * fu2 / gN2; v -= fVal * fv2 / gN2; }
      const s = surfaceFunc(u, v);
      if (!s.every(x => isFinite(x))) break;
      pts.push(project6Dto3D(s, proj));
    }
    return pts;
  };

  const fwd = traceSide(1);
  const bwd = traceSide(-1);
  return [...bwd.reverse(), p, ...fwd];
}

// Custom projection panel: 3 rows × 6 columns of sliders
const AXIS_LABELS = ['x₁', 'x₂', 'x₃', 'x₄', 'x₅', 'x₆'];
const ROW_COLORS = ['text-rose-800', 'text-emerald-800', 'text-teal-800'];
const ROW_ACCENTS = ['accent-rose-700', 'accent-emerald-700', 'accent-teal-700'];
const RESET_BUTTON_CLASSES = {
  purple: 'bg-teal-700 hover:bg-teal-800',
  amber: 'bg-amber-700 hover:bg-amber-800',
};

function CustomProjectionPanel({
  matrix, onChange, onReset, accentColor = 'purple'
}: {
  matrix: number[][];
  onChange: (row: number, col: number, val: number) => void;
  onReset: () => void;
  accentColor?: string;
}) {
  return (
    <div className={`${VIZ_CLASSES.panel} mt-2`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-stone-700 font-semibold">🎛️ 自定义投影矩阵 (3×6)</span>
        <button
          onClick={onReset}
          className={`px-2 py-0.5 rounded text-xs text-white ${RESET_BUTTON_CLASSES[accentColor as keyof typeof RESET_BUTTON_CLASSES] ?? RESET_BUTTON_CLASSES.purple}`}
        >
          重置
        </button>
      </div>
      <p className="text-stone-500 text-xs mb-2">
        每行对应3D输出的一个轴，每列对应6D输入的一个分量。拖动滑块调整权重。
      </p>
      <div className="space-y-2">
        {['→ X轴', '→ Y轴', '→ Z轴'].map((label, row) => (
          <div key={row} className="flex items-center gap-1">
            <span className={`text-xs font-mono w-10 ${ROW_COLORS[row]}`}>{label}</span>
            <div className="flex-1 grid grid-cols-6 gap-1">
              {AXIS_LABELS.map((ax, col) => (
                <div key={col} className="flex flex-col items-center">
                  <span className="text-stone-500 text-[9px]">{ax}</span>
                  <input
                    type="range"
                    min={-100}
                    max={100}
                    value={Math.round(matrix[row][col] * 100)}
                    onChange={e => onChange(row, col, Number(e.target.value) / 100)}
                    className={`w-full h-1 ${ROW_ACCENTS[row]}`}
                    style={{ minWidth: 0 }}
                  />
                  <span className={`text-[9px] font-mono ${ROW_COLORS[row]}`}>
                    {matrix[row][col].toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Predefined projections
const PROJECTIONS: { name_zh: string; name_en: string; desc_zh: string; matrix: number[][] }[] = [
  {
    name_zh: '(x₁, x₂, x₃)',
    name_en: '(x₁, x₂, x₃)',
    desc_zh: '只看前3个坐标——相当于从6维空间"正面"看过去，看到环面的cos/sin对称结构。',
    matrix: [[1,0,0,0,0,0],[0,1,0,0,0,0],[0,0,1,0,0,0]]
  },
  {
    name_zh: '(x₄, x₅, x₆)',
    name_en: '(x₄, x₅, x₆)',
    desc_zh: '只看后3个坐标——这是环面"另一半"的投影，与前半结构对称但相位不同。',
    matrix: [[0,0,0,1,0,0],[0,0,0,0,1,0],[0,0,0,0,0,1]]
  },
  {
    name_zh: '(x₁, x₄, x₃)',
    name_en: '(x₁, x₄, x₃)',
    desc_zh: '混合前半和后半坐标——揭示cos与sin分量之间的关联，展现环面的"扭转"特征。',
    matrix: [[1,0,0,0,0,0],[0,0,0,1,0,0],[0,0,1,0,0,0]]
  },
  {
    name_zh: '(x₁, x₂, x₆)',
    name_en: '(x₁, x₂, x₆)',
    desc_zh: '前两个分量配上第六个——第六分量 sin(√2au)/√2 只含u参数，展示环面沿u方向的"高度"变化。',
    matrix: [[1,0,0,0,0,0],[0,1,0,0,0,0],[0,0,0,0,0,1]]
  },
  {
    name_zh: '(x₂, x₃, x₅)',
    name_en: '(x₂, x₃, x₅)',
    desc_zh: '选取不相邻的分量——揭示不同参数方向之间的耦合关系。',
    matrix: [[0,1,0,0,0,0],[0,0,1,0,0,0],[0,0,0,0,1,0]]
  },
  {
    name_zh: '(x₁+x₄, x₂+x₅, x₃+x₆)',
    name_en: '(x₁+x₄, x₂+x₅, x₃+x₆)',
    desc_zh: '把对应的cos和sin分量叠加——看到两组三维子空间如何"协作"构成完整的环面。',
    matrix: [[1,0,0,1,0,0],[0,1,0,0,1,0],[0,0,1,0,0,1]]
  },
  {
    name_zh: '(x₁−x₄, x₂−x₅, x₃−x₆)',
    name_en: '(x₁−x₄, x₂−x₅, x₃−x₆)',
    desc_zh: '对应分量相减——凸显两组子空间的"差异"，形状与叠加投影截然不同。',
    matrix: [[1,0,0,-1,0,0],[0,1,0,0,-1,0],[0,0,1,0,0,-1]]
  },
  {
    name_zh: '对角投影',
    name_en: 'Diagonal',
    desc_zh: '用一组斜角系数混合所有6个坐标——像从"对角线"方向观察，展现整体形态。',
    matrix: [
      [0.7, 0.3, 0, -0.3, 0.5, 0],
      [0, 0.5, 0.5, 0.3, 0, -0.4],
      [0.3, 0, -0.5, 0, 0.3, 0.7]
    ]
  },
];

function PseudoUmbilicalScene({ proj, highlightV, showNormalSection, paused }: { proj: number[][]; highlightV: number; showNormalSection: boolean; paused: boolean }) {
  const [time, setTime] = useState(0);
  const pausedAtRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  useFrame(({ clock }) => {
    if (paused) {
      if (pausedAtRef.current === null) pausedAtRef.current = clock.getElapsedTime();
    } else {
      if (pausedAtRef.current !== null) {
        offsetRef.current += clock.getElapsedTime() - pausedAtRef.current;
        pausedAtRef.current = null;
      }
      setTime(clock.getElapsedTime() - offsetRef.current);
    }
  });

  const a = 1;
  const uPeriod = 2 * Math.PI * Math.sqrt(2) / a;
  const vPeriod = 2 * Math.PI * Math.sqrt(2) / (Math.sqrt(3) * a);

  // Generate surface mesh lines
  const { uLines, vLines } = useMemo(() => {
    const uSteps = 80;
    const vSteps = 80;
    const uL: THREE.Vector3[][] = [];
    const vL: THREE.Vector3[][] = [];

    for (let j = 0; j <= 20; j++) {
      const v = (j / 20) * vPeriod;
      const line: THREE.Vector3[] = [];
      for (let i = 0; i <= uSteps; i++) {
        const u = (i / uSteps) * uPeriod;
        line.push(project6Dto3D(torusE6(u, v, a), proj));
      }
      uL.push(line);
    }
    for (let i = 0; i <= 20; i++) {
      const u = (i / 20) * uPeriod;
      const line: THREE.Vector3[] = [];
      for (let j = 0; j <= vSteps; j++) {
        const v = (j / vSteps) * vPeriod;
        line.push(project6Dto3D(torusE6(u, v, a), proj));
      }
      vL.push(line);
    }
    return { uLines: uL, vLines: vL };
  }, [proj]);

  // Highlighted curve at constant v (u-parameter curve = geodesic)
  const v0 = highlightV * vPeriod;
  const highlightCurve = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 200; i++) {
      const u = (i / 200) * uPeriod;
      pts.push(project6Dto3D(torusE6(u, v0, a), proj));
    }
    return pts;
  }, [proj, v0]);

  const animT = (Math.sin(time * 0.4) + 1) / 2;
  const animIdx = Math.floor(animT * 199);
  const animPt = highlightCurve[animIdx];

  // True normal section: intersection of surface with plane through T and N at animated point
  const normalSection = useMemo(() => {
    if (!showNormalSection) return [];
    const u0 = animT * uPeriod;
    return traceNormalSection(
      (u, v) => torusE6(u, v, a), u0, v0, proj, 'u', 100, 0.025
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proj, showNormalSection, Math.round(animT * 50), v0]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
      {uLines.map((line, i) => (
        <Line key={`u${i}`} points={line} color={hsl(0.48 + (i / uLines.length) * 0.05, 0.32, 0.34 + (i / uLines.length) * 0.15)} lineWidth={1} opacity={0.5} transparent />
      ))}
      {vLines.map((line, i) => (
        <Line key={`v${i}`} points={line} color={hsl(0.08 + (i / vLines.length) * 0.08, 0.42, 0.35 + (i / vLines.length) * 0.16)} lineWidth={1.8} opacity={0.42} transparent />
      ))}
      <Line points={highlightCurve} color={VIZ_COLORS.geodesic} lineWidth={3} />
      {showNormalSection && normalSection.length > 2 && (
        <Line points={normalSection} color={VIZ_COLORS.normalSection} lineWidth={2.5} />
      )}
      {animPt && (
        <mesh position={animPt}>
          <sphereGeometry args={[0.02, 12, 12]} />
          <meshStandardMaterial color={VIZ_COLORS.point} emissive={VIZ_COLORS.point} emissiveIntensity={0.42} />
        </mesh>
      )}
      <OrbitControls enableZoom enablePan={false} />
    </>
  );
}

export function PseudoUmbilicalViz() {
  const [projIndex, setProjIndex] = useState(0);
  const [customMode, setCustomMode] = useState(false);
  const [customMatrix, setCustomMatrix] = useState<number[][]>([[1,0,0,0,0,0],[0,1,0,0,0,0],[0,0,1,0,0,0]]);
  const [highlightV, setHighlightV] = useState(0);
  const [showNormalSection, setShowNormalSection] = useState(false);
  const [paused, setPaused] = useState(false);

  const activeProj = customMode ? customMatrix : PROJECTIONS[projIndex].matrix;

  const handleCustomChange = useCallback((row: number, col: number, val: number) => {
    setCustomMatrix(prev => {
      const next = prev.map(r => [...r]);
      next[row][col] = val;
      return next;
    });
  }, []);

  const handlePresetClick = useCallback((i: number) => {
    setProjIndex(i);
    setCustomMode(false);
  }, []);

  const handleCustomReset = useCallback(() => {
    setCustomMatrix([[1,0,0,0,0,0],[0,1,0,0,0,0],[0,0,1,0,0,0]]);
  }, []);

  return (
    <div>
      <div className={`h-72 mb-3 ${VIZ_CLASSES.canvas}`}>
        <Canvas camera={{ position: [1.5, 1, 1.2], fov: 50 }}>
          <PseudoUmbilicalScene proj={activeProj} highlightV={highlightV} showNormalSection={showNormalSection} paused={paused} />
        </Canvas>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {PROJECTIONS.map((p, i) => (
          <button
            key={i}
            onClick={() => handlePresetClick(i)}
            className={`px-3 py-1 rounded-xl border text-xs transition-all ${
              !customMode && i === projIndex
                ? 'border-teal-600 bg-teal-700/[0.12] text-teal-900'
                : 'border-amber-900/20 bg-white/45 text-stone-700 hover:border-teal-700/45'
            }`}
          >
            {p.name_zh}
          </button>
        ))}
        <button
          onClick={() => { setCustomMode(true); setCustomMatrix(PROJECTIONS[projIndex].matrix.map(r => [...r])); }}
          className={`px-3 py-1 rounded-xl border text-xs transition-all ${
            customMode
              ? 'border-amber-700 bg-amber-700/[0.14] text-amber-900'
              : 'border-amber-900/20 bg-white/45 text-stone-700 hover:border-amber-700/45'
          }`}
        >
          🎛️ 自定义
        </button>
      </div>
      {customMode ? (
        <CustomProjectionPanel
          matrix={customMatrix}
          onChange={handleCustomChange}
          onReset={handleCustomReset}
          accentColor="purple"
        />
      ) : (
        <p className="text-stone-500 text-xs mb-2 italic">{PROJECTIONS[projIndex].desc_zh}</p>
      )}
      <div className="flex items-center gap-3 text-xs text-stone-600 mt-2">
        <span className="text-teal-800 font-mono whitespace-nowrap">
          v₀ = {(highlightV * 100).toFixed(0)}% · T<sub>v</sub>
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(highlightV * 100)}
          onChange={e => setHighlightV(Number(e.target.value) / 100)}
          className="flex-1 accent-teal-700"
        />
        <button
          onClick={() => setHighlightV(0)}
          className="px-2 py-0.5 rounded bg-white/55 hover:bg-white/80 text-stone-700 border border-amber-900/20"
        >
          v=0
        </button>
        <button
          onClick={() => setShowNormalSection(v => !v)}
          className={`px-2 py-0.5 rounded text-xs transition-colors ${
            showNormalSection ? 'bg-rose-700 text-white' : 'bg-white/55 text-stone-700 border border-amber-900/20 hover:bg-white/80'
          }`}
        >
          法截线
        </button>
        <button
          onClick={() => setPaused(v => !v)}
          className={`px-2 py-0.5 rounded text-xs transition-colors ${
            paused ? 'bg-amber-700 text-white' : 'bg-white/55 text-stone-700 border border-amber-900/20 hover:bg-white/80'
          }`}
        >
          {paused ? '▶' : '⏸'}
        </button>
      </div>
    </div>
  );
}

// Formula (10.20) from Chen-Li: first explicit non-spherical pseudo-umbilical surface
// ψ(u,v) with parameters a > 0, c > 0
// β = 2(a² + 6c²)/3, δ = (2/3)√(a⁴ + 6a²c² + 36c⁴)
function nonSphericalPU(u: number, v: number, a: number, c: number): number[] {
  const s3 = Math.sqrt(3);
  const s2 = Math.sqrt(2);
  const au_s3 = a * u / s3;
  const av_s3 = a * v / s3;
  const cos2 = Math.cos(au_s3) * Math.cos(au_s3);
  const tanAu = Math.tan(au_s3);

  const beta = 2 * (a * a + 6 * c * c) / 3;
  const delta = (2 / 3) * Math.sqrt(a * a * a * a + 6 * a * a * c * c + 36 * c * c * c * c);
  const sqBpD = Math.sqrt(beta + delta);
  const sqBmD = Math.sqrt(Math.abs(beta - delta));
  const sinBmV = Math.sin(sqBmD * v);
  const sinBpV = Math.sin(sqBpD * v);
  const cosBmV = Math.cos(sqBmD * v);
  const cosBpV = Math.cos(sqBpD * v);
  const a2 = a * a;

  const x1 = cos2 * (s3 / a) * tanAu * Math.cos(av_s3);
  const x2 = cos2 * (s3 / a) * tanAu * Math.sin(av_s3);
  const x3 = cos2 * (
    (3 * delta + 3 * beta - 4 * a2) * sinBmV / (6 * delta * sqBmD)
    + (3 * delta - 3 * beta + 4 * a2) * sinBpV / (6 * delta * sqBpD)
  );
  const x4 = cos2 * (
    s2 * a * c * sinBmV / (delta * sqBpD)
    - s2 * a * c * sinBpV / (delta * sqBmD)
  );
  const x5 = cos2 * (
    (2 * a2 - 3 * beta - 3 * delta) * cosBmV / (4 * a * delta)
    - (2 * a2 - 3 * beta + 3 * delta) * cosBpV / (4 * a * delta)
  );
  const x6 = cos2 * (
    (2 * a2 + 3 * beta + 3 * delta) * cosBmV / (4 * s3 * a * delta)
    - (2 * a2 + 3 * beta - 3 * delta) * cosBpV / (4 * s3 * a * delta)
  );
  return [x1, x2, x3, x4, x5, x6];
}

const NS_PROJECTIONS: { name_zh: string; name_en: string; desc_zh: string; matrix: number[][] }[] = [
  {
    name_zh: '(x₁, x₂, x₃)',
    name_en: '(x₁, x₂, x₃)',
    desc_zh: '前两个分量是旋转面(cos·tan, sin·tan)——展示曲面如何从赤道向两极"张开"。第三分量是高维振荡项。',
    matrix: [[1,0,0,0,0,0],[0,1,0,0,0,0],[0,0,1,0,0,0]]
  },
  {
    name_zh: '(x₁, x₂, x₄)',
    name_en: '(x₁, x₂, x₄)',
    desc_zh: '旋转面 + 第四分量(sin振荡)——第四分量含√2·ac项，直接反映参数c对曲面形状的影响。',
    matrix: [[1,0,0,0,0,0],[0,1,0,0,0,0],[0,0,0,1,0,0]]
  },
  {
    name_zh: '(x₁, x₂, x₅)',
    name_en: '(x₁, x₂, x₅)',
    desc_zh: '旋转面分量 + 第五分量(cos组合)——看到非球面性质：不同纬度的曲线半径不再均匀。',
    matrix: [[1,0,0,0,0,0],[0,1,0,0,0,0],[0,0,0,0,1,0]]
  },
  {
    name_zh: '(x₁, x₂, x₆)',
    name_en: '(x₁, x₂, x₆)',
    desc_zh: '旋转面 + 第六分量——x₆含有√3因子，展现另一种高维振荡模式。',
    matrix: [[1,0,0,0,0,0],[0,1,0,0,0,0],[0,0,0,0,0,1]]
  },
  {
    name_zh: '(x₃, x₄, x₅)',
    name_en: '(x₃, x₄, x₅)',
    desc_zh: '只看高维振荡分量——这些是球面上看不到的"隐藏维度"，它们携带了非球面的关键信息。',
    matrix: [[0,0,1,0,0,0],[0,0,0,1,0,0],[0,0,0,0,1,0]]
  },
  {
    name_zh: '(x₃, x₅, x₆)',
    name_en: '(x₃, x₅, x₆)',
    desc_zh: '三个cos/sin组合分量——纯粹的振荡视角，看到v参数产生的复杂波动图案。',
    matrix: [[0,0,1,0,0,0],[0,0,0,0,1,0],[0,0,0,0,0,1]]
  },
  {
    name_zh: '(x₄, x₅, x₆)',
    name_en: '(x₄, x₅, x₆)',
    desc_zh: '后三个分量——完全在"隐藏维度"中观察，旋转面结构消失，只剩高维波动。',
    matrix: [[0,0,0,1,0,0],[0,0,0,0,1,0],[0,0,0,0,0,1]]
  },
  {
    name_zh: '混合投影',
    name_en: 'Mixed',
    desc_zh: '以斜角混合全部6个坐标——从"对角线"方向观察，综合展现曲面的整体几何形态。',
    matrix: [
      [0.6, 0.3, 0, -0.3, 0.5, 0],
      [0, 0.5, 0.4, 0.3, 0, -0.3],
      [0.3, 0, -0.4, 0, 0.3, 0.6]
    ]
  },
];

function NonSphericalScene({ proj, highlightU, showNormalSection, paused }: { proj: number[][]; highlightU: number; showNormalSection: boolean; paused: boolean }) {
  const [time, setTime] = useState(0);
  const pausedAtRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  useFrame(({ clock }) => {
    if (paused) {
      if (pausedAtRef.current === null) pausedAtRef.current = clock.getElapsedTime();
    } else {
      if (pausedAtRef.current !== null) {
        offsetRef.current += clock.getElapsedTime() - pausedAtRef.current;
        pausedAtRef.current = null;
      }
      setTime(clock.getElapsedTime() - offsetRef.current);
    }
  });

  const a = 1.0, c = 0.5;
  const uMax = Math.sqrt(3) * Math.PI / (2 * a) * 0.995;
  const vMax = 2 * Math.PI * Math.sqrt(3) / a;

  const { uLines, vLines } = useMemo(() => {
    const uSteps = 60;
    const vSteps = 80;
    const uL: THREE.Vector3[][] = [];
    const vL: THREE.Vector3[][] = [];

    for (let j = 0; j <= 16; j++) {
      const v = (j / 16) * vMax;
      const line: THREE.Vector3[] = [];
      for (let i = 0; i <= uSteps; i++) {
        const u = -uMax + (i / uSteps) * 2 * uMax;
        const p6 = nonSphericalPU(u, v, a, c);
        if (p6.every(x => isFinite(x))) line.push(project6Dto3D(p6, proj));
      }
      if (line.length > 2) uL.push(line);
    }
    for (let i = 0; i <= 16; i++) {
      const u = -uMax + (i / 16) * 2 * uMax;
      const line: THREE.Vector3[] = [];
      for (let j = 0; j <= vSteps; j++) {
        const v = (j / vSteps) * vMax;
        const p6 = nonSphericalPU(u, v, a, c);
        if (p6.every(x => isFinite(x))) line.push(project6Dto3D(p6, proj));
      }
      if (line.length > 2) vL.push(line);
    }
    return { uLines: uL, vLines: vL };
  }, [proj]);

  // Highlighted u-curve (geodesic direction)
  const highlightCurve = useMemo(() => {
    const uVal = highlightU * uMax;
    const pts: THREE.Vector3[] = [];
    for (let j = 0; j <= 200; j++) {
      const v = (j / 200) * vMax;
      const p6 = nonSphericalPU(uVal, v, a, c);
      if (p6.every(x => isFinite(x))) pts.push(project6Dto3D(p6, proj));
    }
    return pts;
  }, [proj, highlightU]);

  // Normal section: true normal section through the animated point
  const animT = (Math.sin(time * 0.3) + 1) / 2;
  const animIdx = Math.floor(animT * (highlightCurve.length - 1));
  const animPt = highlightCurve[animIdx];

  // True normal section: intersection of surface with plane through T and N at animated point
  const normalSection = useMemo(() => {
    if (!showNormalSection) return [];
    const uVal = highlightU * uMax;
    const vVal = animT * vMax;
    return traceNormalSection(
      (u, v) => nonSphericalPU(u, v, a, c), uVal, vVal, proj, 'v', 80, 0.04
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proj, showNormalSection, Math.round(animT * 50), highlightU]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
      {uLines.map((line, i) => (
        <Line key={`u${i}`} points={line} color={hsl(0.02 + (i / uLines.length) * 0.08, 0.45, 0.36 + (i / uLines.length) * 0.15)} lineWidth={1} opacity={0.5} transparent />
      ))}
      {vLines.map((line, i) => (
        <Line key={`v${i}`} points={line} color={hsl(0.46 + (i / vLines.length) * 0.06, 0.34, 0.32 + (i / vLines.length) * 0.18)} lineWidth={1.8} opacity={0.42} transparent />
      ))}
      {highlightCurve.length > 2 && (
        <Line points={highlightCurve} color={VIZ_COLORS.tangent} lineWidth={3} />
      )}
      {showNormalSection && normalSection.length > 2 && (
        <Line points={normalSection} color={VIZ_COLORS.normalSection} lineWidth={2.5} />
      )}
      {animPt && (
        <mesh position={animPt}>
          <sphereGeometry args={[0.015, 12, 12]} />
          <meshStandardMaterial color={VIZ_COLORS.point} emissive={VIZ_COLORS.point} emissiveIntensity={0.42} />
        </mesh>
      )}
      <OrbitControls enableZoom enablePan={false} />
    </>
  );
}

export function NonSphericalPUViz() {
  const [projIndex, setProjIndex] = useState(0);
  const [customMode, setCustomMode] = useState(false);
  const [customMatrix, setCustomMatrix] = useState<number[][]>([[1,0,0,0,0,0],[0,1,0,0,0,0],[0,0,1,0,0,0]]);
  const [highlightU, setHighlightU] = useState(0);
  const [showNormalSection, setShowNormalSection] = useState(true);
  const [paused, setPaused] = useState(false);

  const activeProj = customMode ? customMatrix : NS_PROJECTIONS[projIndex].matrix;

  const handleCustomChange = useCallback((row: number, col: number, val: number) => {
    setCustomMatrix(prev => {
      const next = prev.map(r => [...r]);
      next[row][col] = val;
      return next;
    });
  }, []);

  const handlePresetClick = useCallback((i: number) => {
    setProjIndex(i);
    setCustomMode(false);
  }, []);

  const handleCustomReset = useCallback(() => {
    setCustomMatrix([[1,0,0,0,0,0],[0,1,0,0,0,0],[0,0,1,0,0,0]]);
  }, []);

  return (
    <div>
      <div className={`h-72 mb-3 ${VIZ_CLASSES.canvas}`}>
        <Canvas camera={{ position: [2, 1.5, 1.5], fov: 50 }}>
          <NonSphericalScene proj={activeProj} highlightU={highlightU} showNormalSection={showNormalSection} paused={paused} />
        </Canvas>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {NS_PROJECTIONS.map((p, i) => (
          <button
            key={i}
            onClick={() => handlePresetClick(i)}
            className={`px-3 py-1 rounded-xl border text-xs transition-all ${
              !customMode && i === projIndex
                ? 'border-amber-700 bg-amber-700/[0.14] text-amber-900'
                : 'border-amber-900/20 bg-white/45 text-stone-700 hover:border-amber-700/45'
            }`}
          >
            {p.name_zh}
          </button>
        ))}
        <button
          onClick={() => { setCustomMode(true); setCustomMatrix(NS_PROJECTIONS[projIndex].matrix.map(r => [...r])); }}
          className={`px-3 py-1 rounded-xl border text-xs transition-all ${
            customMode
              ? 'border-amber-700 bg-amber-700/[0.14] text-amber-900'
              : 'border-amber-900/20 bg-white/45 text-stone-700 hover:border-amber-700/45'
          }`}
        >
          🎛️ 自定义
        </button>
      </div>
      {customMode ? (
        <CustomProjectionPanel
          matrix={customMatrix}
          onChange={handleCustomChange}
          onReset={handleCustomReset}
          accentColor="amber"
        />
      ) : (
        <p className="text-stone-500 text-xs mb-2 italic">{NS_PROJECTIONS[projIndex].desc_zh}</p>
      )}
      <div className="flex items-center gap-3 text-xs text-stone-600 mt-2">
        <span className="text-emerald-800 font-mono whitespace-nowrap">
          u = {highlightU === 0 ? '0' : (highlightU > 0 ? '+' : '') + (highlightU * 0.92).toFixed(2)} · u<sub>max</sub>
        </span>
        <input
          type="range"
          min={-100}
          max={100}
          value={Math.round(highlightU * 100)}
          onChange={e => setHighlightU(Number(e.target.value) / 100)}
          className="flex-1 accent-emerald-700"
        />
        <button
          onClick={() => setHighlightU(0)}
          className="px-2 py-0.5 rounded bg-white/55 hover:bg-white/80 text-stone-700 border border-amber-900/20"
        >
          赤道
        </button>
        <button
          onClick={() => setShowNormalSection(v => !v)}
          className={`px-2 py-0.5 rounded text-xs transition-colors ${
            showNormalSection ? 'bg-rose-700 text-white' : 'bg-white/55 text-stone-700 border border-amber-900/20 hover:bg-white/80'
          }`}
        >
          法截线
        </button>
        <button
          onClick={() => setPaused(v => !v)}
          className={`px-2 py-0.5 rounded text-xs transition-colors ${
            paused ? 'bg-amber-700 text-white' : 'bg-white/55 text-stone-700 border border-amber-900/20 hover:bg-white/80'
          }`}
        >
          {paused ? '▶' : '⏸'}
        </button>
      </div>
    </div>
  );
}
