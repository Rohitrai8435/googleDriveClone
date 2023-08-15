import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDTFSo2d9bduGcGmL57wWHDIefOnpbK0Zs",
    authDomain: "drive-68af1.firebaseapp.com",
    projectId: "drive-68af1",
    storageBucket: "drive-68af1.appspot.com",
    messagingSenderId: "959089127861",
    appId: "1:959089127861:web:8816fac33487716a1d29fc",
   
  };
  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const storage=firebase.storage();
  const auth=firebase.auth();
  const db=firebase.firestore();
  const provider= new firebase.auth.GoogleAuthProvider();
  
  export {storage,auth,db,provider}