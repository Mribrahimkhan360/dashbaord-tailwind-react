import React, { useState } from 'react';
import { Home, Users, Briefcase, FileText, Settings, ChevronDown, BarChart3, Package, ShoppingCart, Calendar, Bell, MessageSquare, HelpCircle } from 'lucide-react';

const SidebarLink = ({ to, label, icon: Icon, badge, isActive, hasSubmenu, submenuOpen, onToggle, isSubmenuItem }) => {
  const baseClasses = isSubmenuItem 
    ? "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm group relative"
    : "flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium group relative";
  
  const activeClasses = isActive
    ? "bg-gradient-to-r from-indigo-600/20 to-purple-600/20 text-white border border-indigo-500/30 shadow-lg shadow-indigo-500/10"
    : "text-gray-400 hover:text-white hover:bg-gray-800/50";

  return (
    <div>
      <a
        href={to}
        onClick={hasSubmenu ? (e) => { e.preventDefault(); onToggle(); } : undefined}
        className={`${baseClasses} ${activeClasses}`}
      >
        <div className="flex items-center gap-3 flex-1">
          <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'text-indigo-400' : 'group-hover:scale-110'}`} />
          <span className="font-medium">{label}</span>
        </div>
        {badge && (
          <span className="px-2 py-0.5 text-xs font-semibold bg-red-500/20 text-red-400 rounded-full border border-red-500/30">
            {badge}
          </span>
        )}
        {hasSubmenu && (
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${submenuOpen ? 'rotate-180' : ''}`} />
        )}
        {isActive && !isSubmenuItem && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-r-full" />
        )}
      </a>
      
      {hasSubmenu && submenuOpen && (
        <div className="mt-1 ml-8 space-y-1 border-l-2 border-gray-800 pl-4">
          <SidebarLink to={`${to}/overview`} label="Overview" icon={BarChart3} isSubmenuItem />
          <SidebarLink to={`${to}/analytics`} label="Analytics" icon={BarChart3} isSubmenuItem />
        </div>
      )}
    </div>
  );
};

const SidebarSection = ({ title, children }) => (
  <div className="space-y-1">
    <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
      {title}
    </h3>
    {children}
  </div>
);

// Example usage in your component:
export default function YourComponent() {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState({});
  const [activeLink, setActiveLink] = useState('/');

  const toggleSubmenu = (key) => {
    setSubmenuOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-72 bg-gray-900/95 backdrop-blur-xl text-white
      transform transition-all duration-300 ease-in-out shadow-2xl border-r border-gray-800/50
      ${open ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0 z-40 flex flex-col`}
    >
      {/* Quick Actions Bar */}
      <div className="p-4 border-b border-gray-800/50">
        <div className="flex items-center gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40">
            <Package className="w-4 h-4" />
            <span>New Project</span>
          </button>
          <button className="p-2.5 hover:bg-gray-800/50 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-gray-900"></span>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto custom-scrollbar">
        <SidebarSection title="Main">
          <SidebarLink 
            to="/" 
            label="Dashboard" 
            icon={Home} 
            isActive={activeLink === '/'}
          />
          <SidebarLink 
            to="/analytics" 
            label="Analytics" 
            icon={BarChart3}
            hasSubmenu
            submenuOpen={submenuOpen.analytics}
            onToggle={() => toggleSubmenu('analytics')}
          />
          <SidebarLink 
            to="/calendar" 
            label="Calendar" 
            icon={Calendar}
            badge="3"
          />
        </SidebarSection>

        <SidebarSection title="Management">
          <SidebarLink 
            to="/users" 
            label="Users" 
            icon={Users}
          />
          <SidebarLink 
            to="/projects" 
            label="Projects" 
            icon={Briefcase}
            badge="12"
          />
          <SidebarLink 
            to="/products" 
            label="Products" 
            icon={Package}
          />
          <SidebarLink 
            to="/orders" 
            label="Orders" 
            icon={ShoppingCart}
            badge="8"
          />
        </SidebarSection>

        <SidebarSection title="Communication">
          <SidebarLink 
            to="/messages" 
            label="Messages" 
            icon={MessageSquare}
            badge="5"
          />
          <SidebarLink 
            to="/documents" 
            label="Documents" 
            icon={FileText}
          />
        </SidebarSection>

        <SidebarSection title="System">
          <SidebarLink 
            to="/settings" 
            label="Settings" 
            icon={Settings}
          />
          <SidebarLink 
            to="/help" 
            label="Help & Support" 
            icon={HelpCircle}
          />
        </SidebarSection>
      </nav>

      {/* Enhanced Footer */}
      <div className="p-4 border-t border-gray-800/50 space-y-3">
        {/* Storage Usage */}
        <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-400">Storage Used</span>
            <span className="text-xs font-semibold text-indigo-400">68%</span>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full" style={{ width: '68%' }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">6.8 GB of 10 GB</p>
        </div>

        {/* Upgrade CTA */}
        <div className="bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 rounded-lg p-3">
          <p className="text-xs font-semibold text-white mb-1">Upgrade to Pro</p>
          <p className="text-xs text-gray-400 mb-2">Get unlimited storage & features</p>
          <button className="w-full py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded text-xs font-semibold transition-all duration-200">
            Upgrade Now
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center pt-2">© 2025 Paikaree. All rights reserved.</p>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.5);
        }
      `}</style>
    </aside>
  );
}
