import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MathBlock, Tooltip } from '../components';
import { NormalSectionVizWithLabels, Chapter4VizCollection, EmbeddingComparisonVizWithLabels } from '../visualizations';

export default function Chapter4() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="chapter-anchor" aria-hidden="true">🍊</span>
          <p className="text-cyan-400 text-sm">{t('nav.chapter', { num: 4 })}</p>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">{t('chapters.ch4.title')}</h1>
        <p className="text-slate-400">{t('chapters.ch4.subtitle')}</p>
      </header>

      <div className="space-y-8">
        {/* Intro analogy */}
        <section className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-amber-900/20">
          <h2 className="text-xl font-semibold text-purple-400 mb-4">{isZh ? '🍊 切橙子' : '🍊 Slicing an Orange'}
          </h2>
          <p className="text-slate-300 mb-4">{isZh
              ? '想象你有一个橙子（球面）。用刀切一刀会得到什么？一个圆！这个圆就是平面与球面的"截面"。法截线就是这个想法的精确数学版本。'
              : 'Imagine you have an orange (sphere). What do you get if you cut it with a knife? A circle! This circle is the "section" where the plane meets the sphere. Normal section is the precise mathematical version of this idea.'}
          </p>
          <div className="bg-slate-900 rounded-lg p-4">
            <p className="text-cyan-400 font-semibold mb-2">{isZh ? '关键问题' : 'Key Question'}
            </p>
            <p className="text-slate-300 text-sm">{isZh
                ? '如果我们不是随意切，而是沿着特定方向切，会得到什么曲线？这条曲线和流形上的测地线有什么关系？'
                : 'If we cut not randomly, but along a specific direction, what curve do we get? How is this curve related to the geodesic on the manifold?'}
            </p>
          </div>
        </section>

        {/* Section 4.1 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-4.1" className="text-xl font-semibold text-cyan-400 mb-4">{isZh ? '4.1 法截线的几何构造' : '4.1 Geometric Construction of Normal Section'}
          </h2>

          <p className="text-slate-300 mb-4">{isZh
              ? '给定子流形M上的一点p和单位切向量u，我们要构造一个特殊的"切割平面"。'
              : 'Given a point p on submanifold M and a unit tangent vector u, we want to construct a special "cutting plane".'}
          </p>

          {/* Why this construction */}
          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-amber-900/20 mb-4">
            <p className="text-yellow-400 font-semibold mb-2">{isZh ? '为什么要用法空间构造切割平面？' : 'Why Use Normal Space to Construct Cutting Plane?'}
            </p>
            <p className="text-slate-300 text-sm">{isZh
                ? '我们想要一个"最自然"的切割方式。法空间是与子流形垂直的所有方向。用切向量u和法空间张成的平面，恰好是包含u且最"直接地穿过"子流形的方式。这样得到的曲线能最好地反映子流形沿u方向的几何性质。'
                : 'We want the "most natural" way to cut. Normal space contains all directions perpendicular to the submanifold. The plane spanned by tangent u and normal space is exactly the plane containing u that passes "most directly" through the submanifold. The resulting curve best reflects the geometric properties of the submanifold in direction u.'}
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">{isZh ? '构造步骤' : 'Construction Steps'}
            </p>
            <ol className="text-slate-300 space-y-2 list-decimal list-inside">
              <li>{isZh ? '取点p和方向u' : 'Take point p and direction u'}</li>
              <li>{isZh ? '取p处的整个法空间 T⊥_pM' : 'Take the entire normal space T⊥_pM at p'}</li>
              <li>{isZh ? '用u和T⊥_pM张成一个子空间' : 'Span a subspace using u and T⊥_pM'}</li>
              <li>{isZh ? '这个子空间与M的交线就是法截线βᵤ' : 'The intersection of this subspace with M is the normal section β_u'}</li>
            </ol>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-cyan-300 font-semibold mb-2">{isZh ? <><Tooltip term="affine-subspace">仿射子空间</Tooltip> E(p, u)</> : <><Tooltip term="affine-subspace">Affine Subspace</Tooltip> E(p, u)</>}
            </p>
            <MathBlock>{'E(p, u) = p + \\text{span}\\{u\\} + T^\\perp_p M'}</MathBlock>
            <p className="text-slate-400 text-sm mt-2">{isZh
                ? '维数 = 1 + (m-n) = m-n+1，其中m是环境空间维数，n是子流形维数。'
                : 'Dimension = 1 + (m-n) = m-n+1, where m is ambient dimension, n is submanifold dimension.'}
            </p>
          </div>
        </section>

        {/* Visual example */}
        <section className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-xl p-6 border border-amber-900/20">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">{isZh ? '具体例子' : 'Concrete Example'}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-900 rounded-lg p-4">
              <h3 className="text-cyan-400 font-semibold mb-2">{isZh ? '球面 S² ⊂ E³' : 'Sphere S² ⊂ E³'}
              </h3>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• m = 3, n = 2, {isZh ? '余维数' : 'codim'} = 1</li>
                <li>• T⊥_pM = {isZh ? '法线方向（1维）' : 'normal direction (1D)'}</li>
                <li>• E(p,u) = {isZh ? '过p的2维平面' : '2D plane through p'}</li>
                <li>• β_u = {isZh ? '平面与球面的交线 = 圆！' : 'plane ∩ sphere = circle!'}</li>
              </ul>
            </div>
            <div className="bg-slate-900 rounded-lg p-4">
              <h3 className="text-purple-400 font-semibold mb-2">{isZh ? '曲面 M² ⊂ E⁶' : 'Surface M² ⊂ E⁶'}
              </h3>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• m = 6, n = 2, {isZh ? '余维数' : 'codim'} = 4</li>
                <li>• T⊥_pM = {isZh ? '4维法空间' : '4D normal space'}</li>
                <li>• E(p,u) = {isZh ? <><Tooltip term="affine-subspace">5维仿射子空间</Tooltip></> : <><Tooltip term="affine-subspace">5D affine subspace</Tooltip></>}</li>
                <li>• β_u = {isZh ? '复杂曲线' : 'complex curve'}</li>
              </ul>
              <p className="text-yellow-400 text-xs mt-2">{isZh ? '这是Chen-Li论文的重要研究对象！' : 'This is a key subject in Chen-Li\'s paper!'}
              </p>
            </div>
          </div>
        </section>

        {/* Interactive visualization - after normal section concept introduced */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">{isZh ? '交互可视化：法截线构造' : 'Interactive: Normal Section Construction'}
          </h2>
          <NormalSectionVizWithLabels />
          <p className="text-slate-400 text-sm mt-4">{isZh
              ? '拖动旋转。观察切向量与法向量如何确定切割平面，并在球面上产生法截线。'
              : 'Drag to rotate. See how the tangent and normal vectors determine the cutting plane and produce the normal section on the sphere.'}
          </p>
        </section>

        {/* Section 4.2 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-4.2" className="text-xl font-semibold text-cyan-400 mb-4">{isZh ? '4.2 法截线的参数化' : '4.2 Parametrization of Normal Section'}
          </h2>

          <p className="text-slate-300 mb-4">{isZh
              ? '法截线 β_u 是一条曲线，我们用弧长参数化它：'
              : 'The normal section β_u is a curve, which we parametrize by arc length:'}
          </p>

          <div className="bg-slate-800 rounded-lg p-4">
            <MathBlock>{'\\beta_u(0) = p, \\quad \\beta_u\'(0) = u, \\quad |\\beta_u\'(s)| = 1'}</MathBlock>
            <p className="text-slate-400 text-sm mt-2">{isZh
                ? '注意：和测地线一样，法截线也过点p，初始方向也是u。'
                : 'Note: Like the geodesic, the normal section also passes through p with initial direction u.'}
            </p>
          </div>
        </section>

        {/* Section 4.3 - Key comparison */}
        <section className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl p-6 border border-amber-900/20">
          <h2 id="section-4.3" className="text-xl font-semibold text-green-400 mb-4">{isZh ? '4.3 测地线 vs 法截线' : '4.3 Geodesic vs Normal Section'}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-slate-600">
                  <th className="py-2 text-slate-400"></th>
                  <th className="py-2 text-cyan-400">{isZh ? '测地线 γ_u' : 'Geodesic γ_u'}</th>
                  <th className="py-2 text-purple-400">{isZh ? '法截线 β_u' : 'Normal Section β_u'}</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-slate-700">
                  <td className="py-2 text-slate-400">{isZh ? '定义方式' : 'Definition'}</td>
                  <td className="py-2">{isZh ? '内蕴（协变导数=0）' : 'Intrinsic (∇γ\'γ\'=0)'}</td>
                  <td className="py-2">{isZh ? '外蕴（平面切割）' : 'Extrinsic (plane cutting)'}</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="py-2 text-slate-400">{isZh ? '完全在M上？' : 'Entirely on M?'}</td>
                  <td className="py-2">✓</td>
                  <td className="py-2">✓</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="py-2 text-slate-400">{isZh ? '起点' : 'Start point'}</td>
                  <td className="py-2">γ_u(0) = p</td>
                  <td className="py-2">β_u(0) = p</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="py-2 text-slate-400">{isZh ? '初始方向' : 'Initial direction'}</td>
                  <td className="py-2">γ'_u(0) = u</td>
                  <td className="py-2">β'_u(0) = u</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="py-2 text-slate-400">{isZh ? '依赖嵌入？' : 'Depends on embedding?'}</td>
                  <td className="py-2">✗</td>
                  <td className="py-2">✓</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 bg-slate-900 rounded-lg p-4">
            <p className="text-yellow-400 font-semibold mb-2">{isZh ? '核心问题' : 'Core Question'}
            </p>
            <p className="text-slate-300">{isZh
                ? '两条曲线起点相同、初始方向相同，但之后会分开吗？如果是，从第几阶导数开始分开？'
                : 'Two curves with the same starting point and initial direction—but do they diverge afterward? If so, from which derivative order do they diverge?'}
            </p>
            <p className="text-cyan-400 font-semibold mt-2">{isZh ? '下一章，我们将精确定义这个"分开的阶数"！' : 'In the next chapter, we\'ll precisely define this "order of divergence"!'}
            </p>
          </div>

          {/* Cylinder Example */}
          <div className="mt-4 bg-gradient-to-r from-orange-900/30 to-yellow-900/30 rounded-lg p-4 border border-amber-900/20">
            <p className="text-orange-400 font-semibold mb-3">{isZh ? '经典例子：圆柱面' : 'Classic Example: Cylinder'}
            </p>
            <p className="text-slate-300 text-sm mb-4">{isZh
                ? '圆柱面是理解测地线与法截线关系的绝佳例子，因为不同方向的测地线形态完全不同！'
                : 'The cylinder is a perfect example for understanding geodesic vs normal section, because geodesics look completely different in different directions!'}
            </p>

            <div className="grid md:grid-cols-3 gap-3 mb-4">
              <div className="bg-slate-800 rounded-lg p-3">
                <p className="text-cyan-400 font-semibold text-sm mb-2">{isZh ? '沿轴向（竖直）' : 'Along axis (vertical)'}
                </p>
                <p className="text-slate-400 text-xs mb-2">{isZh ? '测地线：直线↕' : 'Geodesic: straight line ↕'}
                </p>
                <p className="text-slate-400 text-xs mb-2">{isZh ? '法截线：同样是直线' : 'Normal section: also straight line'}
                </p>
                <p className="text-green-400 text-xs">
                  ✓ γ = β ({isZh ? '完全一致！' : 'identical!'})
                </p>
              </div>

              <div className="bg-slate-800 rounded-lg p-3">
                <p className="text-purple-400 font-semibold text-sm mb-2">{isZh ? '环绕方向（水平）' : 'Around (horizontal)'}
                </p>
                <p className="text-slate-400 text-xs mb-2">{isZh ? '测地线：圆⭕' : 'Geodesic: circle ⭕'}
                </p>
                <p className="text-slate-400 text-xs mb-2">{isZh ? '法截线：同样是圆' : 'Normal section: also circle'}
                </p>
                <p className="text-green-400 text-xs">
                  ✓ γ = β ({isZh ? '完全一致！' : 'identical!'})
                </p>
              </div>

              <div className="bg-slate-800 rounded-lg p-3">
                <p className="text-yellow-400 font-semibold text-sm mb-2">{isZh ? '斜向（螺旋）' : 'Diagonal (helix)'}
                </p>
                <p className="text-slate-400 text-xs mb-2">{isZh ? '测地线：螺旋线' : 'Geodesic: helix '}
                </p>
                <p className="text-slate-400 text-xs mb-2">{isZh ? '法截线：椭圆' : 'Normal section: ellipse'}
                </p>
                <p className="text-red-400 text-xs">
                  ✗ γ ≠ β ({isZh ? '不同！' : 'different!'})
                </p>
              </div>
            </div>

            <div className="bg-slate-900 rounded-lg p-3">
              <p className="text-cyan-400 font-semibold text-sm mb-2">{isZh ? '深入分析' : 'Deep Analysis'}
              </p>
              <div className="text-slate-300 text-xs space-y-2">
                <p>{isZh
                    ? '为什么斜向测地线是螺旋线？因为在圆柱面上，你沿斜向走"最短路径"时，会一边前进一边绕圈——这就是螺旋线！如果你展开圆柱面成平面，螺旋线会变成直线。'
                    : 'Why is the diagonal geodesic a helix? Because on a cylinder, walking the "shortest path" diagonally means advancing while circling—that\'s a helix! If you unroll the cylinder flat, the helix becomes a straight line.'}
                </p>
                <p>{isZh
                    ? '为什么斜向法截线是椭圆？法截线是用包含切线和法向的平面切圆柱。斜切圆柱得到的是椭圆（想象斜切香肠）！'
                    : 'Why is the diagonal normal section an ellipse? Normal section uses a plane containing tangent and normal to cut the cylinder. Cutting a cylinder at an angle gives an ellipse (imagine cutting a sausage diagonally)!'}
                </p>
              </div>
            </div>

            <div className="mt-3 bg-green-900/30 rounded-lg p-3 border border-amber-900/20">
              <p className="text-green-400 font-semibold text-sm mb-1">{isZh ? '预告' : 'Preview'}
              </p>
              <p className="text-slate-300 text-xs">{isZh
                  ? '圆柱面上，轴向和环向的测地线与法截线完全一致，但斜向只有前2阶导数相同。下一章将引入一个数来精确描述这种差异——对每个方向取"吻合的最高阶数"，再取所有方向的最小值。'
                  : 'On a cylinder, axial and circumferential geodesics match normal sections exactly, but diagonally only the first 2 derivatives match. The next chapter will introduce a number to precisely describe this—the highest matching order for each direction, then the minimum over all directions.'}
              </p>
            </div>
          </div>
        </section>

        {/* Comprehensive visualizations */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">{isZh ? '深入可视化：测地线与法截线的关系' : 'Deep Dive: Geodesic vs Normal Section Relationship'}
          </h2>
          <Chapter4VizCollection />
        </section>

        {/* Section 4.4 */}
        <section className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-xl p-6 border-2 border-amber-900/20">
          <h2 id="section-4.4" className="text-xl font-semibold text-red-400 mb-4">{isZh ? '4.4 为什么比较它们？' : '4.4 Why Compare Them?'}
          </h2>

          <div className="space-y-4">
            <div className="bg-slate-900 rounded-lg p-4">
              <h3 className="text-cyan-400 font-semibold mb-2">{isZh ? '测地线 = 内蕴几何' : 'Geodesic = Intrinsic Geometry'}
              </h3>
              <p className="text-slate-300 text-sm">{isZh
                  ? '测地线完全由流形本身决定。即使我们把流形"变形"（等距变换），测地线也不变。这是流形作为独立对象的"本质特征"。'
                  : 'Geodesics are completely determined by the manifold itself. Even if we "deform" the manifold (isometry), geodesics remain unchanged. This is the "essential characteristic" of the manifold as an independent object.'}
              </p>
            </div>

            <div className="bg-slate-900 rounded-lg p-4">
              <h3 className="text-purple-400 font-semibold mb-2">{isZh ? '法截线 = 外蕴几何' : 'Normal Section = Extrinsic Geometry'}
              </h3>
              <p className="text-slate-300 text-sm">{isZh
                  ? '法截线依赖于流形是如何嵌入外部空间的。同一个流形以不同方式嵌入，会有不同的法截线。'
                  : 'Normal sections depend on how the manifold is embedded in ambient space. The same manifold embedded differently will have different normal sections.'}
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-lg p-4 border border-amber-900/20">
              <p className="text-green-400 font-semibold mb-2">{isZh ? '上帝视角的"切片"' : 'God\'s View "Slicing"'}
              </p>
              <p className="text-slate-300 text-sm">{isZh
                  ? '想象你有了上帝视角，可以从外部观察你脚下的山坡。你拿了一把巨大的、无限薄的刀——在数学里就是一个平面。这把刀垂直于地面，沿着你前进的方向把整个山坡切开。刀面和山坡相交会形成一条曲线——这条曲线就是法截线。它完全是外部观察者的产物：形状不仅取决于山坡本身，还取决于你这把"刀"是怎么放的。'
                  : 'Imagine having God\'s view, observing the hillside from outside. You take a giant, infinitely thin knife—mathematically, a plane. Hold it perpendicular to the ground and slice along your direction of travel. The knife-surface intersection forms a curve—the normal section. It\'s entirely an external observer\'s product: the shape depends not only on the hillside itself but on how the "knife" is positioned.'}
              </p>
            </div>

            {/* Why different embeddings give different normal sections */}
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-4 border border-blue-600">
              <h3 className="text-blue-400 font-semibold mb-2">{isZh ? '为什么不同嵌入方式会有不同的法截线？' : 'Why Do Different Embeddings Give Different Normal Sections?'}
              </h3>
              <p className="text-slate-300 text-sm mb-3">{isZh
                  ? '这是因为法截线的构造依赖于法空间，而法空间由嵌入方式决定：'
                  : 'This is because normal section construction depends on the normal space, which is determined by the embedding:'}
              </p>
              <div className="grid md:grid-cols-2 gap-3 text-sm mb-3">
                <div className="bg-slate-800 rounded p-3">
                  <p className="text-cyan-400 font-semibold mb-1">{isZh ? '例：圆的两种嵌入' : 'Example: Two Embeddings of a Circle'}</p>
                  <p className="text-slate-400 text-xs">{isZh
                      ? '① 圆作为xy平面上的圆（法方向=z轴）\n② 同样的圆，但嵌入在倾斜的平面上（法方向不同！）'
                      : '① Circle in xy-plane (normal = z-axis)\n② Same circle, but in a tilted plane (different normal!)'}
                  </p>
                </div>
                <div className="bg-slate-800 rounded p-3">
                  <p className="text-purple-400 font-semibold mb-1">{isZh ? '关键洞察' : 'Key Insight'}</p>
                  <p className="text-slate-400 text-xs">{isZh
                      ? '法空间 T⊥M 是"外部空间减去切空间"，所以依赖于外部空间！切空间由流形决定，但法空间由嵌入决定。'
                      : 'Normal space T⊥M is "ambient space minus tangent space", so it depends on ambient space! Tangent space is determined by manifold, but normal space by embedding.'}
                  </p>
                </div>
              </div>
              <p className="text-yellow-400 text-xs">{isZh
                  ? '这就是为什么法截线是"外蕴"的——它取决于你把流形放在哪个空间里、怎么放。而测地线只关心流形本身，不关心它住在哪里。'
                  : 'This is why normal sections are "extrinsic"—they depend on where you place the manifold and how. Geodesics only care about the manifold itself, not where it lives.'}
              </p>

              {/* Visualization of different embeddings */}
              <div className="mt-4">
                <EmbeddingComparisonVizWithLabels />
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-900/50 to-amber-900/50 rounded-lg p-4 border border-yellow-600">
              <h3 className="text-yellow-400 font-semibold mb-2">{isZh ? '核心问题' : 'The Central Question'}
              </h3>
              <p className="text-slate-300 text-sm">{isZh
                  ? '测地线（内蕴）和法截线（外蕴）的差异，精确反映了子流形嵌入的"对称程度"。两者越吻合，嵌入越"自然"。下一章将给出精确的数学定义！'
                  : 'The difference between geodesic (intrinsic) and normal section (extrinsic) precisely reflects the "degree of symmetry" of the embedding. The more they agree, the more "natural" the embedding. The next chapter gives the precise mathematical definition!'}
              </p>
            </div>
          </div>
        </section>

        {/* Earth example */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">{isZh ? '地球上的例子' : 'Example on Earth'}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-green-400 font-semibold mb-2">{isZh ? '大圆（测地线）' : 'Great Circle (Geodesic)'}
              </h3>
              <p className="text-slate-300 text-sm mb-2">{isZh
                  ? '如赤道、经线圈。圆心在地球中心。'
                  : 'Like equator, meridians. Center at Earth\'s center.'}
              </p>
              <p className="text-cyan-400 text-sm">{isZh ? '这是球面上的测地线！' : 'These are geodesics on the sphere!'}
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-purple-400 font-semibold mb-2">{isZh ? '纬线圈' : 'Latitude Circle'}
              </h3>
              <p className="text-slate-300 text-sm mb-2">{isZh
                  ? '如北纬30°线。圆心不在地球中心。'
                  : 'Like 30°N latitude. Center not at Earth\'s center.'}
              </p>
              <p className="text-red-400 text-sm">{isZh ? '不是测地线！' : 'Not a geodesic!'}
              </p>
            </div>
          </div>

          <div className="mt-4 bg-slate-800 rounded-lg p-4">
            <p className="text-yellow-400 font-semibold mb-2">{isZh ? '思考题' : 'Question to Think'}
            </p>
            <p className="text-slate-300 text-sm">{isZh
                ? '球面上，任何方向的测地线和法截线分别是什么？它们的关系如何？'
                : 'On a sphere, what are geodesics and normal sections in any direction? How are they related?'}
            </p>
            <details className="mt-2">
              <summary className="text-cyan-400 cursor-pointer hover:text-cyan-300">{isZh ? '点击查看答案' : 'Click to see answer'}
              </summary>
              <p className="text-slate-400 text-sm mt-2">{isZh
                  ? <>球面上测地线和法截线都是大圆，它们完全重合！这是因为球面是高度对称的"<Tooltip term="umbilical">全脐</Tooltip>"子流形。换言之，球面的内蕴几何和外蕴几何完全一致。</>
                  : <>On a sphere, both geodesics and normal sections are great circles—they coincide completely! This is because the sphere is a highly symmetric "<Tooltip term="umbilical">totally umbilical</Tooltip>" submanifold. In other words, intrinsic and extrinsic geometry agree perfectly on a sphere.</>}
              </p>
            </details>
          </div>
        </section>

        {/* Preview of next chapter */}
        <section className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-xl p-6 border border-amber-900/20">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">{isZh ? '预告：第五章' : 'Preview: Chapter 5'}
          </h2>
          <p className="text-slate-300">{isZh
              ? '我们已经准备好了两条曲线：测地线γ_u（内蕴）和法截线β_u（外蕴）。下一章，我们将正式定义一个不变量来精确衡量它们的"吻合程度"，并证明为什么这个吻合程度至少为2。这是Chen-Li论文的核心内容！'
              : 'We\'ve prepared two curves: geodesic γ_u (intrinsic) and normal section β_u (extrinsic). In the next chapter, we\'ll formally define an invariant to precisely measure their "degree of agreement" and prove why it\'s at least 2. This is the core content of Chen-Li\'s paper!'}
          </p>
        </section>

        {/* Chapter Summary */}
        <section className="bg-gradient-to-r from-green-900/50 to-cyan-900/50 rounded-xl p-6 border border-amber-900/20">
          <h2 className="text-xl font-semibold text-green-400 mb-4">
            ✓ {isZh ? '本章小结' : 'Chapter Summary'}
          </h2>
          <ul className="text-slate-300 text-sm space-y-2">
            <li>✓ {isZh ? '法截线 = 用包含切向量和法空间的平面切割子流形得到的曲线' : 'Normal section = curve from cutting submanifold with plane containing tangent and normal space'}</li>
            <li>✓ {isZh ? '法截线和测地线有相同的起点和初始方向' : 'Normal section and geodesic share same starting point and initial direction'}</li>
            <li>✓ {isZh ? '测地线是内蕴的（只取决于流形本身），法截线是外蕴的（取决于嵌入方式）' : 'Geodesic is intrinsic (depends only on manifold), normal section is extrinsic (depends on embedding)'}</li>
            <li>✓ {isZh ? '球面上测地线与法截线完全相同（都是大圆）' : 'On sphere, geodesic and normal section are identical (both great circles)'}</li>
          </ul>
          <div className="mt-6 bg-slate-900 rounded-lg p-4">
            <p className="text-yellow-400 font-semibold mb-3">{isZh ? '思考题' : 'Questions to Think About'}
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-slate-300 text-sm">{isZh
                    ? '1. 在球面上，法截线和测地线都是大圆。那在圆柱面上呢？它们还一样吗？'
                    : '1. On a sphere, both normal section and geodesic are great circles. What about on a cylinder? Are they still the same?'}
                </p>
                <details className="mt-1">
                  <summary className="text-cyan-400 text-sm cursor-pointer hover:text-cyan-300">{isZh ? '点击查看答案' : 'Click to see answer'}
                  </summary>
                  <p className="text-slate-400 text-xs mt-1">{isZh
                      ? '不一样！圆柱面上沿母线方向，测地线和法截线都是直线，是一致的。但沿斜方向，测地线是螺旋线（贴在圆柱面上），而法截线是椭圆（用平面切割圆柱）。它们从同一点出发、同一方向，但很快就分开了。'
                      : 'No! Along the generator direction, both are straight lines. But in oblique directions, the geodesic is a helix (on the cylinder surface), while the normal section is an ellipse (plane cutting the cylinder). They start from the same point in the same direction but quickly diverge.'}
                  </p>
                </details>
              </div>
              <div>
                <p className="text-slate-300 text-sm">{isZh
                    ? '2. 如果一个子流形上所有方向的法截线都和测地线完全重合，这说明什么？'
                    : '2. If normal sections coincide with geodesics in every direction on a submanifold, what does that tell us?'}
                </p>
                <details className="mt-1">
                  <summary className="text-cyan-400 text-sm cursor-pointer hover:text-cyan-300">{isZh ? '点击查看答案' : 'Click to see answer'}
                  </summary>
                  <p className="text-slate-400 text-xs mt-1">{isZh
                      ? '这意味着内蕴几何和外蕴几何完全一致——子流形在外部空间中"没有多余的弯曲"。这样的子流形被称为"全测地的"（totally geodesic），它是外部空间中最"平"的子流形。球面中的大圆就是全测地子流形的例子。'
                      : 'This means intrinsic and extrinsic geometry completely agree — the submanifold has "no extra bending" in ambient space. Such submanifolds are called "totally geodesic" — the "flattest" possible submanifolds. Great circles in a sphere are examples.'}
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between">
          <Link to="/chapter/3" className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors">
            ← {t('common.prev')}
          </Link>
          <Link to="/chapter/5" className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white transition-colors">{t('common.next')}: {t('chapters.ch5.title')} →
          </Link>
        </div>
      </div>
    </div>
  );
}
