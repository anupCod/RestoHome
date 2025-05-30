import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Display(props) {
  let data = useCart();
  let navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;
  const dispatch = useDispatchCart();

  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  };

  const handleQty = (e) => {
    setQty(e.target.value);
  };

  const handleOptions = (e) => {
    setSize(e.target.value);
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div >
      <div className="card mt-3 " style={{ width: "16rem", height: "300px" }}>
        <img
          src={props.ImgSrc}
          className="card-img-top"
          alt="..."
          style={{ height: "120px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          <div className="container w-100 p-0" style={{ height: "38px" }}>
            <select
              className="m-2 h-100 w-20 bg-secondary text-white rounded"
              style={{ select: "#FF0000" }}
              onClick={handleClick}
              onChange={handleQty}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 w-20 bg-secondary text-white rounded"
              style={{ select: "#FF0000" }}
              ref={priceRef}
              onClick={handleClick}
              onChange={handleOptions}
            >
              {priceOptions.map((i) => {
                return (
                  <option key={i} value={i}>
                    {i}
                  </option>
                );
              })}
            </select>
            <div className=" d-inline ms-2 h-100 w-20 fs-5">
              {qty * parseInt(options[size])}/-
            </div>
             <div className="mt-3">
             <button
                    type="button btn "
                    data-toggle="modal"
                    data-target="#exampleModal"
                    className="bg-warning text-white btn-sm px-2 py-1 border-0 me-3"
                    onClick={props.handleUpdate} // Pass the item ID to handleUpdate
                  >
                    Update
                  </button>

                  <button
                    className="bg-white text-warning btn-sm px-2 py-1 border-0"
                    onClick={props.handleDelete}
                  >
                    Delete
                  </button>
              </div> 
   
          </div>
        </div>
      </div>
    </div>
  );
}