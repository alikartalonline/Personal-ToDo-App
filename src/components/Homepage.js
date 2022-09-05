import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

// COMPONENTS
import Section from './Section';
import Footer from './Footer';



function Homepage({ user, setUser }) {

    const [todos, setTodos] = useState([])
    const [form, setForm] = useState({ content: "" })
    const [selected, setSelected] = useState("All")


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

    // SELECTED LIST FILTER
    let selectedTodos =
        selected === "All" ? todos :
            selected === "Active" ? todos.filter(x => x.isCompleted === false) :
                todos.filter(x => x.isCompleted === true)


    const userDelete = () => {
        setUser("")
    }

    return (
        <div className='container'>
            <div className='row'>

                {/* USER SECTION START */}
                <div className='col-12 userDiv'>

                    <div className='col-2'></div>

                    <div className='col-9'>
                        Welcome "<span className='text-warning'>{user}</span>"
                        <button
                            className='btn btn-outline-warning border-0 float-end'
                            onClick={() => userDelete()}
                        >
                            Delete User
                        </button>
                    </div>

                    <div className='col-2'></div>

                </div>
                {/* USER SECTION FINISH */}


                {/* TODO FORM CONTAINER START */}
                <div className='main-box container ' >

                    <h1 className='col-12 text-warning mb-4'>"Todo App" - Popupsmart React Practicum</h1>

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

                    <Section todos={todos} setTodos={setTodos} selectedTodos={selectedTodos} />
                    <Footer todos={todos} setSelected={setSelected} />
                </div>
                {/* TODO FORM CONTAINER FINISH */}

            </div>
        </div>
    )
};

export default Homepage;