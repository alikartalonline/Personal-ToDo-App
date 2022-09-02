import React from 'react'
import axios from 'axios'

function Section({ todos, setTodos, selectedTodos }) {


    // DELETE DATA FROM API
    const deleteTodo = async (item) => {
        axios.delete(`https://630f37fc37925634188a39d5.mockapi.io/todos/${item}`)
        const newTodo = todos.filter(
            x => x.id !== item
        );
        setTodos(newTodo)
    }

    // UPDATE CHECKBOX AND COMPLETE TODO
    const updateCompleteTodos = (content) => {
        const index = todos.findIndex(item => item.content === content);
        const todo = todos.find(item => item.content === content);
        todo.isCompleted = !todo.isCompleted
        const newTodos = [...todos];
        newTodos[index] = todo;
        setTodos(newTodos);
    }


    return (
        <div className='container'>

            <ul className='row mt-3'>
                {
                    selectedTodos.map((todo, i) => (
                        <li key={i}
                            className="col-6 mt-2 "
                        >
                            <div className='d-flex form-check'>
                                <input
                                    className="toggle m-2 form-check-input"
                                    id="flexCheckDefault"
                                    type="checkbox"
                                    checked={todo.isCompleted}
                                    onClick={() => updateCompleteTodos(todo.content)}
                                />

                                <label
                                    className={todo.isCompleted === true ?
                                    "text-decoration-line-through" : ""}
                                    >
                                    {todo.content}
                                </label>

                                <button
                                    className='btn x-icon border border-0 '
                                    onClick={() => deleteTodo(todo.id)}
                                ></button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Section;