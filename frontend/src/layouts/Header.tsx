import { Bell, Plus, Search, Trello, User, LogOut} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Header = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const {logout} = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3 gap-4">
        {/* Left Section */}
        <div className="flex items-center justify-center gap-2">
          <div className="p-2 flex gap-3">
            <Trello size={20} />
          </div>
          <span className="text-lg font-semibold">PM Board</span>
        </div>

        {/* Center Section */}
        <div className="flex items-center gap-2 flex-1 justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search"
              className="bg-white/20 hover:bg-white/30 focus:bg-white focus:text-gray-900 text-white placeholder-white/80 focus:placeholder-gray-400 px-3 py-2 pl-10 rounded w-full transition-all outline-none text-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80" size={16} />
          </div>
          
          <button className="flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-400 rounded text-sm font-semibold transition-colors">
            <Plus size={16} />
            Create
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/20 rounded transition-colors">
            <Bell size={20} />
          </button>
          
           <div className="relative">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="w-8 h-8 bg-blue-800 hover:bg-blue-900 rounded-full flex items-center justify-center transition-colors"
            >
              <User size={18} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded shadow-lg overflow-hidden z-50">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 transition"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
