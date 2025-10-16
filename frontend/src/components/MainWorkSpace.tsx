
import type { Board as BoardType } from "../types/types";
import Board from "./Board";
import BoardHeader from "./BoardHeader";

interface MainWorkSpaceProps {
  board?: BoardType | null;
}

const MainWorkSpace = ({ board }: MainWorkSpaceProps) => {
  if (!board) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-400 text-xl">Select a board to start working</p>
      </div>
    );
  }

  return (
     <div className="flex-1 overflow-x-auto">
      <BoardHeader title={board.title}/>
    
      <div className="h-screen">
          <Board board={board}/>
      </div>
    </div>
  );
};

export default MainWorkSpace;
