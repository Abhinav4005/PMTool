import React, { useState } from 'react';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);

  const handleCreateProject = (e) => {
    e.preventDefault();
    const projectName = e.target.projectName.value;
    if (projectName) {
      setProjects((prevProjects) => [...prevProjects, { name: projectName, tasks: [] }]);
    }
    e.target.reset();
  };

  const handleAddTask = (e, projectIndex) => {
    e.preventDefault();
    const taskName = e.target.taskName.value;
    const taskDescription = e.target.taskDescription.value;
    if (taskName && taskDescription) {
      setProjects((prevProjects) => {
        const updatedProjects = [...prevProjects];
        updatedProjects[projectIndex].tasks.push({ name: taskName, description: taskDescription, completed: false });
        return updatedProjects;
      });
    }
    e.target.reset();
  };

  const handleMarkCompleted = (projectIndex, taskIndex) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects];
      updatedProjects[projectIndex].tasks[taskIndex].completed = true;
      return updatedProjects;
    });
  };

  return (
    <div className="container">
      <header>
        <h1>Project Management Tool</h1>
        <form onSubmit={handleCreateProject} className="create-project-form">
          <input type="text" name="projectName" placeholder="Enter Project Name" required />
          <button type="submit">Create Project</button>
        </form>
      </header>

      <div className="projects">
        {projects.map((project, projectIndex) => (
          <div key={projectIndex} className="project">
            <h2>{project.name}</h2>
            <ul className="tasks">
              {project.tasks.map((task, taskIndex) => (
                <li key={taskIndex} className={`task ${task.completed ? 'completed' : ''}`}>
                  <div className="task-content">
                    <span className="task-name">{task.name}</span>
                    <span className="task-description">{task.description}</span>
                  </div>
                  {!task.completed && (
                    <button className="mark-completed" onClick={() => handleMarkCompleted(projectIndex, taskIndex)}>Mark Completed</button>
                  )}
                </li>
              ))}
            </ul>
            <form onSubmit={(e) => handleAddTask(e, projectIndex)} className="add-task-form">
              <input type="text" name="taskName" placeholder="Task Name" required />
              <textarea name="taskDescription" placeholder="Task Description" required />
              <button type="submit">Add Task</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
