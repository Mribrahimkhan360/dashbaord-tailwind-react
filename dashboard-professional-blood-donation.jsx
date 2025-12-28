import React, { useState } from 'react';
import { Home, Users, Briefcase, FileText, Settings, ChevronDown, BarChart3, Package, ShoppingCart, Calendar, Bell, MessageSquare, HelpCircle, TrendingUp, Activity, Droplets, MapPin, X } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

// ডামি ডেটা - সংগঠন-ভিত্তিক রক্তদান
const organizationData = [
  { name: 'শরীয়তপুর সমিতি', donations: 145, blood: 'A+' },
  { name: 'বন্ধু সংঘ', donations: 98, blood: 'B+' },
  { name: 'জীবন সংস্থা', donations: 187, blood: 'O+' },
  { name: 'মানবিক গোষ্ঠী', donations: 112, blood: 'A+' },
  { name: 'সেবা কেন্দ্র', donations: 76, blood: 'AB+' },
  { name: 'যুব সংগঠন', donations: 134, blood: 'O-' },
];

// উপজেলা-ভিত্তিক সার্চ ডেটা
const upazilaSearchData = [
  { name: 'সদর', searches: 234, successful: 198 },
  { name: 'নড়িয়া', searches: 156, successful: 134 },
  { name: 'জাজিরা', searches: 198, successful: 167 },
  { name: 'গোসাইরহাট', searches: 123, successful: 98 },
  { name: 'ভেদরগঞ্জ', searches: 167, successful: 145 },
  { name: 'ডামুড্যা', searches: 145, successful: 121 },
];

// রক্তের গ্রুপ-ভিত্তিক বিতরণ
const bloodGroupData = [
  { name: 'A+', value: 345, color: '#ef4444' },
  { name: 'B+', value: 289, color: '#f59e0b' },
  { name: 'O+', value: 412, color: '#10b981' },
  { name: 'AB+', value: 156, color: '#3b82f6' },
  { name: 'A-', value: 98, color: '#8b5cf6' },
  { name: 'B-', value: 76, color: '#ec4899' },
  { name: 'O-', value: 134, color: '#06b6d4' },
  { name: 'AB-', value: 67, color: '#f97316' },
];

// মাসিক ট্রেন্ড ডেটা
const monthlyTrendData = [
  { month: 'জানু', donations: 145, requests: 178, success: 132 },
  { month: 'ফেব্রু', donations: 167, requests: 189, success: 156 },
  { month: 'মার্চ', donations: 189, requests: 212, success: 178 },
  { month: 'এপ্রিল', donations: 234, requests: 267, success: 221 },
  { month: 'মে', donations: 256, requests: 289, success: 245 },
  { month: 'জুন', donations: 298, requests: 334, success: 278 },
];

const SidebarLink = ({ to, label, icon: Icon, badge, isActive, hasSubmenu, submenuOpen, onToggle, isSubmenuItem }) => {
  const baseClasses = isSubmenuItem 
    ? "flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all duration-200 text-xs sm:text-sm group relative"
    : "flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all duration-200 text-xs sm:text-sm font-medium group relative";
  
  const activeClasses = isActive
    ? "bg-gradient-to-r from-red-600/20 to-pink-600/20 text-white border border-red-500/30 shadow-lg shadow-red-500/10"
    : "text-gray-400 hover:text-white hover:bg-gray-800/50";

  return (
    <div>
      <a
        href={to}
        onClick={hasSubmenu ? (e) => { e.preventDefault(); onToggle(); } : undefined}
        className={`${baseClasses} ${activeClasses}`}
      >
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-transform duration-200 ${isActive ? 'text-red-400' : 'group-hover:scale-110'}`} />
          <span className="font-medium truncate">{label}</span>
        </div>
        {badge && (
          <span className="px-1.5 sm:px-2 py-0.5 text-xs font-semibold bg-red-500/20 text-red-400 rounded-full border border-red-500/30 flex-shrink-0">
            {badge}
          </span>
        )}
        {hasSubmenu && (
          <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 transition-transform duration-200 ${submenuOpen ? 'rotate-180' : ''}`} />
        )}
        {isActive && !isSubmenuItem && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-pink-600 rounded-r-full" />
        )}
      </a>
      
      {hasSubmenu && submenuOpen && (
        <div className="mt-1 ml-6 sm:ml-8 space-y-1 border-l-2 border-gray-800 pl-3 sm:pl-4">
          <SidebarLink to={`${to}/overview`} label="সারসংক্ষেপ" icon={BarChart3} isSubmenuItem />
          <SidebarLink to={`${to}/reports`} label="রিপোর্ট" icon={FileText} isSubmenuItem />
        </div>
      )}
    </div>
  );
};

const SidebarSection = ({ title, children }) => (
  <div className="space-y-1">
    <h3 className="px-3 sm:px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
      {title}
    </h3>
    {children}
  </div>
);

