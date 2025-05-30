// UpdateFoodItemModal.js
import React, { useState, useEffect } from "react";

const UpdateFoodItemModal = ({ foodItem, onUpdate }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [img, setImg] = useState("");
  const [options, setOptions] = useState("");

  useEffect(() => {
    if (foodItem) {
      setName(foodItem.name);
      setCategory(foodItem.category);
      setImg(foodItem.img);
      setOptions(foodItem.options);
    }
  }, [foodItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedItem = {
      ...foodItem,
      name,
      category,
      img,
      options,
    };
    onUpdate(updatedItem);
  };

  return (
    <div className="modal fade" id="updateFoodItemModal" tabIndex="-1" role="dialog" aria-labelledby="updateFoodItemModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="updateFoodItemModalLabel">Update Food Item</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <input type="text" className="form-control" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="img">Image URL:</label>
                <input type="text" className="form-control" id="img" value={img} onChange={(e) => setImg(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="options">Options:</label>
                <input type="text" className="form-control" id="options" value={options} onChange={(e) => setOptions(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primary">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateFoodItemModal;
