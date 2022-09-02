import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


const initialFormValues = { content: "", isCompleted: true }

function Homepage() {

    const [todos, setTodos] = useState([])
    const [form, setForm] = useState(initialFormValues)


    useEffect(() => {
        axios.get("https://630f37fc37925634188a39d5.mockapi.io/todos")
            .then(res => setTodos(res.data))
            .catch(err => console.log(err))
    }, [])




    const addTodo = async (item) => {
        await axios.post(`https://630f37fc37925634188a39d5.mockapi.io/todos`, item)
        setTodos(todos.concat([item]))
    }

    const deleteTodo = async (item) => {
        axios.delete(`https://630f37fc37925634188a39d5.mockapi.io/todos/${item}`)
        const newTodo = todos.filter(
            x => x.id !== item
        );
        setTodos(newTodo)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (form.content === "") {
            alert("please do not leave the list blank! ")
            return false; // sonrasında boş liste oluşturmaması için
        }
        addTodo(form)
        setTodos([...todos, form])
        setForm({ content: "" })
    }

    const onChangeInput = (e) => {
        setForm({ ...todos, [e.target.name]: e.target.value })
    }


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
            <div className='row'>

                <div className='main-box container' >

                    <h1 className='col-12'>Todo App - Popupsmart React Practicum</h1>

                    <form className='row' onSubmit={handleSubmit}>
                        <div className='form-floating col-10' >
                            <input
                                className="form-control task-div col-10"
                                placeholder="Things To Do"
                                id="floatingInput"
                                name='content'
                                value={form.content}
                                onChange={onChangeInput}
                                autoFocus
                            >
                            </input>
                            <label htmlFor="floatingInput">Things To Do</label>
                        </div>

                        <div className='col-2'>
                            <button
                                type='submit'
                                value="submit"
                                className='btn btn-primary rounded-circle add'>
                                ADD
                            </button>
                        </div>
                    </form>

                    <div className='container'>

                        <ul className='row mt-3'>
                            {
                                todos.map((todo, i) => (
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
                                                className={
                                                    todo.isCompleted === true ?
                                                        "text-decoration-line-through" :
                                                        ""
                                                }
                                            >{todo.content}</label>

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


                </div>

            </div>
        </div>
    )
};

export default Homepage;