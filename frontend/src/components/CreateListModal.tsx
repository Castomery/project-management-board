
import { useState } from "react";


interface CreateListModalProps {
  setIsOpen: (isOpen: boolean) => void;
  onCreateList: (title: string) => void;
}

const CreateListModal = ({ setIsOpen, onCreateList }: CreateListModalProps) => {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) return;

    setIsLoading(true);
    try {
      onCreateList(title);
      setTitle("");
      setIsOpen(false);
    } catch (err) {
      console.error("Failed to create list:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-64 bg-gray-100 p-2 rounded shadow-md">
      <input
        autoFocus
        type="text"
        placeholder="Enter list title..."
        className="w-full px-2 py-1 mb-2 border border-gray-300 rounded outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleCreate}
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add List"}
        </button>
        <button
          className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateListModal;
