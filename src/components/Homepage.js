import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

// COMPONENTS
import Section from './Section';
import Footer from './Footer';
import WordAlert from './WordAlert';


function Homepage({ user, setUser }) {

    const [todos, setTodos] = useState([])
    const [form, setForm] = useState({ content: "" })
    const [selected, setSelected] = useState("All")
    const [wordAlert, setWordAlert] = useState(null)

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
            alert("Please do not leave the list blank!")
            return false; // sonrasında boş liste oluşturmaması için
        }

        if (form.content.split(" ").find(x => x.length > 10)) {
            // alert("Please enter a valid word or leave a space.")
            setWordAlert("WordAlert")
            setTimeout(() => {
                setWordAlert(null)
            }, 2000)
            return false;
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


    // Reset User Button 
    const userDelete = () => {
        setUser("")
    }


    return (
        <div className='container'>
            <div className='row'>

                {/* USER SECTION START */}
                <div className='col-12 userDiv'>
                    <div className='row '>

                        <div className='col-8 col-sm-8 col-md-8 col-lg-7 ms-4 '>
                            Welcome
                            <div className='btn fs-5 x border-0 position-relative text-warning mb-2 '>"{user}"
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                                    {todos.length}
                                </span>
                            </div>
                        </div>


                        <div className='col-6 col-sm-6 col-md-1 col-lg-2 '>
                            <button
                                className='btn btn-outline-warning border-0 float-end'
                                onClick={() => userDelete()}
                            >
                                Delete User
                            </button>
                        </div>
                        
                    </div>
                </div>
                {/* USER SECTION FINISH */}


                {/* TODO FORM CONTAINER START */}
                <div className='main-box container-fluid' >
                    <div className='row'>

                        <h1 className='col-12 text-warning mb-4'>Personal Todo App</h1>

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
                                <label htmlFor="floatingInput" className='text-primary'>Things To Do</label>
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

                        {
                            wordAlert === "WordAlert" ? <WordAlert /> : null
                        }

                        <Section todos={todos} setTodos={setTodos} selectedTodos={selectedTodos} />
                        <Footer todos={todos} setSelected={setSelected} />
                    </div>

                </div>
                {/* TODO FORM CONTAINER FINISH */}

                {/* alikartalonline start */}
                <div className='col-12 alikartalonline '>
                    {new Date().getFullYear()} Copyright: <a
                        href="https://github.com/alikartalonline"
                    >
                        alikartalonline
                        <svg
                            height="18"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            version="1.1"
                            width="32"
                            data-view-component="true"
                            className="octicon octicon-mark-github v-align-middle">
                            <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                        </svg></a>
                </div>
                {/*  alikartalonline finish */}

            </div>
        </div>
    )
};

export default Homepage;