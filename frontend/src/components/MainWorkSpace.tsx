
import type { Board } from "../types/types";

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
     <div className="flex-1 p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">{board.title}</h2>
      {/* TODO: RENDER LISTS AND CARDS */}
    </div>
  );
};

export default MainWorkSpace;
