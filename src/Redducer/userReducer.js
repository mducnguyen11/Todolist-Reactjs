import { createSlice } from "@reduxjs/toolkit"
import { updateUser , addUser } from "../View/Login/Login";

export const userSlice = createSlice({
    name:"user",
    
    initialState:{
        username: "",
        todoList:[],
        userData:{}
    },
    reducers:{
        login: (state,action)=>{            
                console.log(action.payload)
                
                return{
                    ...state,
                    userData:action.payload,
                    username:action.payload.username,
                    todoList:action.payload.todo
                }
                
        },
        logout: (state)=>{
           state.username = null;
           state.todoList = [];
        },
        updateListTodo: (state ,action)=>{
            console.log(action.payload)
            console.log(state.username)
            
            return{
                ...state,                        
                todoList: [...action.payload.listTodo]
            }
            
        },
        createUser: (state,action) =>{
            

           
              state.username = action.payload.user;               
              state.todoList = [];
        }
    }
})

export const {login, logout,updateListTodo , createUser} = userSlice.actions
export const selectUser = (state)=>{
    console.log(state.user)
    return state.user.username
}
export const selectTodoList = (state)=>{
    
    return state.user.todoList
}
export default userSlice.reducer