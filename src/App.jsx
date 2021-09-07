import React from "react";
import { Link } from "react";
import { useState } from "react";
import classes from "./App.module.css";
import Card from "./components/Card";
import storage from "./firebase";
function App() {
  const [image, setImage] = useState([]);
  const [Url, setUrl] = useState("");
  const [hoverStyle, setHoverStyle] = useState("");
  let image1 = "";
  const dragOver = (e) => {
    e.preventDefault();
    setHoverStyle(classes.hoverStyle);
  };

  const dragEnter = (e) => {
    e.preventDefault();
    setHoverStyle(classes.hoverStyle);
  };

  const dragLeave = (e) => {
    e.preventDefault();
    setHoverStyle("");
  };

  const fileDrop = (e) => {
    e.preventDefault();
    setHoverStyle("");
    const files = e.dataTransfer.files;
    image1 = files[0];
    upload();
    console.log(files);
  };

  const upload = () => {
    if (
      image1 == null ||
      (image1.type != "image/png" &&
        image1.type != "image/jpeg" &&
        image1.type != "image/jpg")
    ) {
      image1 = "";
      return;
    }
    setUrl("Getting Download Link...");

    // Sending File to Firebase Storage
    console.log(image1);
    storage
      .ref(`/images/${image1.name}`)
      .put(image1)
      .on("state_changed", alert("success"), alert, () => {
        // Getting Download Link
        storage
          .ref("images")
          .child(image1.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
      });
  };
  return (
    <div className="background h-screen w-screen flex flex-col justify-center items-center">
      <Card>
        <h3 className="mb-5">Upload your image</h3>
        <p className="mb-5">File should be jpeg, png..</p>
        <div
          className={
            "fileUploadDrop flex flex-col max-w-sm border-2 border-dotted justify-center items-center bg-gray-200 ml-5 mr-5 mb-5 " +
            hoverStyle
          }
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}
        >
          {!Url ? (
            <img src="https://www.mbs-plugins.com/images/drop-files-here-extra.jpg" />
          ) : (
            <img src={Url} />
          )}
        </div>
        <p className="mb-5">Or</p>
        <button className="p-3 bg-blue-300 border-0 border-solid rounded-lg">
          Choose a file
        </button>
        {Url ? (
          <span>
            Here is your{" "}
            <button
              className="text-blue-300"
              onClick={() => {
                window.location.href = Url;
              }}
            >
              url
            </button>
          </span>
        ) : (
          ""
        )}
      </Card>
    </div>
  );
}

export default App;
