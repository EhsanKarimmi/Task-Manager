import React from "react";

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
  return (
    <div className="task-card" tabIndex={0} aria-label={`Task: ${title}`}>
      {image && <img src={image} alt={`تصویر ${title}`} />}
      <h3>{title}</h3>
      <p>{description}</p>
      <div>
        <button onClick={onEdit} aria-label="ویرایش تسک">
          ویرایش
        </button>
        <button
          onClick={onDelete}
          aria-label="حذف تسک"
          style={{ marginLeft: 8 }}
        >
          حذف
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
