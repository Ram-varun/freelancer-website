import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getTodoListApi, addTodoListApi, updateTodoListApi, deleteTodoListApi, deleteAllTodoListApi } from '../../service/service';
import { Card } from '../../components/card';
import { toast } from 'react-toastify';
import "./todoList.css";
import svg from '../../assets/logout.svg'

export const DisplayTodos = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [editIndex, setEditIndex] = useState('');

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        if (!userData) {
            console.log(userData)
            navigate('/signin')
            // window.location.replaceAll('/signin')
        }
    })

    useEffect(() => {
        getTodoList()
    }, [])

    const getTodoList = async () => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        if (userData && userData.userToken) {
            await getTodoListApi().then((res) => {
                setTodoList(res.data.data)
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!value.trim()) return toast.error(`Please type some totos to ${editIndex ? 'Update' : 'Add'}`);
        let data = { todoList: `${value}` }
        if (editIndex === '') {
            await addTodoListApi(data).then((res) => {
                if (res.data.status === 200) {
                    getTodoList().then(() => { toast.success('Added successfully') })
                }
            })
        } else {
            await updateTodoListApi(editIndex, data).then((res) => {
                if (res.data.status === 200) {
                    getTodoList().then(() => { toast.success('Updated successfully') })
                }
            })
        }
        setValue('')
        setEditIndex('')
    }

    const editItem = (todoList, id) => {
        setValue(todoList)
        setEditIndex(id)
    }

    const deleteItem = async (id) => {
        if (window.confirm("Are you sure want to delete this item?")) {
            await deleteTodoListApi(id).then((res) => {
                if (res.data.status === 200) {
                    getTodoList().then(() => { toast.success('Deleted successfully') })
                }
            })
        }
    }

    const deleteAll = async () => {
        if (window.confirm("Are you sure want to delete all items?")) {
            await deleteAllTodoListApi().then((res) => {
                if (res.data.status === 200) {
                    getTodoList().then(() => { toast.success('All list Deleted successfully') })
                }
            })
        }
    }

    const logout = () => {
        localStorage.clear();
        navigate('/signin');
    }

    return (
        <div className="App">

            {/* <button className="logout" onClick={() => logout()}>Logout</button> */}
            <h1 className="heading">Services</h1>
            <img className="logout" alt="logout" src={svg} height='30' onClick={logout} />
            {/*  <form onSubmit={handleSubmit}>
                <input type="text" placeholder="todo..." value={value} onChange={(e) => setValue(e.target.value)} autoFocus /><br />
                <button type="submit">{editIndex ? 'Update' : 'Add'}</button>
            </form> */}

            <div className="lists">
                {
                    todoList?.length ? todoList.map(item => {
                        return (
                            <div>
                                <Card {...item} />
                            </div>
                        )
                    }) : null
                }
                {
                    !todoList.length && <h3 className="whiteClr">No services present</h3>
                }
            </div>
            <br />
            <Link to="/addServices">
                <span>Need to Add Services? Click here</span>
            </Link>
            <br />
            <br />
            <br />

        </div>
    )
}