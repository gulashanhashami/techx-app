
import './App.css';
import { CreatePost } from './components/createPost/CreatePost';
import {Posts} from './components/posts/Posts';
import { Registration } from './components/registration/Registration';
import {Routes, Route} from "react-router-dom";
import { ProfilePage } from './components/profile/ProfilePage';
import { EditPost } from './components/editPost/EditPost';
import { useEffect } from 'react';
import {firebase, messaging, token} from './firebase';
import { getMessaging, getToken} from "firebase/messaging";

import React, { useState } from 'react'
import { db } from './firebase';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    updateDoc,
  } from "firebase/firestore";
  import addNotification from 'react-push-notification';
function App() {
  useEffect(() => {
    getNotificationData();
  }, []);
  

  const [allNotificationData, setAllNotificationData]= useState({});

  var dataCollectionNotification = collection(db, "notification");
const orderTimeQuery=query(dataCollectionNotification, orderBy("time"));

  var usersData = JSON.parse(localStorage.getItem("userDetails"));
  async function getNotificationData() {
    // var res = await onSnapshot(dataCollectionNotification);
    // setAllNotificationData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // const colRef = collection(db, "data")
    //real time update
    onSnapshot(orderTimeQuery, (snapshot) => {
     
        snapshot.docs.forEach((doc) => {
            // console.log("onsnapshot", doc.data());
            setAllNotificationData( doc.data());
          
        })
       
    })
   
  }
  // allNotificationData.sort((a, b)=>b.time-a.time)
  
  function showNotification(){
  addNotification({
    title: 'TechX Notification',
    subtitle: allNotificationData.senderName,
    message: allNotificationData.senderName+" "+allNotificationData.text,
    native: true // when using native, your OS will handle theming.
});
  }
  useEffect(()=>{
  if(allNotificationData.receiverId===usersData.uid){
    showNotification();
    }
  },[allNotificationData.time])
console.log("noti",allNotificationData);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Registration />} />
        <Route path="/posts" element={<Posts />} />
        <Route path='/create' element={<CreatePost />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/editpost' element={<EditPost />} />
      </Routes>
    </div>
  );
}

export default App;
