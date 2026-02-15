import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Sidebar />
      <Header />
      <main className="ml-64 mt-14 p-8">
        <Outlet />
      </main>
    </div>
  );
}
