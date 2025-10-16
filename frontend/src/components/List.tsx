import type { List as ListType } from "../types/types";

interface ListProps {
  list: ListType;
}

const List = ({ list }: ListProps) => {
  return (
    <div className="bg-gray-100 p-2 rounded w-64 flex-shrink-0">
      <h3 className="font-semibold mb-2">{list.title}</h3>
      {/* Cards go here */}
    </div>
  );
};

export default List;