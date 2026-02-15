import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  const location = useLocation();

  // Scroll to section when URL has hash (e.g. #section-2.3)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      // Delay to allow page render after navigation
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
      return () => clearTimeout(timer);
    } else {
      // No hash: scroll to top
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Sidebar />
      <Header />
      <main className="ml-64 mt-14 p-8 flex-grow">
        <Outlet />
      </main>
      <footer className="ml-64 py-6 px-8 border-t border-slate-800 bg-slate-900/50">
        <div className="text-center text-slate-500 text-sm">
          <p className="mb-1">
            🤖 本教程内容由 AI 辅助总结生成 | This tutorial content was AI-assisted and generated
          </p>
          <p className="text-slate-600 text-xs">
            Model: Claude Opus 4.5 (Anthropic) · 基于李世杰教授论文整理
          </p>
        </div>
      </footer>
    </div>
  );
}
