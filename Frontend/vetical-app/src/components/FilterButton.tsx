import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";

const FilterButton = () => {
  return (
    <button className="flex items-center cursor-pointer  px-4 py-2 h-[50px] border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200">
      <FontAwesomeIcon icon={faSliders} className="text-gray-600" />
      <span className="text-gray-700 font-medium">Filters</span>
    </button>
  );
};

export default FilterButton;
