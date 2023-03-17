import React from 'react';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import { useState } from 'react';
import { nanoid } from 'nanoid';

// Defining filters as key : value pairs
// each value is a function we will use to filters the 'tasks' data array
// these are defined globally on purpose. If defined within App.js, they would be recalculated every time the
// <App /> components re-renders.

const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
};

// grab reference to an array of FILTER_MAPs properties
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
    // add tasks hook
    const [tasks, setTasks] = useState(props.tasks);

    // filter hook
    const [filter, setFilter] = useState('All');

    function toggleTaskCompleted(id) {
        const updatedTasks = tasks.map((task) => {
            if (id === task.id) {
                return { ...task, completed: !task.completed };
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

    const taskList = tasks
        .filter(FILTER_MAP[filter])
        .map((task) => (
            <Todo
                name={task.name}
                completed={task.completed}
                id={task.id}
                key={task.id}
                toggleTaskCompleted={toggleTaskCompleted}
                deleteTask={deleteTask}
                editTask={editTask}
            />
        ));

    // we map over FILTER_NAMES array
    const filterList = FILTER_NAMES.map((name) => {
        return (
            <FilterButton
                key={name}
                name={name}
                isPressed={name === filter}
                setFilter={setFilter}
            />
        );
    });

    const headingNoun = taskList.length !== 1 ? 'tasks' : 'task';
    const headingText = `${taskList.length} ${headingNoun} remaining`;

    function addTask(name) {
        const newTask = { name, id: `todo-${nanoid()}`, completed: false };
        setTasks([...tasks, newTask]);
    }

    function editTask(id, newName) {
        const editedTaskList = tasks.map((task) => {
            if (id === task.id) {
                return { ...task, name: newName };
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
                {filterList}
            </div>
            <h2 id="list-heading">{headingText}</h2>
            <ul
                className="todo-list stack-large stack-exception"
                aria-labelledby="list-heading"
            >
                {taskList}
            </ul>
        </div>
    );
}

export default App;
