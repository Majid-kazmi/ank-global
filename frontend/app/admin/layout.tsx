'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Inbox,
  Calendar,
  Briefcase,
  BookOpen,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';
import { AnkLogo } from '@/components/brand/AnkLogo';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Skip layout wrap for login page
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) return;

    const token = localStorage.getItem('ank_token');
    const storedUser = localStorage.getItem('ank_user');

    if (!token) {
      router.push('/admin/login');
      return;
    }

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser({ name: 'Administrator', role: 'ADMIN' });
      }
    }
  }, [pathname, isLoginPage, router]);

  const handleLogout = () => {
    localStorage.removeItem('ank_token');
    localStorage.removeItem('ank_user');
    router.push('/admin/login');
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navItems = [
    { label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Client Inquiries', href: '/admin/inquiries', icon: Inbox },
    { label: 'Consultations', href: '/admin/consultations', icon: Calendar },
    { label: 'Services Catalog', href: '/admin/services', icon: Briefcase },
    { label: 'Insights & Blog', href: '/admin/insights', icon: BookOpen },
    { label: 'Team Management', href: '/admin/team', icon: Users },
    { label: 'Website Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Bar */}
      <header className="bg-navy-950 text-white h-16 border-b border-navy-800 flex items-center justify-between px-4 sm:px-6 z-30">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-navy-800"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center space-x-2.5">
            <Link href="/admin/dashboard" className="flex items-center">
              <AnkLogo variant="dark" className="h-7 sm:h-8 w-auto max-w-[150px]" />
            </Link>
            <span className="font-display font-bold text-xs text-gold-400 tracking-wider uppercase border-l border-navy-800 pl-2.5 hidden sm:inline">
              Portal
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center text-xs text-slate-300 hover:text-gold-300 transition-colors space-x-1"
          >
            <span>View Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="h-4 w-px bg-navy-800 hidden sm:block" />

          <div className="text-right hidden sm:block">
            <span className="text-xs font-semibold text-white block">
              {user?.name || 'Administrator'}
            </span>
            <span className="text-[10px] text-gold-400 font-medium">
              {user?.role || 'SUPERADMIN'}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-navy-900 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside
          className={`fixed inset-y-16 left-0 z-20 w-64 bg-navy-900 text-slate-300 border-r border-navy-800 transform md:translate-x-0 transition-transform duration-200 ease-in-out md:static flex flex-col justify-between p-4 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-gold-500 text-navy-950 font-semibold shadow-sm'
                      : 'text-slate-300 hover:bg-navy-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-navy-950' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-navy-800 space-y-2 text-[11px] text-slate-500">
            <p className="flex items-center text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
              <span>TLS / Role-Guarded Access</span>
            </p>
            <p>© {new Date().getFullYear()} ANK Global UAE</p>
          </div>
        </aside>

        {/* Main Admin View */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
