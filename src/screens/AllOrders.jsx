import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/AdminNavbar";

export default function AllOrder() {
  const [allOrders, setAllOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/allOrders");
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      // Reverse the order of allOrders array to display most recent order first
      const reversedData = data.map(order => {
        return {
          ...order,
          order_data: order.order_data.reverse()
        };
      });
      setAllOrders(reversedData || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);
  
  console.log(allOrders);

  return (
    <div className=" bg-white">
      <Navbar />
      <div className="container bg-white">
        <div className="row">
          {allOrders.map((order, orderIndex) => (
            <div key={orderIndex} className="col-12 col-md-6 text-black fs-4">
              {order.order_data.map((item, itemIndex) => (
                <div key={itemIndex}>
                  {item.map((arrayData, dataIndex) => {
                    // Define data variable outside JSX
                    let data = arrayData.Order_date;
                    return (
                      <div key={dataIndex}>
                        {arrayData.Order_date ? (
                          <div className="m-auto mt-5">
                            {/* Use data variable here */}
                            {data}
                            <hr />
                          </div>
                        ) : (
                          <div className="card  text-white mt-3 " style={{ width: "17rem", height: "320px" }}>
                            <img
                              src={arrayData.img}
                              className="card-img-top"
                              alt="..."
                              style={{ height: "120px", objectFit: "fill" }}
                            />
                            <div className="card-body">
                              <h5 className="card-title">
                                {arrayData.name}
                              </h5>
                              <div className="container w-100 p-0" style={{ height: "38px" }}>
                                <span className="m-1">{arrayData.qty}</span>
                                <span className="m-1">{arrayData.size}</span>
                                {/* Use data variable here */}
                                <span className="m-1">{data}</span>
                                <div className="d-inline ms-2 h-100 w-20 fs-5">
                                  Rs{arrayData.price}/-
                                </div>
                              </div>
                              <div>
                                <p className="mt-2 fs-5">
                                  Ordered by : {order.email}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
