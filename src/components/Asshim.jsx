Ashim Karki
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const OrderSummary = ({ amt, cartId, name, products, refetch }) => {
  const navigate = useNavigate();
  const ship = 10;

  const [userInfo, setUserInfo] = useState({
    Fullname: "",
    District: "",
    Pickuppoint: "",
    PhoneNo: "",
    Email: "",
    City: "",
  });

  const p = useLocation();
  const instance = axios.create({
    withCredentials: true,
    headers: { authorization: "Bearer" },
  });
  const onCheckout = async () => {
    try {
      console.log(p.search.split("=")[1].split("&")[0]);

      const khaltiRes = await instance.post("/payment/confirm", {
        pidx: p.search.split("=")[1].split("&")[0],
      });
      const res = await instance.post("/order", {
        ...userInfo,
        totalamount: amt + ship,
        products,
      });
      const res2 = await instance.delete("/order", {
        cartid: cartId,
      });
      console.log(res2);

      console.log(res2.data);
      refetch();
      navigate("/my-ord");
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  const onPay = async () => {
    const payload = {
      return_url: "http://localhost:5173/cart",
      website_url: "http://localhost:5173",
      amount: parseInt(amt + ship) * 100,
      purchase_order_id: cartId,
      purchase_order_name: name,
      customer_info: {
        name: "Ashim Upadhaya",
        email: "example@gmail.com",
        phone: "9811496763",
      },
    };
    //http://localhost:3000/?pidx=ZvRADXjA73cXYqSufo6cS4&transaction_id=yBs7EmY2EJjp9CguST5Z4N&tidx=yBs7EmY2EJjp9CguST5Z4N&amount=20000&total_amount=20000&mobile=98XXXXX005&status=Completed&purchase_order_id=65e3166c832631c5557ca0cb&purchase_order_name=Fish%20Biryani%20Special

    try {
      const res: any = await instance.post("/payment", payload);
      console.log(res);
      window.location.href = ${res?.data?.data?.payment_url};
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form
      className="flex flex-col  mt-8"
      onSubmit={(e) => {
        e.preventDefault();
        onCheckout();
      }}
    >
      {!p.search && (
        <div>
          <h1 className="text-xl mb-8">Order Summay</h1>
          <div className="flex">
            Sub Total
            <span className="ml-auto">Nrs {amt}</span>
          </div>
          <div className="divider"></div>
          <div className="flex">
            Shipping Estimate
            <span className="ml-auto">Nrs {ship}</span>
          </div>
          <div className="divider"></div>

          <div className="flex mb-8">
            Order Total
            <span className="ml-auto">Nrs {amt + ship}</span>
          </div>
          <div className="flex justify-end">
            <button
              className="btn mb-4 btn-primary btn-sm"
              type="button"
              onClick={onPay}
            >
              Pay
            </button>
          </div>
        </div>
      )}
      <div>
        <h1 className="text-xl mb-8">Delivery Detail</h1>
        <div>
          <div>
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  value={userInfo.Fullname}
                  id="fullname"
                  name="Fullname"
                  type="text"
                  required
                  className="reg-input"
                  onChange={handleChange}
                />
              </div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="Email"
                  required
                  value={userInfo.Email}
                  type="email"
                  className="reg-input"
                  onChange={handleChange}
                />
              </div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone number
              </label>
              <div className="mt-2">
                <input
                  value={userInfo.PhoneNo}
                  id="phone"
                  name="PhoneNo"
                  type="number"
                  required
                  className="reg-input"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="district"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                District
              </label>
              <div className="mt-2">
                <input
                  value={userInfo.District}
                  required
                  id="district"
                  name="District"
                  type="text"
                  className="reg-input"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  value={userInfo.City}
                  id="city"
                  required
                  name="City"
                  type="text"
                  className="reg-input"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="pickupPoint"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Pickup Point
              </label>
              <div className="mt-2">
                <input
                  id="pickupPoint"
                  required
                  value={userInfo.Pickuppoint}
                  name="Pickuppoint"
                  type="text"
                  className="reg-input"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {p.search && (
        <button className="btn" type="submit">
          Checkout
        </button>
      )}
    </form>
  );
};

export default OrderSummary;