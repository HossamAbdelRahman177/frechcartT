import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/TokenContext";
import { Toaster } from "react-hot-toast";

export default function Cart() {
  let {
    getUserData,
    Loading,
    CartData,
    RemoveItem,
    ClearAllPrudects,
    UpdateCount,
  } = useContext(CartContext);
  const { UserData } = useContext(UserContext);
  useEffect(() => {
    if (UserData) {
      getUserData(UserData.token);
    }
  }, []);
  return (
    <>
      <Toaster position="top=right" />
      {Loading ? (
        <div className=" loading d-flex justify-content-center align-items-center bg-white position-fixed top-0 end-0 start-0 bottom-0">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          {CartData == null ? (
            <h1 className="fw-bolder text-center"> YOUR CART EMPTY</h1>
          ) : (
            <div className="container ">
              {CartData.totalCartPrice == 0 ? (
                ""
              ) : (
                <button
                  onClick={ClearAllPrudects}
                  className="btn btn-danger fw-bold d-block mb-3 ms-auto"
                >
                  Clear Cart <i className="fa-solid fa-trash"></i>{" "}
                </button>
              )}
              {CartData.products.map((el) => {
                return (
                  <div
                    key={el.id}
                    className="row mb-3 p-2 align-items-center border-bottom border-3  "
                  >
                    <div key={el.id} className="col-md-10">
                      <div className="row align-items-center">
                        <div className="col-md-1">
                          <img
                            src={el.product.imageCover}
                            alt=""
                            className="w-100"
                          />
                        </div>
                        <div key={el.id} className="col-md-11">
                          <h6 className="fw-bolder text-main Margin">
                            {el.product.title}
                          </h6>
                          <h5 className="text-muted fw-bolder">
                            {" "}
                            {el.price}EPG{" "}
                          </h5>
                          <div className="buttonMediaQuery">
                            <button
                              onClick={() => RemoveItem(el.product._id)}
                              className="btn btn-danger"
                            >
                              Remove <i className="fa-solid fa-trash"></i>{" "}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div key={el.id} className="col-md-2 ">
                      <div className="mediaQuery">
                        <span
                          className="btn btn-success btn-sm icon-count"
                          onClick={() =>
                            UpdateCount(el.product._id, (el.count += 1))
                          }
                        >
                          <i className="fa-solid fa-plus  text-white "></i>
                        </span>
                        <span className="mx-2"> {el.count} </span>
                        <span
                          className="btn btn-danger btn-sm  icon-count"
                          onClick={() =>
                            UpdateCount(el.product._id, (el.count -= 1))
                          }
                        >
                          <i className="fa-solid fa-minus  text-white "></i>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              {CartData.totalCartPrice == 0 ? (
                <h1 className="fw-bolder"> Your Cart Empty</h1>
              ) : (
                <h4 className="fw-bolder">
                  Toatal Price: {CartData.totalCartPrice}{" "}
                </h4>
              )}
              {CartData.totalCartPrice == 0 ? (
                ""
              ) : (
                <Link
                  className="btn bg-main text-white fw-bolder"
                  to={"/CheckOut/" + CartData._id}
                >
                  Check Out Payment ??
                </Link>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
