import React, { useEffect, useRef, useState } from 'react';

function usePrevious(value) {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
}

export default function Todo(props) {
    // viewing/editing UI toggle hook
    const [isEditing, setEditing] = useState(false);
    
    // useRef constants for <input> and <button> DOM elements
    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);

    // ref to track value/change to value of 'isEditing'
    const wasEditing = usePrevious(isEditing)

    // task change hook
    const [newName, setNewName] = useState('');

    function handleChange(e) {
        setNewName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.editTask(props.id, newName);
        setNewName('');
        setEditing(false);
    }

    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="todo-label" htmlFor={props.id}>
                    New name for {props.name}
                </label>
                <input
                    id={props.id}
                    className="todo-text"
                    type="text"
                    onChange={handleChange}
                    ref={editFieldRef} // input useRef()
                />
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn todo-cancel"
                    onClick={() => setEditing(false)}
                >
                    Cancel
                    <span className="visually-hidden">
                        renaming {props.name}
                    </span>
                </button>
                <button type="submit" className="btn btn__primary todo-edit">
                    Save
                    <span className="visually-hidden">
                        new name for {props.name}
                    </span>
                </button>
            </div>
        </form>
    );

    const viewTemplate = (
        <div className="stack-small">
            <div className="c-cb">
                <input
                    id={props.id}
                    type="checkbox"
                    defaultChecked={props.completed}
                    onChange={() => props.toggleTaskCompleted(props.id)}
                />
                <label className="todo-label" htmlFor={props.id}>
                    {props.name}
                </label>
            </div>
            <div className="btn-group">
                
                <button
                    type="button"
                    className="btn"
                    onClick={() => setEditing(true)}
                    ref={editButtonRef} // edit button useRef()
                >
                    Edit <span className="visually-hidden">{props.name}</span>
                </button>
                <button
                    type="button"
                    className="btn btn__danger"
                    onClick={() => props.deleteTask(props.id)}
                >
                    Delete <span className="visually-hidden">{props.name}</span>
                </button>
            </div>
        </div>
    );

    // useEffect() call, 
    // if we're in the editing template view, useEffect() reads the current value and moves the browser's focus to it
    // the second argument is an array fo values useEffect() should depend on. With these included, useEffect() only runs 
    // when one of those values changes. 

    useEffect(() => {
        if (!wasEditing && isEditing) {
            editFieldRef.current.focus();
        }   
        if (wasEditing && !isEditing) {
            editButtonRef.current.focus();
        }
    }, [wasEditing, isEditing])


    // conditional rendering
    return (
        <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>
    );
}
