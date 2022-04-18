
import SignInSide from './View/Login/Login';
import './App.css';

import { useSelector } from 'react-redux';
import {selectUser} from './Redducer/userReducer'

import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
 
  Navigate
} from "react-router-dom";
// import EgretLoadable from "./Egret"
import Loading from './View/Loading';


const Todo = React.lazy(()=> import('./View/Todo/Todo'));


function App() {
  // const Todo = EgretLoadable({
  //   loader: () => import("./View/Todo/Todo")
  // });
    
  const user =   useSelector(selectUser)
  console.log(user) 
  
  return (
   
    <div className='App'>
       <Suspense fallback={<Loading/>}>
       <Router>
       
      <Routes>
        
        <Route path='/login' element={<SignInSide/>}/>
        <Route path='/todo' element={<Todo/>}/>

        <Route path="*" element={<SignInSide replace to="/login" />} />
      </Routes>
    </Router>
    </Suspense>

    </div>
  );
}

export default App;
