import logo from './logo.svg';
import SignInSide from './View/Login/Login';
import './App.css';
import Todo from './View/Todo/Todo';
import { useSelector } from 'react-redux';
import {selectUser} from './Redducer/userReducer'
import { getUser } from './View/Login/Login';
import { useEffect,useState } from 'react';





function App() {
  
    
  const user =   useSelector(selectUser)
   
 
  return (
    <div className="App">
     {user? <Todo user={user.user}/> : <SignInSide/>}
    
    </div>
  );
}

export default App;
