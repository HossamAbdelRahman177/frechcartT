import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useQuery } from "react-query";
import { UserContext } from "../../context/TokenContext";
import { CartContext } from "../../context/CartContext";
import { WishListContext } from "../../context/Wishlist";
import toast, { Toaster } from "react-hot-toast";

export default function Navbar() {
  let navg = useNavigate();
  let { UserData, SetUserData } = useContext(UserContext);
  let { Numitem } = useContext(CartContext);
  function LogOut() {
    localStorage.setItem("user", null);
    localStorage.setItem("UserToken", null);
    SetUserData(null);
    navg("/");
    toast.success("GoodBye, " + UserData.name);
  }

  function NavgToCart() {
    navg("/Cart");
  }
  return (
    <>
      <Toaster position="top=right" />
      <nav className="navbar navbar-expand-lg fixed-top bg-white  ">
        <div className="container-fluid">
          <NavLink className="navbar-brand " to="home">
            <img src="images/freshcart-logo.svg" alt="" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse  "
            id="navbarSupportedContent"
          >
            {UserData ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item fw-bolder">
                  <NavLink
                    className={(active) =>
                      active.isActive == true ? "test nav-link " : "nav-link"
                    }
                    aria-current="page"
                    to="home"
                  >
                    Home
                  </NavLink>
                </li>

                <li className="nav-item fw-bolder">
                  <NavLink
                    className={(active) =>
                      active.isActive == true ? "test nav-link" : "nav-link"
                    }
                    to="Categories"
                  >
                    Categories
                  </NavLink>
                </li>
                <li className="nav-item fw-bolder">
                  <NavLink
                    className={(active) =>
                      active.isActive == true ? "test nav-link" : "nav-link"
                    }
                    to="Brands"
                  >
                    Brands
                  </NavLink>
                </li>
                <li className="nav-item fw-bolder">
                  <NavLink
                    className={(active) =>
                      active.isActive == true ? "test nav-link" : "nav-link"
                    }
                    to="Cart"
                  >
                    Cart
                  </NavLink>
                </li>
                <li className="nav-item fw-bolder">
                  <NavLink
                    className={(active) =>
                      active.isActive == true ? "test nav-link" : "nav-link"
                    }
                    to="WhishList"
                  >
                    Wishlist
                  </NavLink>
                </li>

                <li className="nav-item fw-bolder">
                  <NavLink
                    className={(active) =>
                      active.isActive == true ? "test nav-link" : "nav-link"
                    }
                    to="allorders"
                  >
                    Allorders
                  </NavLink>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item  mx-2 d-flex align-items-center">
                {UserData ? (
                  <i className="fw-bolder nav-link text-black cursor-pointer">
                    {UserData.name}
                  </i>
                ) : (
                  ""
                )}
                <i className="fa-brands fa-facebook mx-2"></i>
                <i className="fa-brands fa-twitter mx-2"></i>
                <i className="fa-brands fa-instagram mx-2"></i>

                {UserData ? (
                  <Link to={"/WhishList"}>
                    {" "}
                    <span>
                      <i className="fa-solid fa-heart cursor-pointer mx-2"></i>
                    </span>{" "}
                  </Link>
                ) : (
                  ""
                )}
                {UserData ? (
                  <span
                    onClick={NavgToCart}
                    className=" cursor-pointer position-relative "
                  >
                    <i class="fa-brands fa-opencart mx-2 cursor-pointer"></i>
                    {Numitem == null ? (
                      ""
                    ) : (
                      <div className="position-absolute  bg-danger circle fw-bold text-white  ">
                        {Numitem}
                      </div>
                    )}
                  </span>
                ) : (
                  ""
                )}
              </li>
              {UserData ? (
                <li className="nav-item fw-bolder">
                  <span className="nav-link cursor-pointer" onClick={LogOut}>
                    LogOut
                  </span>
                </li>
              ) : (
                <>
                  <li className="nav-item fw-bolder">
                    <NavLink
                      className={(active) =>
                        active.isActive == true ? "nav-link test" : "nav-link"
                      }
                      aria-current="page"
                      to="/"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item fw-bolder">
                    <NavLink
                      className={(active) =>
                        active.isActive == true ? "nav-link test" : "nav-link"
                      }
                      to="Registar"
                    >
                      Rigrstar
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
