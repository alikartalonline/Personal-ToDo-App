import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

// COMPONENTS
import Section from './Section';


// const initialFormValues = { content: "", isCompleted:true}

function Homepage() {

    const [todos, setTodos] = useState([])
    // const [form, setForm] = useState(initialFormValues)
    const [form, setForm] = useState({content:""})


    // Api Axios Get
    useEffect(() => {
        axios.get("https://630f37fc37925634188a39d5.mockapi.io/todos")
            .then(res => setTodos(res.data))
            .catch(err => console.log(err))
    }, [])



    // FORM
    const handleSubmit = (e) => {
        e.preventDefault()

        if (form.content === "" || form.content.length <= 3) {
            alert("please do not leave the list blank! ")
            return false; // sonrasında boş liste oluşturmaması için
        }
        addTodo(form) // form yani yazılan "todo" koşulu geçerse addTodo'ya gidecek.
        setForm({ content: "" }) // input boş kalması için
    }

    // INPUT (Things To Do)
    const onChangeInput = (e) => {
        setForm({ [e.target.name]: e.target.value })
    }

    // ADD DATA TO API
    const addTodo = async (item) => {
        await axios.post(`https://630f37fc37925634188a39d5.mockapi.io/todos`, item)
        setTodos(todos.concat([item]))
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

                <Section 
                todos={todos} setTodos={setTodos}
                />


                </div>

            </div>
        </div>
    )
};

export default Homepage;