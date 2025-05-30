
import React , { useEffect, useState }  from "react";
import Delete from "@mui/icons-material/Delete";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate,useLocation } from 'react-router-dom';



export default function Cart() {
  const p=useLocation();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);


  const data = useCart();
  const dispatch = useDispatchCart();
  const fetchClientToken = async () => {
    try {
      console.log("Fetching client token...");
      const response = await axios.get(
        "http://localhost:5000/api/auth/braintree/token"
      );
      console.log("Received client token:", response.data.clientToken);
      setClientToken(response.data.clientToken);
    } catch (error) {
      console.error("Error fetching Braintree token:", error);
      toast.error("Failed to get payment token");
    }
  };

  useEffect(() => {
    fetchClientToken();
  }, []);

  useEffect(() => {
    const storedItem = localStorage.getItem("cartItem");
    if (storedItem) {
      const { id, name, price, qty, size } = JSON.parse(storedItem);
      dispatch({ type: "ADD", id, name, price, qty, size });
      localStorage.removeItem("cartItem");
    }
  }, [dispatch]);

  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem("userEmail");
    try {
      const response = await fetch("http://localhost:5000/api/auth/orderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to checkout - " + response.statusText);
      }

      dispatch({ type: "DROP" });
    } catch (error) {
      console.error("Error:", error);
    }
  };
// on checkout 
// const onCheckout = async () => {
//   try {
//     const params = new URLSearchParams(window.location.search);
//     const pidx = params.get('pidx');
//     const transactionId = params.get('transaction_id');
//     const purchaseOrderId = params.get('purchase_order_id');
//     const purchaseOrderName = params.get('purchase_order_name');
//     const amount = parseFloat(params.get('total_amount'));

//     const res = await axios.post("http://localhost:5000/api/auth/orderData", {
//       pidx,
//       transactionId,
//       purchaseOrderId,
//       purchaseOrderName,
//       amount,
//     // Assuming userInfo is defined elsewhere
//       totalamount: amount, // Update this if needed
//   // Assuming products is defined elsewhere
//     });

//     console.log("Order created:", res.data);
    
//     // Handle navigation or other actions after successful order creation
//     // For example, redirect to the order page
//     navigate("/myorder");
//   } catch (err) {
//     console.error("Error creating order:", err);
//     // Handle error, show message to user, etc.
//   }
// };
//
  const totalPrice = data.reduce((total, food) => total + parseFloat(food.price), 0);

  const purchase_order_name = data.map(item => item.name).join(", ");
  
  // Concatenate all the IDs of ordered items
  const purchase_order_id = data.map(item => item.id).join(", ");

  const handlePayment = async () => {
    const payload = {
      return_url: "http://localhost:3000",
      website_url: "http://localhost:3000",
      amount: parseInt(totalPrice ) * 100,
      purchase_order_id: purchase_order_id,
      purchase_order_name: purchase_order_name,
      customer_info: {
        name: "Ashim Upadhaya",
        email: "example@gmail.com",
        phone: "9811496763",
      },
    };
    console.log("anu");
    try {
      const res= await axios.post("http://localhost:5000/api/auth/khalti-api", payload);
      console.log(res);
      window.location.href = `${res?.data?.data?.payment_url}&redirectScript=true`;
      // const urlParams = new URLSearchParams(window.location.search);
     

      // If the query parameter is present and true, call the onCheckout function
   

    } catch (err) {
      console.log(err);
    }
  };
  //
  const paymentCheckAndOrder=async()=>{
    const userEmail = localStorage.getItem("userEmail");
    try{
          const res=await axios.post("http://localhost:5000/api/auth/payment/confirm",{
              pidx: p.search.split("=")[1].split("&")[0],
          })
          const response = await fetch("http://localhost:5000/api/auth/orderData", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              order_data: data,
              email: userEmail,
              order_date: new Date().toDateString(),
            }),
          });
          console.log("response",response,res);
      }catch(err){
          console.log(err);
      }
     
      navigate("/",{
          replace:true,
      });
}

