import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <div className="max-w-2xl mx-auto text-center py-20">
      <h1 className="text-8xl font-bold text-cyan-500/30 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-slate-300 mb-4">{isZh ? '页面未找到' : 'Page Not Found'}
      </h2>
      <p className="text-slate-400 mb-8">{isZh
          ? '你访问的页面不存在——也许它迷失在高维空间中了 '
          : "The page you're looking for doesn't exist — perhaps it's lost in higher-dimensional space "}
      </p>
      <Link
        to="/"
        className="inline-flex items-center px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white font-semibold transition-colors"
      >{isZh ? '← 返回首页' : '← Back to Home'}
      </Link>
    </div>
  );
}
