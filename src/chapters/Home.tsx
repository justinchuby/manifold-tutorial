import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ThreeCanvas } from '../components';
import { Sphere, Torus } from '@react-three/drei';

function RotatingSphere() {
  return (
    <Sphere args={[1, 64, 64]}>
      <meshStandardMaterial color="#06b6d4" wireframe />
    </Sphere>
  );
}

function RotatingTorus() {
  return (
    <Torus args={[1, 0.4, 32, 64]} position={[3, 0, 0]}>
      <meshStandardMaterial color="#8b5cf6" wireframe />
    </Torus>
  );
}

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-cyan-400 mb-4">
          {t('home.welcome')}
        </h1>
        <p className="text-lg text-slate-300 mb-8">{t('home.intro')}</p>
        <Link
          to="/chapter/1"
          className="inline-block px-8 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white font-semibold transition-colors"
        >
          {t('home.startLearning')} →
        </Link>
      </div>

      <div className="bg-slate-900 rounded-xl p-6 mb-8">
        <ThreeCanvas className="w-full h-80 rounded-lg">
          <RotatingSphere />
          <RotatingTorus />
        </ThreeCanvas>
        <p className="text-center text-slate-400 mt-4 text-sm">
          球面 S² 与环面 T² — 两种基本的二维流形
        </p>
      </div>

      <div className="bg-slate-900 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-cyan-400 mb-4">
          {t('home.professor')}
        </h2>
        <p className="text-slate-300">{t('home.affiliation')}</p>
        <p className="text-slate-400 text-sm mt-2">{t('home.collaborator')}</p>
      </div>
    </div>
  );
}
