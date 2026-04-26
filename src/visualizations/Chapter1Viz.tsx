import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThreeCanvas } from '../components';
import { RotatingSphere, RotatingTorus, RotatingKleinBottle, KleinBottleFigure8, MobiusStrip } from './ManifoldShapes';
import { VIZ_CLASSES } from './theme';

type ManifoldType = 'sphere' | 'torus' | 'klein' | 'klein8' | 'mobius';

export default function Chapter1Viz() {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const [selected, setSelected] = useState<ManifoldType>('sphere');

  const manifolds: { id: ManifoldType; label: string; labelEn: string; desc: string; descEn: string }[] = [
    {
      id: 'sphere',
      label: '球面 S²',
      labelEn: 'Sphere S²',
      desc: '最简单的闭曲面，每点局部像平面',
      descEn: 'The simplest closed surface, locally flat at each point'
    },
    {
      id: 'torus',
      label: '环面 T²',
      labelEn: 'Torus T²',
      desc: '甜甜圈形状，有一个"洞"',
      descEn: 'Donut shape, has one "hole"'
    },
    {
      id: 'klein',
      label: 'Klein瓶',
      labelEn: 'Klein Bottle',
      desc: '经典"瓶子"形状浸入，颈部穿过瓶壁',
      descEn: 'Classic "bottle" shape immersion, neck passes through wall'
    },
    {
      id: 'klein8',
      label: 'Klein瓶 (Figure-8)',
      labelEn: 'Klein Bottle (Figure-8)',
      desc: 'Figure-8 浸入，更对称的表示方式',
      descEn: 'Figure-8 immersion, a more symmetric representation'
    },
    {
      id: 'mobius',
      label: 'Möbius带',
      labelEn: 'Möbius Strip',
      desc: '只有一个面和一条边的神奇曲面',
      descEn: 'A magical surface with only one side and one edge'
    },
  ];

  const renderManifold = () => {
    switch (selected) {
      case 'sphere': return <RotatingSphere />;
      case 'torus': return <RotatingTorus />;
      case 'klein': return <RotatingKleinBottle />;
      case 'klein8': return <KleinBottleFigure8 />;
      case 'mobius': return <MobiusStrip />;
    }
  };

  const currentManifold = manifolds.find(m => m.id === selected)!;

  return (
    <div className={VIZ_CLASSES.panel}>
      <h3 className="text-lg font-semibold text-teal-800 mb-4">{isZh ? '交互式流形展示' : 'Interactive Manifold Display'}
      </h3>

      <div className="flex flex-wrap gap-2 mb-4">
        {manifolds.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelected(m.id)}
            className={`rounded-xl border-2 px-4 py-2 text-sm transition-all ${
              selected === m.id
                ? VIZ_CLASSES.buttonActive
                : VIZ_CLASSES.buttonIdle
            }`}
          >{isZh ? m.label : m.labelEn}
          </button>
        ))}
      </div>

      <ThreeCanvas className={`w-full h-80 ${VIZ_CLASSES.canvas}`}>
        {renderManifold()}
      </ThreeCanvas>

      <p className="text-center text-stone-700 mt-4 text-sm">{isZh ? currentManifold.desc : currentManifold.descEn}
        <br />
        <span className="text-stone-500">{isZh ? '拖拽旋转 · 滚轮缩放' : 'Drag to rotate · Scroll to zoom'}
        </span>
      </p>
    </div>
  );
}
