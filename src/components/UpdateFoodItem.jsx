import React from "react";

const UpdateFoodItem = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeOptions = (e) => {
    const { name, value } = e.target;
    try {
      const optionsArray = JSON.parse(value);
      setFormData({ ...formData, [name]: optionsArray });
    } catch (error) {
      console.error("Error parsing options JSON:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/admin/foodItems",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const newFoodItem = await response.json();
        console.log("New food item added:", newFoodItem);
        setFormData({
          CategoryName: "",
          name: "",
          img: "",
          options: [],
          description: "",
        });
      } else {
        console.error("Failed to add new food item:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding new food item:", error);
    }
  };

  return (
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
      <div className="container d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
        <form onSubmit={handleSubmit} className="w-100 p-4 bg-dark rounded">
          <div className="mb-3">
            <label htmlFor="categoryName" className="form-label text-light">Category Name:</label>
            <input
              type="text"
              id="categoryName"
              name="CategoryName"
              value={formData.CategoryName}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-light">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="img" className="form-label text-light">Image URL:</label>
            <input
              type="text"
              id="img"
              name="img"
              value={formData.img}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="options" className="form-label text-light">Options:</label>
            <textarea
              id="options"
              name="options"
              value={JSON.stringify(formData.options, null, 2)}
              onChange={handleChangeOptions}
              className="form-control"
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label text-light">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
              required
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateFoodItem;
