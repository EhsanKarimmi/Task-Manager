import React, { useState } from "react";
import "../../styles/taskCard.scss";

interface TaskCardProps {
  title: string;
  description: string;
  image: string;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  image,
  onEdit,
  onDelete,
}) => {
  //
  const [imageError, setImageError] = useState(false);
  //
  return (
    <div className="task-card" tabIndex={0} aria-label={`Task: ${title}`}>
      {imageError ? (
        <p className="image-placeholder">Image could not be loaded !</p>
      ) : (
        <img src={image} alt={title} onError={() => setImageError(true)} />
      )}
      <h3>{title}</h3>
      <p>{description}</p>
      <div>
        <button onClick={onEdit} aria-label="Edit task">
          Edit
        </button>
        <button
          onClick={onDelete}
          aria-label="Delete task"
          style={{ marginLeft: 10 }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
