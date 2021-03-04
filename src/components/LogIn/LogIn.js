// import React, {useContext, useState} from 'react';
// import firebase from "firebase/app";
// import "firebase/auth";
// import firebaseConfig from './firebase.config';
// import { UserContext } from '../../App';
// import { useHistory, useLocation } from 'react-router-dom';


// firebase.initializeApp(firebaseConfig);

// function LogIn() {
//   const[newUser, setNewUser] = useState(false);
//   const [user, setUser] = useState({
//     isSignedIn: false,
//     newUser: false,
//     name: '',
//     email: '',
//     photo: ''

//   });

//  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
//   const history = useHistory();
//   const location = useLocation();
//   const { from } = location.state || { from: { pathname: "/" } };

//   const googleProvider = new firebase.auth.GoogleAuthProvider();
//   var fbProvider = new firebase.auth.FacebookAuthProvider();
//   const handleSignIn = () => {
//    // console.log('clicked');
//    firebase.auth().signInWithPopup(googleProvider)
//    .then(res => {
//      const{displayName, email, photoURL} =res.user;
//      const signedInUser = {
//        isSignedIn : true,
//        name : displayName, 
//        email : email,
//        photo: photoURL
//      }
//      setUser(signedInUser);
//      console.log(displayName,email);
//    })
//    .catch(err =>{
//      console.log(err)
//    })
//   }

//   const handleSignOut = () => {
//     firebase.auth().signOut()
//     .then(res => {
//       const signedOutUser = {
//         isSignedIn: false,
//         name: '',
//         email: '',
//         photo: '',
//         error: '',
//         success: false
//       }
//     setUser(signedOutUser);
//     })
//     .catch(err => {

//     })
//   }

//   const handleSubmitForm = (e) => {
//    // console.log(user.email, user.password);
//     if(newUser && user.email && user.password){
//       //console.log('submitting')
//       firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//     .then((res) => {
//       const newUserInfo = {...user};
//       newUserInfo.error = '';
//       newUserInfo.success = true;
//       setUser(newUserInfo);
//       updateUserName(user.name);
//       // Signed in 
//       //console.log(res)
//       // ...
//   })
//   .catch((error) => {
//     const newUserInfo ={...user};
//     newUserInfo.error = error.message;
//     newUserInfo.success = false;
//     setUser(newUserInfo);
   
//     //console.log(errorCode, errorMessage);
//     // ..
//   });
//     }

//     if(!newUser && user.email && user.password){
//       firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//       .then(res => {
//         const newUserInfo = {...user};
//         newUserInfo.error = '';
//         newUserInfo.success = true;
//         setUser(newUserInfo);
//         setLoggedInUser(newUserInfo);
//         history.replace(from);
//        //console.log("sign in user", res.user);
//       })
    
//      .catch((error) => {
//       const newUserInfo ={...user};
//       newUserInfo.error = error.message;
//       newUserInfo.success = false;
//       setUser(newUserInfo);
//   });

//     }
//     e.preventDefault();
    
//   }
//     const updateUserName = name => {
//       const user = firebase.auth().currentUser;

//       user.updateProfile({
//         displayName: name
        
//       }).then(function() {
//         // Update successful.
//         console.log('user name upadate');
//       }).catch(function(error) {
//         // An error happened.
//         console.log(error);
//       });

//     } 
//   const handleBlur = (e) => {
//    // console.log(e.target.name, e.target.value);
//     let isFieldValid = true;
//     if(e.target.name === 'email'){
//       isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
//        //console.log(isEmailValid);
//     }
//     if(e.target.password === 'password'){
//       const isPasswordValid = e.target.value.length > 6;
//       const passwordHasNumber = /^\d+$/.test(e.target.value);
//       isFieldValid = isPasswordValid && passwordHasNumber;
//     }
//     if(isFieldValid){
//       const newUserInfo = {...user};
//       newUserInfo[e.target.name] = e.target.value;
//       setUser(newUserInfo);
//     }
//   }
// //for fbSign up
// const handleFbSignIn = () =>{
//   firebase
//   .auth()
//   .signInWithPopup(fbProvider)
//   .then((result) => {
//     var credential = result.credential;
//    // The signed-in user info.
//     var user = result.user;
//     console.log(user)

//     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//     var accessToken = credential.accessToken;

//     // ...
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;

//     // ...
//   });


// }
//   return (
//     <div style={{textAlign: 'center'}}>
//       {
//         user.isSignedIn ? <button onClick ={handleSignOut}>Sign Out</button> :
//         <button onClick ={handleSignIn}>Sign In</button>
//       }
//       <br/>
//       <button onClick={handleFbSignIn}>Sign in using Facebook</button>
      
//       {
//         user.isSignedIn && 
//         <div>
//           <p>Welcome, {user.name}</p>
//           <p>{user.email}</p>
//           <img src ={user.photo} alt=""></img>
//         </div>
//       }

//       <h1>Our Own Authentication</h1>
//       {/* <p>Email: {user.email}</p>
//       <p>Password: {user.password}</p> */}
//       <input type="checkbox" phone="newUser" onChange={() => setNewUser(!newUser)} id="" />
//       <label html for="newUser">New user sign up</label>
//       <form onSubmit={handleSubmitForm}>
//         {newUser && <input type="text" phone="name" onBlur={handleBlur} placeholder="Enter your name" ></input>}
//         <br/>
//         <input type="text" phone="email" onBlur={handleBlur} placeholder="enter your email" required></input>
//         <br/>
//         <input type="password" phone="password" onBlur={handleBlur} placeholder="enter your password" required></input>
//         <br/>
//         <input type="submit" value={newUser ? 'SignUp' : 'SignIn'}></input>
//       </form>
//       <p style={{color : 'red'}}>{user.error}</p>
//        {user.success && <p style={{color : 'green'}}>User {newUser ? 'created' : 'logged in'} successfully!</p>}
//     </div>
    
//   );
// }

// export default LogIn;
