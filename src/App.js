import React from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState } from "react";
import { nanoid } from "nanoid";


function App(props) {
  
  const [tasks, setTasks] = useState(props.tasks);

  function toggleTaskCompleted(id) {
    
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task;
    });

    setTasks(updatedTasks);
    console.log(tasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }
  
  const taskList = tasks.map((task) => (
    <Todo name={task.name} 
     completed={task.completed}
     id={task.id}
     key={task.id}
     toggleTaskCompleted={toggleTaskCompleted}
     deleteTask={deleteTask} 
     editTask={editTask}
     />
  ));

  const headingNoun = taskList.length !== 1 ? 'tasks' : 'task'; 
  const headingText = `${taskList.length} ${headingNoun} remaining`;

  function addTask(name) {
    const newTask = {name, id: `todo-${nanoid()}`,completed: false};
    setTasks([...tasks, newTask]);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }
  
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />

      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
          {taskList}           
      </ul>
    </div>
  );
}

export default App;