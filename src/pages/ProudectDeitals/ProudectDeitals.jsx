import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { CartContext } from "../../context/CartContext";

export default function ProudectDeitals() {
  let { SetNumitem, addCart } = useContext(CartContext);
  let pram = useParams();
  let [proudectid, setproudectid] = useState();
  useEffect(() => {
    setproudectid(pram.id);
  }, []);

  function getSrc(event) {
    // console.log(event.target.getAttribute('src'));
    let imgPath = event.target.getAttribute("src");
    document.getElementById("bigIamg").setAttribute("src", imgPath);
  }
  let { data, isLoading } = useQuery(
    ["proudectDeitals", proudectid],
    getDeitalsProudect
  );
  // console.log(data?.data.data);
  function getDeitalsProudect(queryData) {
    // console.log(queryData);
    if (proudectid != undefined) {
      return axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${proudectid}`
      );
    } else {
    }
  }

  async function AddToCart(id) {
    let req = await addCart(id).catch((err) => {
      toast.error("This is an error!");
    });

    if (req.data.status == "success") {
      SetNumitem(req.data.numOfCartItems);
      toast.success(req.data.message);
    }
  }

  return (
    <>
      <Toaster />
      {isLoading ? (
        <div className=" loading d-flex justify-content-center align-items-center bg-white position-fixed top-0 end-0 start-0 bottom-0">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="container my-5 py-5">
          <div className="row align-items-center">
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-2 d-flex flex-column justify-content-center">
                  {data?.data.data.images.map((element) => {
                    return (
                      <img
                        src={element}
                        onClick={getSrc}
                        alt=""
                        className="w-100 imagesApi cursor-pointer"
                      />
                    );
                  })}
                </div>
                <div className="col-md-10">
                  <img
                    src={data?.data.data.imageCover}
                    alt=""
                    className="w-100"
                    id="bigIamg"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <h2>{data?.data.data.title}</h2>
              <p className="text-muted py-2">{data?.data.data.description}</p>
              <h6 className="fw-bolder text-main">
                {data?.data.data.category.name}
              </h6>
              <div className="d-flex justify-content-between">
                <h6 className="fw-bolder">{data?.data.data.price} EGP</h6>
                <span className="fw-bolder">
                  {data?.data.data.ratingsAverage}{" "}
                  <i className="fa-solid fa-star rating-color"></i>{" "}
                </span>
              </div>
              <button
                onClick={() => AddToCart(data?.data.data.id)}
                className="btn bg-main w-100 d-block text-white"
              >
                {" "}
                <i className="fa-solid fa-plus text-white"></i> Add to Cart{" "}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
