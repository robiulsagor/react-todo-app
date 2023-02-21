import React, { useEffect, useState } from 'react'
import './todo.css'

const Todo = () => {

    const [task, setTask] = useState()
    const [todos, setTodos] = useState([])

    useEffect(() => {
        const t = localStorage.getItem("todos")
        if (t === null) {
            localStorage.setItem("todos", JSON.stringify(todos))
        } else {
            setTodos(JSON.parse(t))
        }
    }, [setTodos])

    const addTask = () => {
        if (task !== '') {
            setTodos(oldTodos => {
                setTask('')
                const newTodos = [...oldTodos, { id: Math.floor(Math.random() * new Date()), text: task }]
                localStorage.setItem("todos", JSON.stringify(newTodos))
                return newTodos
            })
        } else {
            alert("Please write something...")
        }
    }

    const checkForEnterKey = e => {
        e.keyCode === 13 && addTask()
    }

    const removeItem = (id) => {
        const removeTodo = todos.filter(item => item.id !== id)
        console.log(removeTodo);
        setTodos(removeTodo)
        localStorage.setItem("todos", JSON.stringify(removeTodo))
    }

    return (
        <React.Fragment>
            <div className='container'>
                <h2>Add Todo</h2>
                <div className='input_group'>
                    <input type="text" onChange={e => setTask(e.target.value)} value={task} onKeyDown={checkForEnterKey} />
                    <button type='buton' onClick={addTask}>Add</button>
                </div>

                <div className='todos'>
                    <h2>todo List</h2>
                    {todos.length === 0 && (
                        <h4 style={{ textAlign: 'center' }}>No todos found!</h4>
                    )}
                    {todos.length > 0 && (
                        <div className="todos_container">
                            {todos.map((todo, i) => {
                                return (
                                    <div className='todo' key={todo.id}>
                                        <span>{i + 1}</span>
                                        <p>{todo.text}</p>
                                        <span className='times' onClick={() => removeItem(todo.id)}>
                                            &times;
                                        </span>
                                    </div>
                                )
                            })}
                        </div>)
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default Todo