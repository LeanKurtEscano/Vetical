import React from "react";

interface DeleteModalProps {
  id: number;
  onConfirm: (id: number) => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onConfirm, onCancel, id }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500/50  bg-opacity-40 ">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Are you sure you want to delete this listing?
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          This action cannot be undone.
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg cursor-pointer bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(id)}
            className="px-4 py-2 rounded-lg cursor-pointer bg-orange-500 text-white hover:bg-orange-600 transition"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
