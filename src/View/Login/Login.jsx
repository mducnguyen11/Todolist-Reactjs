import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../Redducer/userReducer';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import axios from "axios";
const url = "https://61e1947863f8fc0017618d2b.mockapi.io/api/staffs/todo";

const getListUserApi = ()=>{
  
  return   axios.get(url)
}
const getListUser = async ()=>{
   let hh = await getListUserApi()
 
   return hh.data
}

const addUser = (user)=>{
   
   return axios.post(url,user);
}
export const updateUser = (user)=>{

   
   var _url = url + "/" + user.id;    
   return axios.put(_url,user)
}
export const getUser = async (username)=>{
    let list = await  getListUser();
    
     return list.find((user)=>{
      return user.username == username
  })
}
const getUserPassword = async (username)=>{
  let list = await  getListUser();
  let userx = list.find((user)=>{
       return user.username == username
  })
  return userx.password
}


const theme = createTheme();


export default function SignInSide() {

  const dispatch = useDispatch();
  
  const [user,setUser] = useState("")
  const [password,setPassword] = useState("")
  const handlesubmit = async (e)=>{
        e.preventDefault();
        let userInfo = await getUser(user)
       
        if(userInfo){
          console.log("1")
          if(userInfo.password == password){

            dispatch(login({
              user:userInfo.username
            }))
          
          }
        }else{
          console.log("2")
            await addUser({
              username:user,
              password:password,
              todo:[]
            })
            dispatch(login({
              user:user
            }))
        }
        
      
      
      
        
        
 }


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://thumbs.dreamstime.com/b/to-do-list-flat-design-concept-icon-logo-dark-background-white-to-do-list-flat-design-concept-icon-logo-dark-133647677.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            
            <Typography component="h1" variant="h5">
              Đăng nhập tài khoản Todolist của bạn
            </Typography>
            <Box component="form" noValidate  sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Tài khoản"
                name="username"
                autoComplete="username"
                autoFocus
                value={user}
                onChange={(e)=>{
                   setUser(e.target.value)
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e)=>{
                   setPassword(e.target.value)
                }}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handlesubmit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  
                  <Typography>Hệ thống sẽ tự động tạo mới tài khoản cho bạn nếu không thể tìm thấy dữ liệu về tài khoản của bạn</Typography>
                </Grid>
                {/* <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid> */}
              </Grid>
              
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}