import React, { useRef, useState } from "react";
import "./Front.css";

export default function Profile() {
  //
  const [openEdit, setOpenEdit] = useState(false);
  const [isSave, setIsSave] = useState(false);
  // const [current, setCurrent] = useState(null);
  console.log(isSave);
  let saveImg;
  let saveDis;
  const img = useRef();
  const dis = useRef();
  function save(event) {
    event.preventDefault();
    let useImg = img.current.value;
    localStorage.setItem("img", JSON.stringify(useImg));
    let useDis = dis.current.value;
    localStorage.setItem("dis", JSON.stringify(useDis));
    console.log(saveImg, saveDis);
    setIsSave((pre) => !pre);
    alert("save");
  }
  function editImg() {
    let getImg = JSON.parse(localStorage.getItem("img"));
    let getDis = JSON.parse(localStorage.getItem("dis"));
    img.current.value = getImg;
    dis.current.value = getDis;
  }

  return (
    <div>
      <div className="profile">
        <h1>Hey This is me !</h1>
        {!openEdit && (
          <button className="cancel"
            onClick={() => {
              setOpenEdit((pre) => !pre);
              setIsSave((pre) => !pre);
              editImg();
            }}
          >
            Edit
          </button>
        )}
      </div>
      {openEdit && (
        <form onSubmit={save} className="profile-form">
          <div className="img-form">
            <label>Image</label>
            <br />
            <input type="text" required ref={img} />
          </div>
          <div className="dis-form">
            <label>Description</label>
            <br />
            <input type="text" required ref={dis} />
          </div>
          <div className="btn-form">
            <button className="save">Save</button>
            <button
              onClick={() => setOpenEdit((pre) => !pre)}
              className="cancel"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {!openEdit && (
        <div className="profile-img">
          <img src={JSON.parse(localStorage.getItem("img"))} />
          <h1>{JSON.parse(localStorage.getItem("dis"))}</h1>
        </div>
      )}
    </div>
  );
}
