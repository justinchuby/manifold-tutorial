import { useTranslation } from 'react-i18next';
import SearchBox from './SearchBox';

export default function Header() {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="h-14 bg-amber-50/95 text-stone-900 border-b border-amber-200/80 backdrop-blur flex items-center justify-between px-6 fixed top-0 left-0 right-0 lg:left-64 z-10">
      <div className="flex items-center gap-4 ml-10 lg:ml-0">
        <span className="text-teal-800 font-semibold">Contact Number</span>
        <span className="text-stone-400 text-sm hidden lg:inline">|</span>
        <span className="text-stone-600 text-sm hidden lg:inline">{t('app.subtitle')}</span>
      </div>
      <div className="flex items-center gap-4">
        <SearchBox />
        <button
          onClick={toggleLanguage}
          className="px-3 py-1 rounded bg-stone-900 text-amber-50 hover:bg-stone-700 text-sm transition-colors"
        >
          {i18n.language === 'zh' ? 'English' : '中文'}
        </button>
      </div>
    </header>
  );
}
