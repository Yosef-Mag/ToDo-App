import React, { useState,useEffect } from 'react'
import axios from 'axios'

function Todos() {

    const[todos, setTodos] = useState([])
    const [input, setInput] = useState('')
    const [editInput, setEditInput] = useState('')
    const [editId, setEditId] = useState(null)
    const [toggleEditBox, setToggleEditBox] = useState(false)
    
    const getTodos = () => {
        axios.get('http://localhost:5000/todos')
            .then(res => setTodos(res.data))
            .then(console.log(todos))
                .catch(error => console.log(error + ' ' + 'from axios get'))
    }
    

    const addTodo = (e) => {
        // e.preventDefault()
        const todoContent = {
            content : input
        }
        return axios.post('http://localhost:5000/', {
                content: todoContent.content
                                            }
                )
                .then(res => console.log((JSON.stringify(res.data))+ ' ' + 'New Todo is added'))
                    .then(setTimeout(function(){ window.location.reload(); }, 200))
                        .catch(error => console.log(error + ' ' + 'from axios add'))      
    }


    const deleteTodo = (_id) => {
        return axios.delete('http://localhost:5000/delete/'+ _id)
            .then(res => console.log('item ' + _id + ' has been deleted'))
                .then(setTimeout(function(){ window.location.reload(); }, 200))
                    .catch(error => console.log(error + ' ' + 'from axios delete' + ' ' + _id))   
    }

    const editTodo = () => {
        const updatedTodo = {
            content : editInput
        }
        return axios.patch('http://localhost:5000/'+ editId , {
            content: updatedTodo.content
                                                        }
        )
            .then(console.log('item ' + editId+ ' has been updated'))
                .then(setToggleEditBox(false))
                    .then(setTimeout(function(){ window.location.reload(); }, 200))
                        .catch(error => console.log(error + ' ' + 'from axios edit' + ' ' + editId))   
    }

    const editTodoBox = (id) => { 
        setToggleEditBox(true)
        setEditId(id)
    }

        const EditBox = (id) =>
            <div className='row' id="form-box">
                <form className='col s12 l12' id='form-edit'>
                    <div className='col s2 l5 offset-l3 offset-s3'>
                    <input id="text-area" type='text' autoFocus={true} value={editInput} onChange={e => setEditInput(e.target.value)} />
                    </div>
                    <a id='done' className="btn-floating btn-large waves-effect waves-light green accent-4 left" onClick={() => editTodo(id)}><i className="material-icons">done</i></a>
                    <a id="clear" className="btn-floating btn-large waves-effect waves-light red accent-4 left" onClick={() => setToggleEditBox(false)}><i className="material-icons">clear</i></a>
                    
                </form>
            </div>  



    useEffect( () => {
        getTodos()
    }, [])

    return (
        <>
        <div id='title-box'>
            <p id="rotate-name">Todo App</p>
        </div>
        <div className='row' id="form-box">
            <form className='col s12 l12' id='form'>
                <div className='row'>
                    <div className='col s5 l6 offset-l3 offset-s3'>
                        <input placeholder='Add your todo here' id="text-area" type='text' value={input} onChange={e => setInput(e.target.value)} />
                    </div>
                    <div className='col s2 l2'>
                        <a className="btn-floating btn-large waves-effect waves-light green accent-4 left" onClick={addTodo}><i className="material-icons">add</i></a>
                    </div>
                    
                </div>
            </form>
            <div>
                    <div className='row'>
                {
                    todos.length ? 
                    <>
                    <ul id='list' className='col s6 l6 offset-l3 offset-s3'>
                        {todos.map(todo => 
                            <li id='list-item' key={todo._id}>
                                <span id="todo">{todo.content}</span>
                                <a id='edit' className="btn-floating btn-large waves-effect waves-light orange accent-4" onClick={() => editTodoBox(todo._id)}><i className="material-icons">edit</i></a>
                                <a id='delete' className="btn-floating btn-large waves-effect waves-light red accent-4" onClick={() => deleteTodo(todo._id)}><i className="material-icons">delete</i></a>
                            </li>
                        )}
                    </ul>
                        {toggleEditBox ? <EditBox /> : null}
                    </>
                : 
                    <div className='col s8 l7 offset-l4 offset-s3' id='no-todos-box'>
                        <p id='no-todos'>You Have nothing todo</p> 
                    </div>
                }
                    </div>
            </div>
        </div>
        </>
    )
}

export default Todos
