import React, { useEffect, useState } from "react";
import Display from "../components/Display";
import Footer from "../components/Footer";
import Navbar from "../components/AdminNavbar";
import AddFoodItemForm from "../components/AddMenu";
import PopupCard from "../components/PopupCard";

export default function Admin() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [formData, setFormData] = useState({
    CategoryName: "",
    name: "",
    img: "",
    options: [],
    description: "",
  });
  const [selectedItemId, setSelectedItemId] = useState(null);

  const loadFoodItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/getdata");
      const data = await response.json();
      setFoodItems(data[0]);
      setFoodCat(data[1]);
    } catch (error) {
      console.error("Error loading food items:", error);
    }
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

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

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/admin/foodItems/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch item data");
      }
      const itemData = await response.json();
      // Pass itemData to PopupCard component
      setFormData(itemData);
    } catch (error) {
      console.error("Error fetching item data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this item?"
      );
      if (!confirmDelete) return;

      const response = await fetch(
        `http://localhost:5000/api/auth/admin/foodItems/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const updatedFoodItems = foodItems.filter((item) => item._id !== id);
        setFoodItems(updatedFoodItems);
      } else {
        console.error("Failed to delete food item:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting food item:", error);
    }
  };

  return (
    <div className="bg-white">
      <Navbar />
      <div className="container">
        <PopupCard
          formData={formData}
          setFormData={setFormData}
          handleUpdate={handleUpdate}
        />
        {foodCat.map((category) => (
          <div className="row mb-3" key={category.id}>
            <div className="fs-3 m-3 text-black">{category.CategoryName}</div>
            <hr
              id="hr-success"
              style={{
                height: "4px",
                backgroundImage:
                  "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))",
              }}
            />
            {foodItems
              .filter((item) => item.CategoryName === category.CategoryName)
              .map((filteredItem) => (
                <div
                  key={filteredItem._id}
                  className="col-12 col-md-6 col-lg-3"
                >
                  <Display
                    foodName={filteredItem.name}
                    item={filteredItem}
                    options={filteredItem.options[0]}
                    ImgSrc={filteredItem.img}
                     handleUpdate={() => handleUpdate(filteredItem._id)}
                     handleDelete={() => handleDelete(filteredItem._id)}
                  />


                </div>
              ))}
          </div>
        ))}
      </div>
      <div>
        <AddFoodItemForm
          formData={formData}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          onSubmit={handleSubmit}
        />
      </div>
      <Footer />
    </div>
  );
}
