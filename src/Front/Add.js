import React, { useRef } from "react";
import "./Add.css";

export default function Add(props) {
  const title = useRef();
  const img = useRef();
  const dis = useRef();
  //
  function saveData(event) {
    event.preventDefault();
    let blogImg = img.current.value;
    let blogTitle = title.current.value;
    let blogDis = dis.current.value;

    fetch(`https://my-task-a9891-default-rtdb.firebaseio.com/blog.json`, {
      method: "POST",
      body: JSON.stringify({
        img: blogImg,
        title: blogTitle,
        blogDis: blogDis,
      }),
    }).then((res) => {
      if (res.ok) {
        alert("ok");
        props.close();
      } else {
        res.json().then((data) => alert(data.error.message));
      }
    });
  }

  if (!props.open) return;

  return (
    <div style={OVERLAY}>
      <div style={STYLE}>
        <form onSubmit={saveData} className="profile-form">
          <h1>New post</h1>
          <br />
          <div className="dis-form">
            <label>Title</label>
            <br />
            <input type="text" required ref={title} />
            <br />
          </div>
          <div className="img-form">
            <label>Image</label>
            <br />
            <input type="text" required ref={img} />
            <br />
          </div>
          <div className="dis-form">
            <label>Description</label>
            <br />
            <input type="text" required ref={dis} />
            <br />
          </div>
          <div className="btn-form">
            <button className="save">save</button>
            <button onClick={props.close} className="cancel">cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
const STYLE = {
  position: "fixed",
  left: "22% ",
  top: "10% ",
  zIndex: 1000,
  padding: "50px",
  backgroundColor: "#fff",
};

const OVERLAY = {
  position: "fixed",
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  backgroundColor: "rgba(0,0,0,0.3)",
};
