import React from "react";

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-md transition">
      <div className="flex items-center gap-4 mb-2">
        {project.logo && (
          <img src={project.logo} alt={project.name} className="w-10 h-10 rounded" />
        )}
        <div>
          <h2 className="font-bold text-lg">{project.name}</h2>
          <p className="text-sm text-gray-500">{project.symbol} • {project.chain} • {project.type}</p>
        </div>
      </div>
      <p className="text-sm mb-2 text-gray-700">{project.description}</p>
      <div className="text-sm text-gray-600">
        Launchpad: <strong>{project.launchpad}</strong> <br />
        Date: <strong>{project.startDate || "TBA"}</strong> <br />
        Raise: <strong>{project.raise || "Unknown"}</strong>
      </div>
      {project.website && (
        <a
          href={project.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline mt-2 inline-block"
        >
          Visit Site
        </a>
      )}
    </div>
  );
};

export default ProjectCard;
