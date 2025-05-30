import React from 'react';
import UpdateFoodItem from './UpdateFoodItem';

export default function PopupCard({ formData, setFormData, handleUpdate }) {
  
  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/admin/foodItems/${formData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Food item updated successfully');
        alert('Food item updated successfully');
        window.location.href = '/admin';
        // You can add any additional logic here after successful update
      } else {
        console.error('Failed to update food item:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating food item:', error);
    }
  };
  return (
    <div className="modal fade"  id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Update Item</h5>
            <button type="button" className="close text-white px-2 bg-warning border-0 rounded-2" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <UpdateFoodItem formData={formData} setFormData={setFormData} />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn bg-white text-warning" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-warning text-white" onClick={handleSubmit}>Submit Update</button>
          </div>
        </div>
      </div>
    </div>
  );
}
