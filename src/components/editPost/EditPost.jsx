import React, { useEffect } from "react";
import "./editPost.css";
import { useState, useCallback } from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Button from "@mui/material/Button";
import Webcam from "react-webcam";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";

export const EditPost = ({ item }) => {
  const [postText, setPostText] = useState("");
  const [postphoto, setPostPhoto] = useState([]);
  const [openCamera, setOpenCamera] = useState(false);
  const [captureImage, setCaptureImage] = useState("");
  const [allImage, setAllImage] = useState([]);
  const [handleDeleteImage, setHandleDeleteImage] = useState([]);
  const [heart, setHeart] = useState([]);
  const [smile, setSmile] = useState([]);
  const [like, setLike] = useState([]);
  let navigate = useNavigate();
  const editdataItem = JSON.parse(sessionStorage.getItem("oneItemForEdit"));
  useEffect(() => {
    setHandleDeleteImage(editdataItem.imageData);
  }, []);
  const webcamRef = React.useRef(null);
  var dataCollection = collection(db, "posts");

  const handleChangeForFile = (e) => {
    const filesArray = e.target.files[0];
    setPostPhoto([...postphoto, filesArray]);
  };

  const videoConstraints = {
    facingMode: "user",
  };
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPostPhoto([...postphoto, imageSrc]);
  }, [webcamRef]);

  const deleteEditImage = (imageItem, imageIndex) => {
    // console.log("hello");
    handleDeleteImage.splice(imageIndex, 1);
    setHandleDeleteImage([...handleDeleteImage]);
   
  };
  // console.log("editData",editdataItem.id)

  // function for update post
  async function postEditedDataFunction() {
    let confirm = window.confirm("Are you sure, you want to edit this post?");
    if (confirm) {
      var path = doc(dataCollection, editdataItem.id);
      var usersData = JSON.parse(localStorage.getItem("userDetails"));
      var editedDataObject = {
        name: usersData.name,
        email: usersData.email,
        profilePic: usersData.profilePic,
        uid: usersData.uid,
        postText: postText || editdataItem.postText,
        imageData: postphoto || handleDeleteImage,
        time: Date.now(),
        heart: heart || editdataItem.heart,
        smile: smile || editdataItem.smile,
        like:like || editdataItem.like,
        tags:postText.match(/#\w+/g),
      };
      await updateDoc(path, editedDataObject);
      setPostText("");
      setPostPhoto("");
      setCaptureImage("");
      alert("Edited sucessfully");
      //  console.log(editedDataObject)
    }
  }

  // function for delete post
  async function handleDeleteFunctionInEditpage() {
    let confirm = window.confirm("Are you sure, you want to delete this post?");
    if (confirm) {
      var path = doc(dataCollection, editdataItem.id);
      await deleteDoc(path);
      alert("Deleted sucessfully");
      navigate("/posts");
      // window.location.reload();
    }
  }


  return (
    <>
      <div className="editContainer">
        <div className="editContain1">
          <div className="editTextBox">
            <p
              style={{
                marginLeft: "7%",
                color: "blue",
                fontSize: "2.5vw",
                fontWeight: "800",
              }}
            >
              Edit Post
            </p>
            <span
              style={{
                marginRight: "7%",
                color: "blue",
                fontSize: "2.5vw",
                fontWeight: "800",
                cursor: "pointer",
              }}
            >
              <p
                onClick={() => {
                  navigate("/posts");
                }}
              >
                X
              </p>
            </span>
          </div>
          <div className="editWriteYourTextBox">
            <input
              name="textData"
              className="editwriteYourText"
              type="text"
              defaultValue={editdataItem.postText}
              placeholder="What's in your mind?"
              onChange={(e) => setPostText(e.target.value)}
            />
          </div>

          <div className="editImageBox">
            {handleDeleteImage.map((imageItem, imageIndex) => {
              return (
                <div key={imageIndex} className="editpostedImageBox">
                  <div className="imageAndTextforEdit">
                    <img className="editImage" src={imageItem} alt="" />
                    <p
                      style={{
                        fontSize: "1.7vw",
                        fontWeight: "bold",
                        color: "gray",
                      }}
                    >
                      Media {imageIndex + 1}
                    </p>
                  </div>
                  <span
                    style={{
                      marginRight: "7%",
                      color: "blue",
                      fontSize: "2.5vw",
                      cursor: "pointer",
                    }}
                  >
                    <p
                      onClick={() => {
                        deleteEditImage(imageItem, imageIndex);
                      }}
                    >
                      X
                    </p>
                  </span>
                </div>
              );
            })}
          </div>
             {/* code for camera */}
      <div className="editCameraImage">
        {openCamera ? (
          <>
            <Webcam
              videoConstraints={videoConstraints}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="editSetCamera"
            />
            <button
              onClick={() => {
                capture();
                setOpenCamera(false);
              }}
            >
              Capture photo
            </button>
          </>
        ) : (
          ""
        )}
      </div>
          <div className="editfileButtonBox">
            <label for="file-input">
              <div className="edituploadFile">
                <InsertPhotoIcon style={{ marginTop: "5%", color: "blue" }} />
                <p>File/Video</p>
              </div>
              <input
                name="photoImage"
                className="editinputForImage"
                id="file-input"
                type="file"
                multiple="true"
                onChange={(e) => handleChangeForFile(e)}
              />
            </label>

            {/* for camera */}

            <label>
              <div
                onClick={() => {
                  setOpenCamera(!openCamera);
                }}
                className="edituploadFile"
              >
                <CameraAltIcon style={{ marginTop: "5%", color: "blue" }} />
                <p>Camera</p>
              </div>
            </label>
          </div>
          <div className="editPostButtonBox">
            <Button
              onClick={handleDeleteFunctionInEditpage}
              variant="contained"
              className="editButtonBox"
              style={{
                fontSize: "1.5vw",
                borderRadius: "1vw",
                backgroundColor: "white",
                color: "red",
                border: "2px solid red",
              }}
            >
              Delete
            </Button>
            <Button
              onClick={postEditedDataFunction}
              variant="contained"
              className="editButtonBox"
              style={{ fontSize: "1.5vw", borderRadius: "1vw" }}
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
