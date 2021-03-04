import React, {useState, useContext} from 'react';

import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LogInManager';



function SignIn() {
  const[newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    newUser: false,
    name: '',
    email: '',
    photo: ''

  });

  initializeLoginFramework();
  const[loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () =>{
      handleGoogleSignIn()
      .then(res => {    
        handleResponse(res, true);
      })
        
  }

  const signOut = () =>{
      handleSignOut()
      .then(res => {    
        handleResponse(res, false)    
      })
      
    }

  const fbSignIn = () =>{
      handleFbSignIn()
      .then(res => {
          setUser(res);
          setLoggedInUser(res);
          history.replace(from);
      })
  }


  const handleSubmit = (e) => {
    console.log(user.email, user.password);
    if(newUser && user.email && user.password){
      //console.log('submitting')
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
          handleResponse(res, true);
      })
  
    }

    if(!newUser && user.email && user.password){
        signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
            handleResponse(res, true);
        })
    }
    e.preventDefault();
    
  }

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect)
    {
        history.replace(from);
    }
}
   
  const handleBlur = (e) => {
   // console.log(e.target.name, e.target.value);
    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
       //console.log(isEmailValid);
    }
    if(e.target.password === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /^\d+$/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }

}
  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick ={signOut}>Sign Out</button> :
        <button onClick ={googleSignIn}>Sign In</button>
      }
      <br/>
      <button onClick={fbSignIn}>Sign in using Facebook</button>
      
      {
        user.isSignedIn && 
        <div>
          <p>Welcome, {user.name}</p>
          <p>{user.email}</p>
          <img src ={user.photo} alt=""></img>
        </div>
      }

      <h1>Our Own Authentication</h1>
      {/* <p>Email: {user.email}</p>
      <p>Password: {user.password}</p> */}
      <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} id="" />
      <label html for="newUser">New user sign up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Enter your name" />}
        <br/>
        <input type="text" name="email" onBlur={handleBlur} placeholder="enter your email" required />
        <br/>
        <input type="password" name="password" onBlur={handleBlur} placeholder="enter your password" required />
        <br/>
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
      </form>
      <p style={{color : 'red'}}>{user.error}</p>
       {user.success && <p style={{color : 'green'}}>User {newUser ? 'created' : 'logged in'} successfully!</p>}
    </div>
    
  );
}

export default SignIn;
