import { useState, useEffect } from "react";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import type { Board } from "../types/types";
import { axiosInstance } from "../configs/axios";
import MainWorkSpace from "../components/MainWorkSpace";


const HomePage = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);

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

  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar
          boards={boards}
          selectedBoardId={selectedBoard?.id}
          onSelectBoard={setSelectedBoard}
        />

        <MainWorkSpace board={selectedBoard}/>
      </div>
    </div>
  );
};

export default HomePage;
