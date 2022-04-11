

import { Component } from "react";

import React from "react";
import AddIcon from '@mui/icons-material/Add';

import './Todo.css'

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Paper from '@mui/material/Paper';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import { purple, grey } from '@mui/material/colors';
import InputBase from '@mui/material/InputBase'
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch } from 'react-redux';
import { logout } from '../../Redducer/userReducer';
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import { updateUser } from "../Login/Login";
import { getUser } from "../Login/Login";
import Checkbox from '@mui/material/Checkbox';





export default function Todo(props) {
    const dispatch = useDispatch()

    const [user, setUser] = useState("")
    const [listTodo, setListTodo] = useState([])
    const [inputTodo, setInputTodo] = useState("")
    const [preTodo, setPreTodo] = useState({
        Todo: "",
        edit: false,
        checked: false
    })
    const [deleteAllChecked, setdeleteAllChecked] = useState(false)

    useEffect(async () => {
        let userData = await getUser(props.user)

        setUser(userData.username)
        setListTodo(userData.todo)
       


    }, [])
    useEffect(async () => {
        
        
       
        let a = listTodo.some((x)=>{
            return x.checked == true
        })
        
        if(!a){
            setdeleteAllChecked(false)
        }else{
            setdeleteAllChecked(true)
        }
        let newUser = await getUser(props.user)
        newUser.todo = listTodo        
        await updateUser(newUser)

    }, [listTodo])

    const handleAddTodo = (e) => {
        this.setState({
            listTodo: [e]
        })
    }
    const handleDeleteTodo = (e) => {
        console.log(e + 10)
    }



    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    return (
        <div className="Todo-bg">
            <div className="todolist">
                <Typography sx={{ m: 0, textAlign: 'left', paddingLeft: '42px', paddingBottom: '20px' }} variant="h6" gutterBottom component="div">
                    Todolist
                </Typography>
                <Typography sx={{ m: 0, textAlign: 'left', paddingLeft: '45px', paddingBottom: '5px' }} variant="body1" gutterBottom component="div">
                    Xin chào : {user}
                </Typography>
                <Typography sx={{ m: 0, textAlign: 'left', paddingLeft: '45px', paddingBottom: '20px' }} variant="body1" gutterBottom component="div">
                    Hãy viết ra những công việc bạn cần làm ~
                </Typography>
                <Paper variant="outlined" square sx={{ p: '2px 4px', margin: 'auto', display: 'flex', alignItems: 'center', width: 700, }}>
                    <TextField
                        label=""
                        value={inputTodo}
                        onChange={(e) => {
                            setInputTodo(e.target.value)
                        }}
                        id="filled-start-adornment"
                        sx={{ m: 1, width: '80ch' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">Thêm mới :</InputAdornment>,
                        }}
                        variant="standard"

                    />


                    <Tooltip title="Lưu">
                    <IconButton onClick={() => {
                        if (inputTodo !== "") {
                            setListTodo([...listTodo, {
                                Todo: inputTodo,
                                edit: false,
                                checked:false
                            }])

                            


                            setInputTodo("")

                        }
                    }} >
                        <CheckIcon />
                    </IconButton>
                    </Tooltip>

                </Paper>


                {
                    listTodo.map((td, index) => {
                       
                        if (!td.edit) {
                            return (<Paper variant="outlined" square sx={{ p: '2px 4px', margin: 'auto', marginTop: '10px', display: 'flex', alignItems: 'center', width: 700 }}
                            >
                                <Checkbox onClick={()=>{
                                     let hh = listTodo
                                     let b= hh[index].checked
                                     hh[index].checked = !b
                                     setListTodo([...hh])
                                }} {...label} checked = {td.checked} />
                                <InputBase
                                    value={td.Todo}
                                    sx={{ ml: 1, flex: 1 }}
                                    autoFocus={false}
                                    inputProps={{ 'aria-label': 'search google maps' }}

                                />

                                <Tooltip title="Chỉnh sửa">
                                    <IconButton
                                        onClick={() => {

                                            let hh = listTodo
                                            hh.map((h) => {
                                                if (h.edit) {
                                                    h.edit = false
                                                    h.Todo = preTodo.Todo
                                                }
                                            })
                                            setPreTodo({
                                                Todo: hh[index].Todo,
                                                edit: false
                                            })
                                            hh[index].edit = true;
                                            console.log(hh)


                                            setListTodo([...hh])

                                        }}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={td.checked && "Xóa" || "Hãy lựa chọn công việc để xóa"}>
                                    <IconButton  onClick={() => {

                                       if(td.checked){
                                        let haha = listTodo
                                        for( let i =  0 ; i< haha.length ; i++){
                                            if(haha[i].edit){
                                                haha[i].edit = false;
                                            }
                                            
                                        }
                                        haha.splice(index, 1)

                                        setListTodo([...haha])
                                       }
                                    }}>
                                        <DeleteIcon color={!td.checked && "disabled" || "error"}  />
                                    </IconButton>
                                </Tooltip>


                            </Paper>)
                        } else {
                            return (
                                <Paper variant="outlined" square sx={{ p: '2px 4px', margin: 'auto', marginTop: '10px', display: 'flex', alignItems: 'center', width: 700 }}
                                >

                                    <TextField

                                        value={td.Todo}
                                        sx={{ ml: 1, flex: 1 }}
                                        autoFocus={td.edit}
                                        onChange={
                                            (e) => {

                                                let ahha = listTodo;
                                                ahha[index].Todo = e.target.value
                                                console.log(ahha)
                                                setListTodo([...ahha])

                                            }
                                        }

                                        inputProps={{ 'aria-label': 'search google maps' }}
                                        variant="standard"

                                    />

                                    <Tooltip title="Lưu">
                                        <IconButton
                                            onClick={() => {
                                                let hh = listTodo
                                                hh[index].edit = false;
                                                setListTodo([...hh])
                                            }}>
                                            <CheckIcon />
                                        </IconButton>

                                    </Tooltip>
                                    <Tooltip title="Hủy">

                                        <IconButton onClick={() => {

                                            let haha = listTodo
                                            haha[index].Todo = preTodo.Todo
                                            haha[index].edit = false

                                            setListTodo([...haha])
                                        }}>
                                            <CancelIcon />
                                        </IconButton>

                                    </Tooltip>

                                </Paper>)
                        }
                    })
                }
                <div style={{ marginTop: "20px",marginRight:"50px", display:"flex", justifyContent:"right" }}>

                 <Tooltip title="Xóa các lựa chọn">
                       
                           <Typography style={{cursor:"pointer",fontWeight:"600"}} onClick={()=>{
                           
                           let hh = listTodo;
                           for(let i = 0;i<hh.length;i++){
                               if(hh[i].checked){
                                   hh.splice(i,1) 
                                   i--;                                 
                               }
                           }
                           setListTodo([...hh])
                        }} color={!deleteAllChecked&& "disabled" || "error"}>Xóa các lựa chọn</Typography>
                       
                   </Tooltip>

                </div>
                <div style={{ marginTop: "20px" }}>

                    <Tooltip title="Đăng xuất">
                        <IconButton onClick={() => {
                            dispatch(logout())
                        }}>
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>

                </div>
            </div>

        </div>
    )


}

