import { useState, useEffect } from "react";
import type { Board as BoardType, List } from "../types/types";
import { axiosInstance } from "../configs/axios";
import ListComponent from "./List";
import CreateListModal from "./CreateListModal";

interface BoardProps {
  board: BoardType;
}

const Board = ({ board }: BoardProps) => {
  const [lists, setLists] = useState<List[]>([]);
  const [isCreateListOpen, setIsCreateListOpen] = useState(false);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const res = await axiosInstance.get(`/lists/board/${board._id}`);
        setLists(res.data);
      } catch (err) {
        console.error("Failed to fetch lists:", err);
      }
    };

    fetchLists();
  }, [board._id]);

  const handleCreateList = async (title: string) => {
    try {
      const res = await axiosInstance.post(`/lists/create/${board._id}`, {
        title,
      });
      setLists((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Failed to create list:", err);
    }
  };

  return (
    <div className="flex-1 p-4 overflow-hidden h-full flex">
      {/* Lists container */}
      <div className="flex-1 p-4 overflow-x-auto flex items-start gap-4">
        {lists.map((list) => (
          <ListComponent key={list._id} list={list} />
        ))}

        <div className="min-w-[200px] flex-shrink-0">
          {isCreateListOpen ? (
            <CreateListModal
              setIsOpen={setIsCreateListOpen}
              onCreateList={handleCreateList}
            />
          ) : (
            <button
              className="bg-blue-500 text-white px-3 py-2 rounded w-full"
              onClick={() => setIsCreateListOpen(true)}
            >
              + Add List
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Board;
