import { useState, useEffect } from "react";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import type { Board } from "../types/types";
import { axiosInstance } from "../configs/axios";
import MainWorkSpace from "../components/MainWorkSpace";
import CreateBoardModal from "../components/CreateBoardModal";

const HomePage = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const res = await axiosInstance.get("/boards/getboards");
        setBoards(res.data);
      } catch (err) {
        console.error("Failed to fetch boards:", err);
      }
    };

    fetchBoards();
  }, []);

  const handleCreateBoard = async (title: string) => {
    console.log("New board title:", title);
    try {
      const res = await axiosInstance.post("/boards/create", {title});
      const newBoard: Board = res.data;

      setBoards((prev) => [...prev, newBoard]);
      setSelectedBoard(newBoard);

      console.log("board created");
    } catch (error) {
      console.log("Error:", error)
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar
          boards={boards}
          selectedBoardId={selectedBoard?._id}
          onSelectBoard={setSelectedBoard}
          onOpenCreateBoard={() => setIsCreateBoardOpen(true)}
        />
        <MainWorkSpace board={selectedBoard} />
      </div>

      {isCreateBoardOpen && (
        <CreateBoardModal onClose={() => setIsCreateBoardOpen(false)} onCreateBoard={handleCreateBoard} />
      )}
    </div>
  );
};

export default HomePage;
