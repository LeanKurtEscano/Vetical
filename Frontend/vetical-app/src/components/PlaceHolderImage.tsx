import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const PlaceholderImage: React.FC<{ width?: string; height?: string }> = ({
  width = "w-32",
  height = "h-32",
}) => {
  return (
    <div
      className={`flex items-center justify-center ${width} ${height} bg-gray-300 rounded-lg`}
    >
      <FontAwesomeIcon icon={faImage} className="text-gray-500 text-4xl" />
    </div>
  );
};

export default PlaceholderImage;
