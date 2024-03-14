import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import CategroySlider from "../../Component/CategroySlider/CategroySlider";
import MainSlider from "../../Component/MainSlider/MainSlider";

import Swal from "sweetalert2";
import { CartContext } from "../../context/CartContext";
import { WishListContext } from "../../context/Wishlist";
import Loader from "../../Component/Loader";
import { UserContext } from "../../context/TokenContext";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  let [spinnerButton, SetSpinnerButton] = useState(true);
  let { UserData } = useContext(UserContext);
  let { addCart, SetNumitem,  } = useContext(CartContext);
  let { postWishListProudect, whislist, setWhishlist, DeletItemWhishList } =
    useContext(WishListContext);
  let [page, setPage] = useState(1);
  function GetAllProudect(queryData) {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${page}`
    );
  }
  let { isLoading, data } = useQuery(["ProudectApi", page], GetAllProudect);
  let proudectList = data?.data?.data;
  function getpages(event) {
    let page = event.target.getAttribute("pagenum");
    setPage(page);
  }

  async function AddToCart(id) {
    SetSpinnerButton(false);
    let req = await addCart(id).catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    });
    if (req?.data?.status == "success") {
      SetSpinnerButton(true);
      SetNumitem(req?.data?.numOfCartItems);
      Swal.fire({
        title: "Good job!",
        text: req.data.message,
        icon: "success",
      });
    }
  }

  async function WishList(product) {
    let found = whislist.find((item) => item.id == product.id);
    console.log(found);
    if (found) {
      let req = await DeletItemWhishList(product.id);
      if (req?.data.status == "success") {
        toast.success(req.data.message);
        let NewWhishList = req.data.data;
        setWhishlist((WhishList) =>
          WhishList.filter((item) => NewWhishList.includes(item.id))
        );
      }
    } else {
      let req = await postWishListProudect(product.id);
      toast.success(req.data.message);
      setWhishlist((items) => [...items, product]);
      console.log(req);
    }
  }

  return (
    <>
      <MainSlider />
      <CategroySlider />

      {isLoading == true ? (
        <Loader />
      ) : (
        <div className="py-5">
          <Toaster position="top-right" />
          <div className="container">
            <div className="row g-5 ">
              {isLoading ? "" : ""}
              {proudectList.map((el) => {
                return (
                  <div key={el._id} className="col-md-2  cursor-pointer px-2">
                    <div className="product position-relative">
                      <Link to={"/ProudectDeitals/" + el._id}>
                        <img src={el.imageCover} alt="" className="w-100" />
                        <h6 className="text-main fw-bolder pt-2 ms-1">
                          {" "}
                          {el.category.name}{" "}
                        </h6>
                        <h6 className="fw-bolder ms-1">
                          {" "}
                          {el.title.split(" ").slice(0, 2).join(" ")}{" "}
                        </h6>
                        <div className="d-flex justify-content-between py-2">
                          <span className="fw-bolder ms-1">{el.price}EGP</span>
                          <span className="fw-bolder">
                            <i className="fa-solid fa-star rating-color "></i>{" "}
                            {el.ratingsAverage}{" "}
                          </span>
                        </div>
                      </Link>
                      <div
                        onClick={() => WishList(el)}
                        className="layer cursor-pointer my-1 d-flex justify-content-end"
                      >
                        {whislist.find((item) => {
                          return item.id == el.id;
                        }) ? (
                          <i className="fa-solid cursor-pointer text-danger fa-heart fs-4  d-block"></i>
                        ) : (
                          <i className="fa-regular fa-heart cursor-pointer text-danger fa-heart fs-4  d-block "></i>
                        )}
                      </div>
                      {spinnerButton ? (
                        <div className="p-1">
                          {" "}
                          <button
                            onClick={() => AddToCart(el.id)}
                            className="btn bg-main text-white d-block w-100"
                          >
                            <i className="fa-solid fa-plus text-white"></i> Add
                            Product
                          </button>
                        </div>
                      ) : (
                        <button className="bg-main btn d-block w-100">
                          {" "}
                          <i className=" text-white fa-solid fa-spinner fa-spin "></i>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center my-5">
              <li className="page-item">
                <a
                  className="page-link cursor-pointer"
                  pagenum="1"
                  onClick={getpages}
                >
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link cursor-pointer"
                  pagenum="1"
                  onClick={getpages}
                >
                  1
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link cursor-pointer"
                  pagenum="2"
                  onClick={getpages}
                >
                  2
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link cursor-pointer"
                  pagenum="2"
                  onClick={getpages}
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
