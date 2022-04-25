



import React, { useEffect } from "react";


import './Todo.css'
import { Link } from "react-router-dom";

import IconButton from '@mui/material/IconButton';

import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';

import TextField from '@mui/material/TextField';

import Paper from '@mui/material/Paper';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';

import InputBase from '@mui/material/InputBase'
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch } from 'react-redux';
import { logout, updateListTodo } from '../../Redducer/userReducer';
import { useState } from "react";

import LogoutIcon from '@mui/icons-material/Logout';
import { updateUser } from "../Login/Login";

import Checkbox from '@mui/material/Checkbox';
import { useSelector } from "react-redux";
import { selectTodoList , selectUser } from "../../Redducer/userReducer";
import {useNavigate} from 'react-router-dom';
import Loading from "../Loading";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });




export default function Todo(props) {
    const dispatch = useDispatch()

    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();
    const [showAlert,setShowAlert] = useState(false)
    const [inputTodo, setInputTodo] = useState("")
    const [preTodo, setPreTodo] = useState({
        Todo: "",
        edit: false,
        checked: false
    })
    const [editTodo,setEditTodo] = useState("")
    const [deleteAllChecked, setdeleteAllChecked] = useState(false)
    const listTodo = useSelector(selectTodoList);
    const user = useSelector(selectUser)
    const userData = useSelector((state) => state.user.userData)
    const [checkLogin,setChecklogin] = useState(true)    

    useEffect(()=>{

        setTimeout(()=>{
           setLoading(false)
        },1500)
        const login = localStorage.getItem("login");

        if(!login && checkLogin){
           navigate('/')
          
        }
        setChecklogin(false)
        localStorage.removeItem('login')

    },)
    
   useEffect( ()=>{
     for(let i = 0 ; i< listTodo.length ; i++){
         if(listTodo[i].checked){
            setdeleteAllChecked(true)
            break
         }else{
             if(i == listTodo.length -1){
                setdeleteAllChecked(false)
             }
         }
     }
     
   },[listTodo])
    

    



    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    return loading? (<Loading/>) : (
        <div className="Todo-bg">
          
                <div className="todolist">
                <Typography sx={{ m: 0, textAlign: 'left', paddingLeft: '8%', paddingBottom: '0px' }} variant="h6" gutterBottom component="div">
                    YOUR TO DO LIST
                </Typography>
                <Typography sx={{ m: 0, textAlign: 'left', paddingLeft: '8%', paddingBottom: '5px' }} variant="body1" gutterBottom component="div">
                    Xin chào : {user}
                </Typography>
                <Typography sx={{ m: 0, textAlign: 'left', width:'83%', paddingLeft: '8%', paddingBottom: '30px' }} variant="body1" gutterBottom component="div">
                    Hãy viết ra những công việc bạn cần làm ~
                </Typography>
                <Paper variant="outlined" square sx={{ p: '0px 4px', margin: 'auto', display: 'flex', alignItems: 'center', width: "83%", }}>
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

                            dispatch(updateListTodo({
                                
                                listTodo:[...listTodo, {
                                    Todo: inputTodo,
                                    edit: false,
                                    checked:false
                                }]
                            }))
                            

                            


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
                            return (<Paper variant="outlined" square sx={{ p: '2px 4px', margin: 'auto', marginTop: '10px', display: 'flex', alignItems: 'center', width: "83%" }}
                            >
                                <Checkbox onClick={()=>{
                                     let hh = [...listTodo]
                                     console.log(listTodo)
                                     let b= hh[index].checked
                                     
                                     hh[index] = {
                                         ...hh[index],
                                         checked: !b
                                     }
                                    
                                     dispatch(updateListTodo({
                                         listTodo:[...hh]
                                     }))
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

                                            let hh = [...listTodo]
                                            for(let i=0;i<hh.length;i++){
                                                if (hh[i].edit) {
                                                    hh[i] = {
                                                        ...hh[i],
                                                        edit:false,
                                                        Todo:preTodo.Todo
                                                    }
                                                    
                                                }
                                            }
                                            setPreTodo({
                                                Todo: hh[index].Todo,
                                                edit: false
                                            })
                                            setEditTodo(hh[index].Todo)
                                            hh[index] = {
                                                ...hh[index],
                                                edit:true
                                            };
                                            console.log(hh)


                                            dispatch(updateListTodo({
                                                listTodo:[...hh]
                                            }))

                                        }}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={td.checked && "Xóa" || "Hãy lựa chọn công việc để xóa"}>
                                    <IconButton  onClick={() => {

                                       if(td.checked){
                                        let haha = [...listTodo]
                                        
                                        haha.splice(index, 1)

                                        dispatch(updateListTodo({
                                            listTodo:[...haha]
                                        }))
                                       }
                                    }}>
                                        <DeleteIcon color={!td.checked && "disabled" || "error"}  />
                                    </IconButton>
                                </Tooltip>


                            </Paper>)
                        } else {
                            return (
                                <Paper variant="outlined" square sx={{ p: '2px 4px', margin: 'auto', marginTop: '10px', display: 'flex', alignItems: 'center', width: "83%" }}
                                >

                                    <TextField

                                        value={editTodo}
                                        sx={{ ml: 1, flex: 1 }}
                                        autoFocus={td.edit}
                                        onChange={
                                            (e) => {

                                               setEditTodo(e.target.value)

                                            }
                                        }

                                        inputProps={{ 'aria-label': 'search google maps' }}
                                        variant="standard"

                                    />

                                    <Tooltip title="Lưu">
                                        <IconButton
                                            onClick={() => {
                                                let hh = [...listTodo]
                                                hh[index] = {
                                                    ...hh[index],
                                                    edit:false,
                                                    Todo: editTodo
                                                };
                                               
                                                dispatch(updateListTodo({
                                                    listTodo:[...hh]
                                                }))
                                            }}>
                                            <CheckIcon />
                                        </IconButton>

                                    </Tooltip>
                                    <Tooltip title="Hủy">

                                        <IconButton onClick={() => {

                                            let haha = [...listTodo]
                                            haha[index] ={
                                                ...haha[index],
                                                Todo:preTodo.Todo,
                                                edit:false
                                            }
                                           

                                            dispatch(updateListTodo({
                                                listTodo:[...haha]
                                            }))
                                        }}>
                                            <CancelIcon />
                                        </IconButton>

                                    </Tooltip>

                                </Paper>)
                        }
                    })
                }
                <div style={{ marginTop: "20px",marginRight:"8%", display:"flex", justifyContent:"right" }}>

                 <Tooltip title="Xóa các lựa chọn">
                       
                           <Typography style={{cursor:"pointer",fontWeight:"600"}} onClick={()=>{
                           
                           let hh = [...listTodo];
                           for(let i = 0;i<hh.length;i++){
                               if(hh[i].checked){
                                   hh.splice(i,1) 
                                   i--;                                 
                               }
                           }
                           dispatch(updateListTodo({
                               listTodo:[...hh]
                           }))
                        }} color={!deleteAllChecked&& "gray" || "error"}>Xóa các lựa chọn</Typography>
                       
                   </Tooltip>
                   

                </div>
                <div style={{ marginTop: "5px",marginRight:"8%", display:"flex", justifyContent:"right" }}>

<Tooltip title="Lưu các thay đổi">
      
          <Typography style={{cursor:"pointer",fontWeight:"600"}} onClick={ async()=>{
               let newUserx = {
                ...userData
            }
            console.log(newUserx)
            newUserx.todo = [...listTodo]

            await updateUser(newUserx)
            setShowAlert(true)
            
       }} color="primary">Lưu lại các thay đổi</Typography>
      
  </Tooltip>

  <Snackbar  open={showAlert} onClose={()=>{
      setShowAlert(false)
  }} autoHideDuration={1500}>
  <Alert color="primary" onClose={()=>{
      setShowAlert(false)
  }}
  severity="success" sx={{ width: '100%' , maxWidth:"280px",margin:"auto",marginTop:"0px" }} >Lưu các thay đổi thành công</Alert>
      </Snackbar>
  

</div>
                <div style={{ marginTop: "20px" }}>
                    
                    
                    <Tooltip title="Đăng xuất">
                        <IconButton onClick={async () => {
                          
                            localStorage.removeItem('login')
                            dispatch(logout())
                            navigate('/')
                           
                        }}>
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>
                    

                    
                </div>
            </div>
           

        </div>
    )


}

