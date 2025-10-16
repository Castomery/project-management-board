
import type { Board } from "../types/types";
import BoardHeader from "./BoardHeader";

interface MainWorkSpaceProps {
  board?: Board | null;
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
    
      <div>
      {/* TODO: RENDER LISTS AND CARDS */}

      </div>
    </div>
  );
};

export default MainWorkSpace;
