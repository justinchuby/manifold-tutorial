import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

const chapters = [
  { part: 1, chapters: [1, 2, 3, 4] },
  { part: 2, chapters: [5, 6, 7] },
  { part: 3, chapters: [8, 9, 10, 11] },
  { part: 4, chapters: [12] },
];

export default function Sidebar() {
  const { t } = useTranslation();

  const partNames = ['part1', 'part2', 'part3', 'part4'];

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen overflow-y-auto fixed left-0 top-0 p-4">
      <NavLink to="/" className="block mb-6">
        <h1 className="text-lg font-bold text-cyan-400">{t('app.title')}</h1>
        <p className="text-xs text-slate-400">{t('app.subtitle')}</p>
      </NavLink>

      <nav>
        {chapters.map(({ part, chapters: chaps }) => (
          <div key={part} className="mb-4">
            <h2 className="text-sm font-semibold text-slate-400 mb-2">
              {t(`nav.${partNames[part - 1]}`)}
            </h2>
            <ul className="space-y-1">
              {chaps.map((ch) => (
                <li key={ch}>
                  <NavLink
                    to={`/chapter/${ch}`}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded text-sm transition-colors ${
                        isActive
                          ? 'bg-cyan-600 text-white'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`
                    }
                  >
                    {t('nav.chapter', { num: ch })}: {t(`chapters.ch${ch}.title`)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
