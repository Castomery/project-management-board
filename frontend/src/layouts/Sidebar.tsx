import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Users,
  Settings,
  PlusIcon,
} from "lucide-react";
import { useState } from "react";
import type { Board } from "../types/types";

interface SidebarProps {
  boards: Board[];
  selectedBoardId?: string;
  onSelectBoard: (board: Board) => void;
  onOpenCreateBoard: () => void;
}

const Sidebar = ({ boards, selectedBoardId, onSelectBoard, onOpenCreateBoard }: SidebarProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);


  const toggleDropdown = (boardId: string) => {
    setOpenDropdown(openDropdown === boardId ? null : boardId);
  };


  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 p-4 h-screen">
      <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3 px-2">
        Boards
      </h2>
      
      <hr className="border-gray-300 my-3" />

      <div>
        <button 
        onClick={onOpenCreateBoard}
        className="w-full flex items-center justify-center gap-0.5 bg-blue-600 text-white font-bold text-xl rounded p-3 hover:bg-blue-500">
          <PlusIcon className="size-4" />
          <span>Create new board</span>
        </button>
      </div>
      
      <hr className="border-gray-300 my-3" />

      <div className="space-y-1">
        {boards.map((board) => (
          <div key={board._id}>
            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  toggleDropdown(board._id);
                  onSelectBoard(board);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 transition-colors text-left ${
                  selectedBoardId === board._id
                    ? "bg-blue-100 font-semibold"
                    : "bg-white"
                }`}
              >
                {" "}
                <LayoutDashboard size={16} className="text-gray-600" />{" "}
                <span className="font-medium text-gray-700">{board.title}</span>{" "}
                {openDropdown === board._id ? (
                  <ChevronDown size={18} className="text-gray-500" />
                ) : (
                  <ChevronRight size={18} className="text-gray-500" />
                )}{" "}
              </button>
            </div>

            {openDropdown === board._id && (
              <div className="mt-1 bg-white border border-gray-200 rounded shadow-sm">
                <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors text-left">
                  <Users size={16} className="text-gray-600" />
                  <span className="text-gray-700 text-sm">Members</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors text-left">
                  <Settings size={16} className="text-gray-600" />
                  <span className="text-gray-700 text-sm">Settings</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
