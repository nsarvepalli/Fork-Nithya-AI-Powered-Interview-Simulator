import { useLocation, useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const menuItems = [
    { path: "/", label: "📝 Interview" },
    { path: "/history", label: "📚 History" },
  ];

  return (
    <div className="h-screen w-screen flex text-slate-800 overflow-hidden bg-transparent relative">
      {/* Global Sidebar */}
      <div className="relative z-10 w-72 bg-white border-r border-slate-200 flex flex-col p-6 gap-6 shadow-sm shrink-0 overflow-y-auto">
        
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <img src="/logo.png" alt="HireReady Logo" className="w-12 h-12 object-contain" style={{ background: 'transparent' }} />
          <span className="text-2xl font-extrabold text-slate-900 tracking-tight">HireReady</span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`py-3 px-4 rounded-xl text-sm font-bold text-left transition-all duration-300 ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100/50"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex-1" />

        {/* User Footer */}
        <div className="mt-auto pt-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold shadow-sm group-hover:shadow-md transition-shadow">
              {username ? username[0].toUpperCase() : "U"}
            </div>
            <span className="font-semibold">{username}</span>
          </button>
          
          <button
            onClick={handleLogout}
            className="text-xs bg-slate-50 hover:bg-red-50 text-red-500 hover:text-red-600 px-3 py-2 rounded-lg transition-all border border-slate-200 hover:border-red-200 font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Page Area */}
      <main className="relative z-10 flex-1 flex flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
}