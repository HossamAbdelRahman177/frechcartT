import React, { useContext, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { CartContext } from "../../context/CartContext";
import { WishListContext } from "../../context/Wishlist";
import toast, { Toaster } from "react-hot-toast";
export default function WhishList() {
  let [spinnerButton, SetSpinnerButton] = useState(true);
  let [ErrorMessage, SetErrorMessage] = useState("");
  let { addCart, SetNumitem } = useContext(CartContext);

  let { setLoading, DeletItemWhishList, whislist, setWhishlist, loading } =
    useContext(WishListContext);

  async function AddToCart(id) {
    SetSpinnerButton(false);
    setLoading(true);
    let req = await addCart(id).catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    });
    setLoading(false);

    if (req?.data?.status == "success") {
      setLoading(true);
      SetSpinnerButton(true);
      SetNumitem(req?.data?.numOfCartItems);
      Swal.fire({
        title: "Good job!",
        text: req.data.message,
        icon: "success",
      });
      setLoading(false);
    }
  }

  async function RemoveItem(id) {
    let req = await DeletItemWhishList(id);
    console.log(req);
    if (req?.data.status == "success") {
      console.log(req.data.message);
      let NewWhishList = req.data.data;
      setWhishlist((WhishList) =>
        WhishList.filter((item) => NewWhishList.includes(item.id))
      );
      toast.success(req.data.message);
    }
  }

  return (
    <>
      <Toaster position="top-right" />
      {loading ? (
        <div className=" loading d-flex justify-content-center align-items-center bg-white position-fixed top-0 end-0 start-0 bottom-0">
          <span className="loader3"></span>
        </div>
      ) : (
        <div>
          {whislist ? (
            <h1 className="fw-bolder text-center pb-5">
              WISHLIST ITEM{" "}
              <i className="fa-solid fa-heart text-danger fa-beat "></i>
            </h1>
          ) : (
            ""
          )}
          {whislist.map((element) => {
            return (
              <div
                key={element.id}
                className="row mb-3 p-2 align-items-center border-bottom border-3 "
              >
                <div className="col-md-10">
                  <div className="row align-items-center">
                    <div className="col-md-1">
                      <img src={element.imageCover} alt="" className="w-100" />
                    </div>

                    <div className="col-md-11">
                      <h6 className="fw-bolder text-main"> {element.title} </h6>
                      <h5 className="text-muted fw-bolder">
                        {element.price} EPG{" "}
                      </h5>
                      <span className="fw-bolder d-block">
                        {" "}
                        {element.ratingsAverage}{" "}
                        <i className="fa-solid fa-star rating-color"></i>{" "}
                      </span>
                      <Link
                        onClick={() => RemoveItem(element.id)}
                        className="text-danger "
                      >
                        Remove <i className="fa-solid fa-trash"></i>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  {spinnerButton ? (
                    <button
                      onClick={() => AddToCart(element.id)}
                      className="btn btn-outline-dark Margin"
                    >
                      Add To Cart
                    </button>
                  ) : (
                    <button className="btn btn-outline-dark">
                      <i className="fa-solid fa-spinner fa-spin"></i>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
