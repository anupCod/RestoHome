import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  const data = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const priceRef = useRef();
  const options = props.options;
  const priceOptions = Object.keys(options);
  const foodItem = props.item;
  const dispatch = useDispatchCart();

  const handleClick = () => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  };

  const handleQty = (e) => {
    setQty(e.target.value);
  };

  const handleOptions = (e) => {
    setSize(e.target.value);
  };
  const handleAddToCart = async () => {
    if (!localStorage.getItem('token')) {
      // Store item info in local storage
      const itemInfo = { id: foodItem._id, qty, size, name: foodItem.name, price: options[size] };
      localStorage.setItem('cartItem', JSON.stringify(itemInfo));
      console.log('Item stored in local storage:', itemInfo);
      navigate('/login');
      return;
    }
  
    let finalPrice = qty * parseInt(options[size]);
    await dispatch({ type: 'ADD', id: foodItem._id, name: foodItem.name, price: finalPrice, qty, size });
  
    // Remove stored item info from local storage
    // localStorage.removeItem('cartItem');
  };
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  useEffect(() => {
    // Retrieve stored item info from local storage
    const storedItem = localStorage.getItem('cartItem');
    if (storedItem) {
      const { qty: storedQty, size: storedSize } = JSON.parse(storedItem);
      setQty(storedQty);
      setSize(storedSize);
    }
  }, []);

  return (
    <div>
      <div className="card mb-5" style={{ width: '16rem', maxHeight: '360px' }}>
        <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: '120px', objectFit: 'fill' }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          <div className="containerw-100 p-0" style={{ height: '50px' }}>
            <select className="m-2 h-100 w-20 bg-white text-black rounded" onClick={handleClick} onChange={handleQty}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select className="m-2 h-100 w-20 bg-white text-black rounded" ref={priceRef} onClick={handleClick} onChange={handleOptions}>
              {priceOptions.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
            <div className="d-inline ms-2 h-100 w-20 fs-5">
              Rs{qty * parseInt(options[size])}/-
            </div>
          </div>
          <hr />
          <button className="btn btn-warning justify-center ms-2" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
