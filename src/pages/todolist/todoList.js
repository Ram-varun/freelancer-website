import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getTodoListApi, addTodoListApi, updateTodoListApi, deleteTodoListApi, deleteAllTodoListApi } from '../../service/service';
import { toast } from 'react-toastify';
import "./todoList.css";
import svg from '../../assets/logout.svg'

const initialState = {
    serviceName: '',
    serviceDescription: '',
    price: '',
    upiId: '',
    pictureLink: ''
}

export const TodoList = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState(initialState);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (!value.trim()) return toast.error(`Please type some totos to ${editIndex ? 'Update' : 'Add'}`);
        // let data = { todoList: `${value}` }
        // if (editIndex === '') {
        await addTodoListApi(values).then((res) => {
            if (res.data.status === 200) {
                toast.success('Service Added successfully')
                setValues(initialState)
                // getTodoList().then(() => { toast.success('Added successfully') })
            }
        })
        // } else {
        //     await updateTodoListApi(editIndex, data).then((res) => {
        //         if (res.data.status === 200) {
        //             getTodoList().then(() => { toast.success('Updated successfully') })
        //         }
        //     })
        // }
        // setValue('')
        // setEditIndex('')
    }

    const setValue = (e) => {
        const { id, value } = e.target;
        console.log(id, value)
        setValues({ ...values, [id]: value })
    }

    const logout = () => {
        localStorage.clear();
        navigate('/signin');
    }

    return (
        <div className="App">

            {/* <button className="logout" onClick={() => logout()}>Logout</button> */}
            <h1 className="heading">Add services</h1>
            <img className="logout" alt="logout" src={svg} height='30' onClick={logout} />
            <form onSubmit={handleSubmit}>
                <input id="serviceName" type="text" placeholder="Service Name..." value={values.serviceName} onChange={setValue} autoFocus /><br /><br />
                <input id="serviceDescription" type="text" placeholder="Service description..." value={values.serviceDescription} onChange={setValue} autoFocus /><br />
                <br />
                <input id="price" type="number" placeholder="Price..." value={values.price} onChange={setValue} autoFocus /><br />
                <br />
                <input id="upiId" type="text" placeholder="UPI number..." value={values.upiId} onChange={setValue} autoFocus /><br />
                <br />
                <input id="pictureLink" type="text" placeholder="Picture link..." value={values.pictureLink} onChange={setValue} autoFocus /><br />
                <button type="submit">{editIndex ? 'Update' : 'Add'}</button>
                <br />
                <br />
                <Link to="/services">
                    <span>Go to services list page</span>
                </Link>
            </form>

            {/* <div className="list">
                {
                    todoList && todoList.length ?
                        <div className="listHeading"><h2>All Lists</h2><button className="deleteAll" onClick={deleteAll} >Delete All</button></div> : null
                }
                {
                    todoList && todoList.length ? todoList.map((item, index) => {
                        return (
                            <div className="eachList fs20" key={item._id}>
                                <span>{index + 1 + "."}</span>&nbsp;&nbsp;&nbsp;<span className="text">{item.todoList}</span> &nbsp;&nbsp;&nbsp;
                                <EditIcon className="curptr" onClick={() => editItem(item.todoList, item._id)} />&nbsp;&nbsp;&nbsp;
                                <DeleteIcon className="curptr" onClick={() => deleteItem(item._id)} />
                            </div>
                        )
                    }) : <span className="fs20">Empty List</span>
                }
            </div> */}
        </div>
    )
}