const StatCard = ({ title, value, subtitle, icon: Icon, trend, color = 'red' }) => {
  const colorClasses = {
    red: 'from-red-500/10 to-pink-500/10 border-red-500/20 text-red-400',
    blue: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20 text-blue-400',
    green: 'from-green-500/10 to-emerald-500/10 border-green-500/20 text-green-400',
    purple: 'from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-400',
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} border rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300`}>
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className={`p-2 sm:p-3 bg-gray-800/50 rounded-lg`}>
          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${colorClasses[color].split(' ')[3]}`} />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-xs text-green-400">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">{trend}</span>
          </div>
        )}
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{value}</h3>
      <p className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">{title}</p>
      {subtitle && <p className="text-xs text-gray-500 hidden sm:block">{subtitle}</p>}
    </div>
  );
};

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState({});
  const [activeLink, setActiveLink] = useState('/');

  const toggleSubmenu = (key) => {
    setSubmenuOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const closeSidebar = () => setOpen(false);

  return (
    <div className="min-h-screen bg-gray-950 flex overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-14 sm:h-16 bg-gray-900/80 backdrop-blur-md text-white flex items-center justify-between z-50 px-4 sm:px-6 shadow-lg border-b border-gray-800">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            className="lg:hidden text-2xl hover:bg-gray-800 p-1.5 sm:p-2 rounded-lg transition-colors"
            onClick={() => setOpen(!open)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg sm:rounded-xl flex items-center justify-center text-lg sm:text-xl">
              🩸
            </div>
            <span className="text-lg sm:text-2xl font-extrabold tracking-tight">রক্তদান</span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="p-1.5 sm:p-2 hover:bg-gray-800 rounded-lg transition-colors relative lg:hidden">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full border border-gray-900"></span>
          </button>
          <div className="hidden sm:flex items-center gap-3">
            <div className="text-right hidden md:block">
              <p className="text-xs sm:text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-400">এডমিন</p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              A
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop Overlay for Mobile */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-14 sm:top-16 left-0 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] w-64 sm:w-72 bg-gray-900/95 backdrop-blur-xl text-white
        transform transition-all duration-300 ease-in-out shadow-2xl border-r border-gray-800/50
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 z-40 flex flex-col`}
      >
        {/* Close Button for Mobile */}
        <div className="lg:hidden flex justify-end p-3 border-b border-gray-800/50">
          <button 
            onClick={closeSidebar}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 sm:p-4 border-b border-gray-800/50">
          <div className="flex items-center gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 px-2 sm:px-3 py-2 sm:py-2.5 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 shadow-lg shadow-red-500/20">
              <Droplets className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>নতুন দাতা</span>
            </button>
            <button className="p-2 sm:p-2.5 hover:bg-gray-800/50 rounded-lg transition-colors relative">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full border-2 border-gray-900"></span>
            </button>
          </div>
        </div>

        <nav className="flex-1 p-3 sm:p-4 space-y-4 sm:space-y-6 overflow-y-auto custom-scrollbar">
          <SidebarSection title="মূল মেনু">
            <SidebarLink 
              to="/" 
              label="ড্যাশবোর্ড" 
              icon={Home} 
              isActive={activeLink === '/'}
            />
            <SidebarLink 
              to="/analytics" 
              label="বিশ্লেষণ" 
              icon={BarChart3}
              hasSubmenu
              submenuOpen={submenuOpen.analytics}
              onToggle={() => toggleSubmenu('analytics')}
            />
            <SidebarLink 
              to="/calendar" 
              label="ক্যালেন্ডার" 
              icon={Calendar}
              badge="3"
            />
          </SidebarSection>

          <SidebarSection title="ব্যবস্থাপনা">
            <SidebarLink 
              to="/donors" 
              label="রক্তদাতা" 
              icon={Users}
              badge="245"
            />
            <SidebarLink 
              to="/organizations" 
              label="সংগঠন" 
              icon={Briefcase}
              badge="12"
            />
            <SidebarLink 
              to="/requests" 
              label="অনুরোধ" 
              icon={Activity}
              badge="18"
            />
            <SidebarLink 
              to="/locations" 
              label="স্থান" 
              icon={MapPin}
            />
          </SidebarSection>

          <SidebarSection title="যোগাযোগ">
            <SidebarLink 
              to="/messages" 
              label="বার্তা" 
              icon={MessageSquare}
              badge="5"
            />
            <SidebarLink 
              to="/documents" 
              label="ডকুমেন্ট" 
              icon={FileText}
            />
          </SidebarSection>

          <SidebarSection title="সিস্টেম">
            <SidebarLink 
              to="/settings" 
              label="সেটিংস" 
              icon={Settings}
            />
            <SidebarLink 
              to="/help" 
              label="সহায়তা" 
              icon={HelpCircle}
            />
          </SidebarSection>
        </nav>

        <div className="p-3 sm:p-4 border-t border-gray-800/50 space-y-2 sm:space-y-3">
          <div className="bg-gray-800/30 rounded-lg p-2.5 sm:p-3 border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-400">মোট দান</span>
              <span className="text-xs font-semibold text-red-400">১,৫৭৭</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-pink-600 h-full rounded-full" style={{ width: '75%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">এই মাসে ৩৪৫ টি দান</p>
          </div>

          <p className="text-xs text-gray-500 text-center pt-2">© ২০২৫ রক্তদান</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${open ? '' : ''} lg:ml-72 mt-14 sm:mt-16 p-4 sm:p-6 lg:p-8 bg-gray-950 w-full min-w-0`}>
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">রক্তদান ড্যাশবোর্ড</h1>
              <p className="text-sm sm:text-base text-gray-400">শরীয়তপুর জেলা - সম্পূর্ণ পরিসংখ্যান</p>
            </div>
            <div className="flex items-center gap-3">
              <select className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800 text-white text-sm rounded-lg border border-gray-700 focus:ring-2 focus:ring-red-500 w-full sm:w-auto">
                <option>এই মাস</option>
                <option>গত মাস</option>
                <option>এই বছর</option>
              </select>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            <StatCard
              title="মোট রক্তদান"
              value="১,৫৭৭"
              subtitle="গত মাসের তুলনায় +১২%"
              icon={Droplets}
              trend="+১২%"
              color="red"
            />
            <StatCard
              title="সক্রিয় দাতা"
              value="২৪৫"
              subtitle="১৮ জন নতুন এই মাসে"
              icon={Users}
              trend="+৮%"
              color="blue"
            />
            <StatCard
              title="সফল অনুরোধ"
              value="১,২৩৪"
              subtitle="৯৫% সফলতার হার"
              icon={Activity}
              trend="+৫%"
              color="green"
            />
            <StatCard
              title="সংগঠন"
              value="১২"
              subtitle="৬ টি উপজেলায়"
              icon={Briefcase}
              color="purple"
            />
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            {/* সংগঠন-ভিত্তিক রক্তদান */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                সংগঠন-ভিত্তিক রক্তদান
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={organizationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9ca3af" 
                    fontSize={10}
                    angle={-45} 
                    textAnchor="end" 
                    height={80}
                    interval={0}
                  />
                  <YAxis stroke="#9ca3af" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151', 
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    labelStyle={{ color: '#f3f4f6' }}
                  />
                  <Bar dataKey="donations" fill="#ef4444" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* রক্তের গ্রুপ বিতরণ */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                রক্তের গ্রুপ বিতরণ
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={bloodGroupData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {bloodGroupData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151', 
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            {/* উপজেলা-ভিত্তিক সার্চ */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                উপজেলা-ভিত্তিক সার্চ
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={upazilaSearchData}>
                  <defs>
                    <linearGradient id="colorSearches" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSuccessful" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9ca3af" 
                    fontSize={10}
                    angle={-45} 
                    textAnchor="end" 
                    height={60}
                  />
                  <YAxis stroke="#9ca3af" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151', 
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Area type="monotone" dataKey="searches" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSearches)" name="সার্চ" />
                  <Area type="monotone" dataKey="successful" stroke="#10b981" fillOpacity={1} fill="url(#colorSuccessful)" name="সফল" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* মাসিক ট্রেন্ড */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                মাসিক ট্রেন্ড
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" fontSize={10} />
                  <YAxis stroke="#9ca3af" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151', 
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line type="monotone" dataKey="donations" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} name="দান" />
                  <Line type="monotone" dataKey="requests" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} name="অনুরোধ" />
                  <Line type="monotone" dataKey="success" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} name="সফল" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 sm:p-6 overflow-hidden">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
              সাম্প্রতিক কার্যক্রম
            </h3>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="pb-3 px-2 sm:px-0 text-gray-400 font-semibold text-xs sm:text-sm whitespace-nowrap">সংগঠন</th>
                      <th className="pb-3 px-2 text-gray-400 font-semibold text-xs sm:text-sm whitespace-nowrap">গ্রুপ</th>
                      <th className="pb-3 px-2 text-gray-400 font-semibold text-xs sm:text-sm whitespace-nowrap hidden sm:table-cell">স্থান</th>
                      <th className="pb-3 px-2 text-gray-400 font-semibold text-xs sm:text-sm whitespace-nowrap hidden md:table-cell">তারিখ</th>
                      <th className="pb-3 px-2 text-gray-400 font-semibold text-xs sm:text-sm whitespace-nowrap">স্ট্যাটাস</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    {organizationData.slice(0, 5).map((org, i) => (
                      <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                        <td className="py-3 px-2 sm:px-0 text-xs sm:text-sm">{org.name}</td>
                        <td className="py-3 px-2">
                          <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-semibold whitespace-nowrap">
                            {org.blood}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-xs sm:text-sm hidden sm:table-cell">{upazilaSearchData[i % upazilaSearchData.length].name}</td>
                        <td className="py-3 px-2 text-gray-400 text-xs sm:text-sm hidden md:table-cell whitespace-nowrap">২৮ ডিসে, ২০২৫</td>
                        <td className="py-3 px-2">
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs whitespace-nowrap">
                            সফল
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(239, 68, 68, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(239, 68, 68, 0.5);
        }
      `}</style>
    </div>
  );
}
