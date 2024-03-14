import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { UserContext } from "../../context/TokenContext";
import { CartContext } from "../../context/CartContext";
import Loader from "../../Component/Loader";

export default function AllOrders() {
  let [ordersData, SetorderData] = useState([]);
  let { SetUserData, UserData } = useContext(UserContext);
  let { getUserData, getUsetCart, CartOwnerId, Loading, SetLoading } =
    useContext(CartContext);
  console.log(CartOwnerId);

  useEffect(() => {
    if (UserData) {
      console.log(UserData);
      getSuerOrders(UserData.id);
    }
  }, [UserData]);

  async function getSuerOrders(id) {
    SetLoading(true)
    let req = await axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
      .catch((err) => {
        SetLoading(true);
      });

    if (req?.status == 200) {
      SetorderData(req?.data);
      console.log(req);
      SetLoading(false);
      console.log(ordersData);
    }

    console.log(req);
  }

  return (
    <>
      {Loading ? (
        <Loader />
      ) : (
        <div className="container">
          <h1 className="fw-bolder text-center pb-4">Your Orders </h1>
          <div className="row g-5">
            {ordersData.map((element, i) => {
              return element.cartItems.map((el) => {
                return (
                  <div className="col-md-3 ">
                    <div className="item action cursor-pointer bg-white border border-3 p-3">
                      <img
                        src={el.product.imageCover}
                        alt=""
                        className="w-100"
                      />
                      <p className="fw-bolder text-main">{el.product.title}</p>
                      <div>
                        {" "}
                        <span className="fw-bolder">EGP: {el.price}</span>
                        <div className="d-flex justify-content-between">
                          {" "}
                          <span className="fw-bolder text-main">
                            {" "}
                            count: {el.count}{" "}
                          </span>
                          <span className="fw-bolder">
                            {el.product.ratingsAverage}
                            <i className="fa-solid mx-1 fa-star rating-color"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              });
            })}
          </div>
        </div>
      )}
    </>
  );
}