useEffect(() => {
  console.log(p.search)
  if(p?.search){
paymentCheckAndOrder();
  }
}, [p.search]);
  return (
    <div>
      <div className="container m-auto mt-5">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button
                    type="button"
                    className="btn p-0"
                    onClick={() => {
                      dispatch({ type: "REMOVE", index: index });
                    }}
                  >
                    <DeleteIcon />
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
            {!clientToken || !data?.length ? (
              ""
            ) : (
              <div className="dropin-container">
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: {
                      flow: "vault",
                    },
                  }}
                  onInstance={(instance) => {
                    console.log("Setting instance:", instance);
                    setInstance(instance);
                  }}
                  style={{ width: "10rem" }}
                />
                <button
                  className="btn btn-success"
                  onClick={handlePayment}
                  disabled={loading || !instance}
                >
                  {/* {loading ? "Processing ..." : "Make Payment"} */}
                  Checkout
                </button>
              </div>
            )}
          </div>
      </div>
      <button
                  className="btn btn-success mx-5"
                  onClick={handlePayment}
              
                >
                  {/* {loading ? "Processing ..." : "Make Payment"} */}
                  Pay through Khalti
                </button>
                <button
                  className="btn btn-success mx-2"
                  onClick={handleCheckOut}
              
                >
                  {/* {loading ? "Processing ..." : "Make Payment"} */}
                   Cash on Delivery
                </button>
    </div>
    
  );
}



// import React , { useEffect, useState }  from "react";
// import Delete from "@mui/icons-material/Delete";
// import { useCart, useDispatchCart } from "../components/ContextReducer";
// import DropIn from "braintree-web-drop-in-react";
// import axios from "axios";
// import toast from "react-hot-toast";

// /* import { useNavigate } from "react-router-dom"; */

// export default function Cart() {
//   const [clientToken, setClientToken] = useState("");
//   const [instance, setInstance] = useState("");
//   const [loading, setLoading] = useState(false);
//   /* const navigate = useNavigate(); */
//   let dispatch = useDispatchCart();
//   let data = useCart();

//   const fetchClientToken = async () => {
//     try {
//       console.log("Fetching client token...");
//       const response = await axios.get(
//         "http://localhost:5000/api/auth/braintree/token"
//       );
//       console.log("Received client token:", response.data.clientToken);
//       setClientToken(response.data.clientToken);
//     } catch (error) {
//       console.error("Error fetching Braintree token:", error);
//       toast.error("Failed to get payment token");
//     }
//   };

//   useEffect(() => {
//     fetchClientToken();
//   }, []);

//   let totalPrice = data.reduce((total, item) => total + item.price, 0);

//   const handlePayment = async () => {
//     try {
//       setLoading(true);
//       const { nonce } = await instance.requestPaymentMethod();
//       const { response } = await axios.post("api/auth/braintree/payment", {
//         nonce,
//         data,
//         amount: totalPrice,
//       });
//       setLoading(false);
//       toast.success("Payment Completed Successfully ");
//       localStorage.removeItem("data");
//       /* setCart([]); */
//       dispatch({ type: "DROP" });
//       /* navigate("/dashboard/user/order"); */
//     } catch (error) {
//       console.log("Payment error: ", error);
//       setLoading(false);
//       toast.error("Payment Failed");
//     }
//   };

//   /* useEffect(() => {
//     console.log("Instance:", instance);
//   }, [instance]);  */

//   if (data.length === 0) {
//     return (
//       <div>
//         <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
//       </div>
//     );
//   }
//   return (
//     <div>
//       {console.log(data)}
//       <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
//         <table className="table table-hover ">
//           <thead className=" text-success fs-4">
//             <tr>
//               <th scope="col">#</th>
//               <th scope="col">Name</th>
//               <th scope="col">Quantity</th>
//               <th scope="col">Option</th>
//               <th scope="col">Amount</th>
//               <th scope="col"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((food, index) => (
//               <tr key={index}>
//                 <th scope="row">{index + 1}</th>
//                 <td>{food.name}</td>
//                 <td>{food.qty}</td>
//                 <td>{food.size}</td>
//                 <td>{food.price}</td>
//                 <td>
//                   <button type="button" className="btn p-0">
//                     <Delete
//                       onClick={() => {
//                         dispatch({ type: "REMOVE", index: index });
//                       }}
//                     />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div>
//           <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
//         </div>
//         <div>
//           <div>
//             {!clientToken || !data?.length ? (
//               ""
//             ) : (
//               <div className="dropin-container">
//                 <DropIn
//                   options={{
//                     authorization: clientToken,
//                     paypal: {
//                       flow: "vault",
//                     },
//                   }}
//                   onInstance={(instance) => {
//                     console.log("Setting instance:", instance);
//                     setInstance(instance);
//                   }}
//                   style={{ width: "10rem" }}
//                 />
//                 <button
//                   className="btn btn-success"
//                   onClick={handlePayment}
//                   disabled={loading || !instance}
//                 >
//                   {loading ? "Processing ..." : "Make Payment"}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

