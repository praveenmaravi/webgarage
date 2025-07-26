import React from "react";

interface ProjectCardProps {
  id: string;
  name: string;
  description?: string;
  lastModified?: string; // ISO date string
  onOpen: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  isSelected?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  name,
  description,
  lastModified,
  onOpen,
  onEdit,
  onDelete,
  isSelected = false,
}) => {
  return (
    <div
      className={`cursor-pointer rounded-lg border p-4 shadow-md hover:shadow-lg transition-shadow
        ${isSelected ? "border-indigo-500 bg-indigo-900" : "border-gray-700 bg-gray-800"}`}
      onClick={() => onOpen(id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpen(id);
      }}
    >
      <h3 className="text-lg font-semibold text-white truncate">{name}</h3>
      {description && (
        <p className="mt-1 text-sm text-gray-400 line-clamp-2">{description}</p>
      )}
      {lastModified && (
        <p className="mt-2 text-xs text-gray-500">
          Last modified: {new Date(lastModified).toLocaleDateString()}
        </p>
      )}

      <div className="mt-4 flex justify-end space-x-2">
        {onEdit && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(id);
            }}
            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 rounded-md text-sm"
            aria-label={`Edit project ${name}`}
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md text-sm"
            aria-label={`Delete project ${name}`}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
