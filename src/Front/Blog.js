import React, { useEffect, useRef, useState } from "react";
import "./Blog.css";
import Add from "./Add";
export default function Blog() {
  const [current, setCurrent] = useState(null);
  const title = useRef();
  const img = useRef();
  const dis = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  //
  const [cartElements, setCartElements] = useState([]);
  useEffect(() => {
    fetch(`https://my-task-a9891-default-rtdb.firebaseio.com/blog.json`).then(
      (res) => {
        if (res.ok) {
          res.json().then((data) => {
            let arr = [];
            {
              for (let keys in data) {
                let obj = {
                  ...data[keys],
                  id: keys,
                };
                arr.push(obj);
              }
              setCartElements((pre) => [...arr]);
            }
          });
        } else {
          res.json().then((data) => console.log(data));
        }
      }
    );
  }, []);
  function deletePost(id) {
    fetch(`https://my-task-a9891-default-rtdb.firebaseio.com/blog/${id}.json`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        alert("Post successfuly deleted 💸");
      } else {
        res.json().then((data) => alert(data.error.message));
      }
    });
  }
  return (
    <div>
      <h1>blog</h1>
      <div className="btn-form">
      <button onClick={() => setIsOpen(true)} className="cancel">Post</button>
      </div>
      <Add open={isOpen} close={() => setIsOpen(false)} />
      {cartElements.map((item) => {
        console.log(item);
        if (!edit) {
          return (
            <div>
              <img src={item.img} />
              <h1>{item.title}</h1>
              <div className="btn-form">
              <button
                onClick={() => {
                  setEdit((pre) => !pre);
                  setCurrent(item.id);
                }}
                className="cancel"
              >
                Edit
              </button>
              </div>
            </div>
          );
        }
        if (edit) {
          if (item.id == current) {
            return (
              <form className="profile-form">
                <div className="dis-form">
                  <label>Title</label>
                  <input type="text" required ref={title} />
                </div>
                <div className="img-form">
                  <label>Image</label>
                  <input type="text" required ref={img} />
                </div>
                <div className="dis-form">
                  <label>Description</label>
                  <input type="text" required ref={dis} />
                </div>
                <div className="btn-form">
                  <button className="save">Save</button>
                  <button onClick={() => setCurrent(null)} className="cancel">
                    Cancel
                  </button>
                  <button
                    onClick={() => deletePost(item.id)}
                    className="delete"
                  >
                    Delete
                  </button>
                </div>
              </form>
            );
          } else {
            return (
              <div>
                <img src={item.img} />
                <h1>{item.title}</h1>
                <button
                  onClick={() => {
                    setEdit((pre) => !pre);
                  }}
                >
                  Edit
                </button>
              </div>
            );
          }
        }
      })}
    </div>
  );
}
