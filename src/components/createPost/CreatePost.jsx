
import React from 'react'
import "./createPost.css";
import { useState, useCallback } from 'react';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Button from '@mui/material/Button';
import Webcam from "react-webcam";
import { db } from '../../firebase';
import {addDoc, collection, deleteDoc, doc, getDocs, updateDoc} from "firebase/firestore";
import { async } from '@firebase/util';
import { useNavigate } from "react-router-dom";

export const CreatePost=({item})=> {
const [postText, setPostText]= useState("");
const [postphoto, setPostPhoto]= useState([]);
// const [postCameraphoto, setPostCameraPhoto]= useState("");
const [openCamera, setOpenCamera] = useState(false);
const [captureImage, setCaptureImage] = useState("");
const [allImage, setAllImage] =useState([]);
let navigate=useNavigate();

const webcamRef = React.useRef(null);
  var dataCollection = collection(db, "posts");
  
  //function for handle file input 
  async function handleChangeForFile(e) {
    const file= e.target.files[0]
    const convertedFileInbase64= await converfile(file)
  
    setPostPhoto([...postphoto,convertedFileInbase64])
  };

  //function for convert file into base64 file
  const converfile =(file)=>{
    return new Promise((resolve, reject)=>{
      var fileReader= new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload =()=>{
        resolve(fileReader.result)
      }
      fileReader.onerror =(err)=>{
       
          reject(err)
        
      }
    })
  }
  // console.log(postphoto)
  
  const videoConstraints = {

    facingMode: "user"
  };
  //function for capture photo/selfie
  const capture = useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setPostPhoto([...postphoto, imageSrc]);
      
    },
    [postphoto]
  );

  const deleteReviewImage=(index)=>{
    // console.log(index);
    postphoto.splice(index,1);
    setPostPhoto([...postphoto]);

  }

  //  function for post the data in firestore
   async function postDataFunction(){

    var usersData=JSON.parse(localStorage.getItem("userDetails"));
    let confirm = window.confirm("Are you sure, you want to create this post?");
    if (confirm) {
         var dataObject={
          name: usersData.name,
          email : usersData.email,
          profilePic:usersData.profilePic,
          postText: postText,
          imageData: postphoto,
          heart:0,
          smile:0,
          thumbsUp:0,
          time: Date.now(),
         }
    
         await addDoc(dataCollection, dataObject);
         setPostText("");
         setPostPhoto("");
         setCaptureImage("");
        //  console.log(dataObject)
        alert("Created successfully");
    } 
   }


  return (
        <>
        
    <div  className='createContainer'>
    <div className='createContain1'>
       
        <div className='textBox'>
            <p style={{ marginLeft:"7%", color:"blue", fontSize:"2.5vw", fontWeight:"800"}}>Create post</p>
            <span style={{ marginRight:"7%", color:"blue", fontSize:"2.5vw", fontWeight:"800", cursor:"pointer"}}><p onClick={()=>{navigate("/posts")}}>X</p></span>
        </div>
        <div className='writeYourTextBox'>
        <input name='textData' className='writeYourText' type="text" placeholder="What's in your mind?" onChange={(e)=>setPostText(e.target.value)} />
        </div>
        <div className='postReviewImageBox'>
        {postphoto.map((postImageItem, reviewImageIndex) => {
                  return (
                    <div key={reviewImageIndex} className="reviewPotedImageBox">
                       <div className='imageAndTextforPostBox'>
                      <img className='ReviewPostImage' src={postImageItem} alt="" />
                      <p style={{fontSize:"1.7vw", fontWeight:"bold", color:"gray"}}>Media {reviewImageIndex+1}</p>
                      </div>
                      <span style={{ marginRight:"7%", color:"blue", fontSize:"2.5vw", cursor:"pointer"}}><p onClick={()=>{deleteReviewImage(reviewImageIndex)}}>X</p></span>
                    </div>
                  );
                })}
        </div>
             {/* code for web camera */}
        <div className='cameraImage'>
         {(openCamera) ? (<>
        <Webcam videoConstraints={videoConstraints} ref={webcamRef} screenshotFormat="image/jpeg" className='setCamera'/>
        <button onClick={()=>{
          capture();
           setOpenCamera(false);
          }} className="photoCaptureButton">Capture photo</button>
        </>
        ) : ""}
         </div>
        <div className='fileButtonBox'>
            
            <label for="file-input">
            <div className='uploadFile'>
            <InsertPhotoIcon style={{marginTop:"5%", color:"blue"}} />
               <p>File/Video</p>
            </div>
        <input name='photoImage' className='inputForImage' id="file-input" type="file" multiple="true" onChange={(e)=>handleChangeForFile(e)} />
        </label>
          
       
       
         {/* for camera */}
       
         <label>
            <div onClick={()=>{ setOpenCamera(!openCamera)}} className='uploadFile'>
              <CameraAltIcon style={{marginTop:"5%", color:"blue"}} />
            <p>Camera</p>
            </div>     
        </label>
        
        </div>
        <div className='PostButtonBox'>
        <Button onClick={postDataFunction} variant="contained" className='createButtonBox' style={{fontSize:"1.5vw",  borderRadius: "1vw"}}>Post</Button>
        </div>
    </div>
</div>
</>
  )
}

