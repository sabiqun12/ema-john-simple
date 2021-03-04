import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
   if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
   }
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    // console.log('clicked');
   return firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const{displayName, email, photoURL} =res.user;
      const signedInUser = {
        isSignedIn : true,
        name : displayName, 
        email : email,
        photo: photoURL,
        success: true
      }
      return signedInUser;
     // console.log(displayName,email);
    })
    .catch(err =>{
      console.log(err)
    })
   }


//for fbSign up
 export const handleFbSignIn = () => {
    var fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
    .then((result) => {
    var credential = result.credential;
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    user.success = true;
    return user;
    //console.log(user)
    
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log(errorCode, errorMessage, email, credential);

    // ...
  });
}

  export const handleSignOut = () => {
   return firebase.auth().signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false
      }
      return signedOutUser;
    })
    .catch(err => {

    });
  }

  export const createUserWithEmailAndPassword = (name, email, password) => {
     return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
    //  const newUserInfo = {...user};
     const newUserInfo = res.user;
     newUserInfo.error = '';
     newUserInfo.success = true;
     updateUserName(name);
     //setUser(newUserInfo);
     return newUserInfo;
    
     // Signed in 
     //console.log(res)
     // ...
 })
 .catch((error) => {
   const newUserInfo ={};
   newUserInfo.error = error.message;
   newUserInfo.success = false;
   return newUserInfo;
   //setUser(newUserInfo);
  
   //console.log(errorCode, errorMessage);
   // ..
 });
  }

  export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      //const newUserInfo = {...user};
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
    //   setUser(newUserInfo);
    //   setLoggedInUser(newUserInfo);
    //   history.replace(from);
    //   console.log("sign in user", res.user);

    })
  
   .catch((error) => {
    const newUserInfo ={};
    newUserInfo.error = error.message;
    newUserInfo.success = false;
   // setUser(newUserInfo);
   return newUserInfo;

});

  }

  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
      
    }).then(function() {
      // Update successful.
      console.log('user name upadate');
    }).catch(function(error) {
      // An error happened.
      console.log(error);
    });

  } 
