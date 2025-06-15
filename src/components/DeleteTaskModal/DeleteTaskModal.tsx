import React from "react";
import "../../styles/modal.scss";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskTitle: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  taskTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
    >
      <div className="modal-content">
        <h2 id="delete-dialog-title">Delete Task</h2>
        <p>Are you sure you want to delete task "{taskTitle}" ?</p>
        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}
        >
          <button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel{" "}
          </button>
          <button
            onClick={onConfirm}
            style={{ backgroundColor: "#e57373", color: "white" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
