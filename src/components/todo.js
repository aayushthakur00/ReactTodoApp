import React, { useState, useEffect } from "react";
import logo from "../images/logo.svg";
import "../App.css";

const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  console.log(list);
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};
const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [Items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);
  const addItem = () => {
    if (!inputData) {
      alert("Please fill the data");
    } else if (inputData && !toggleSubmit) {
      setItems(
        Items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setInputData("");
      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...Items, allInputData]);
      setInputData("");
    }
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(Items));
  }, [Items]);

  const deleteItem = (index) => {
    // console.log(index);
    const updatedItems = Items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updatedItems);
  };

  const removeAll = () => {
    setItems([]);
  };

  const editItem = (id) => {
    let newEditItem = Items.find((elem) => {
      return elem.id === id;
    });
    console.log(newEditItem);
    setToggleSubmit(false);
    setInputData(newEditItem.name);
    setIsEditItem(id);
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={logo} alt="todologo"></img>
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="Add Items..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            ></input>
            {toggleSubmit ? (
              <i
                className="fa fa-plus add-btn"
                title="Add Item"
                onClick={addItem}
              ></i>
            ) : (
              <i
                className="far fa-edit add-btn"
                title="Edit Item"
                onClick={addItem}
              ></i>
            )}
            {/* <i
              className="fa fa-plus add-btn"
              title="Add Item"
              onClick={addItem}
            ></i> */}
          </div>
          <div className="showItems">
            {Items.map((ele) => {
              return (
                <div className="eachItem" key={ele.id}>
                  <h3>{ele.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      title="Edit Item"
                      onClick={() => editItem(ele.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      title="Delete Item"
                      onClick={() => deleteItem(ele.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
