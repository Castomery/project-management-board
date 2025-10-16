import {useState} from "react";
import { X } from "lucide-react";

interface CreateBoardModalProps {
  onClose: () => void;
  onCreateBoard: (title: string) => void;
}

const CreateBoardModal = ({onClose, onCreateBoard}: CreateBoardModalProps) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreateBoard(title);
    setTitle("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <h2 className="text-lg font-semibold mb-4">Create New Board</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Board title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded px-3 py-2 hover:bg-blue-500 transition-colors"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBoardModal;
