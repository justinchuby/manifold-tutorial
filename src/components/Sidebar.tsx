import { useState } from 'react';
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
  const [open, setOpen] = useState(false);

  const partNames = ['part1', 'part2', 'part3', 'part4'];

  // Close sidebar on navigation (mobile)
  const handleNavClick = () => setOpen(false);

  return (
    <>
      {/* Hamburger button - mobile only */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-3 left-3 z-50 p-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors"
        aria-label="Toggle menu"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open 
            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          }
        </svg>
      </button>

      {/* Overlay - mobile only */}
      {open && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        w-64 bg-slate-900 text-white h-screen overflow-y-auto fixed left-0 top-0 p-4 z-40
        transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <NavLink to="/" className="block mb-6" onClick={handleNavClick}>
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
                      onClick={handleNavClick}
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
    </>
  );
}
