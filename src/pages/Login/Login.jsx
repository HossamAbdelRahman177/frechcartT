import axios from "axios";
import { Formik, useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/TokenContext";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

export default function Login() {
  useEffect(() => {
    localStorage.setItem("user", null);
    localStorage.setItem("UserToken", null);
  }, []);
  let { getUsetCart, SetNumitem } = useContext(CartContext);
  let { SetUserData } = useContext(UserContext);
  let navg = useNavigate();
  let [ErrMessage, setErrMessage] = useState("");
  let [loading, setLoading] = useState(true);

  let validationSchema = Yup.object({
    email: Yup.string()
      .required("email is Not Required")
      .email("enter valid email"),
    password: Yup.string()
      .required("password is Not Required")
      .matches(/^[A-Z][a-z!@#$%^&*()_0-9]{8,16}$/, "entar valid password"),
  });
  let form1 = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: LoginUser,
    validationSchema,
  });
  async function LoginUser(value) {
    setLoading(false);
    let req = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", value)
      .catch((err) => {
        setErrMessage(err.response.data.message);
        setLoading(true);
      });
    if (req?.data.message == "success") {
      console.log(req);
      setLoading(true);
      let decoded = jwtDecode(req.data.token);
      let user = {
        id: decoded.id,
        name: decoded.name,
        token: req.data.token,
      };
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("UserToken", req?.data.token);
      SetUserData(user);
      navg("/home");
      
    }
  }

  async function GetUserNumCart(token) {
    let req = await getUsetCart(token).catch((err) => {
      console.log(err);
    });
    console.log(req);
    if (req?.data?.status == "success") {
      SetNumitem(req.data.numOfCartItems);
    }
  }

  return (
    <div>
      <h1 className="pb-2">Login Now.....</h1>
      {ErrMessage != "" ? (
        <div className="alert alert-danger">{ErrMessage}</div>
      ) : (
        ""
      )}
      <form onSubmit={form1.handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={form1.handleChange}
            onBlur={form1.handleBlur}
            type="email"
            name="email"
            className="form-control mb-3"
            id="email"
          />
          {form1.errors.email && form1.touched.email ? (
            <div className="alert alert-danger">{form1.errors.email}</div>
          ) : (
            ""
          )}
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            onChange={form1.handleChange}
            onBlur={form1.handleBlur}
            type="password"
            name="password"
            className="form-control mb-3"
            id="password"
          />
          {form1.errors.password && form1.touched.password ? (
            <div className="alert alert-danger">{form1.errors.password}</div>
          ) : (
            ""
          )}
        </div>
        <div className="d-flex justify-content-between">
          <NavLink to="/forgetpassword" className="fw-bolder">
            {" "}
            <p>forgetpassword....?</p>
          </NavLink>
          {loading ? (
            <button
              disabled={!(form1.isValid && form1.dirty)}
              type="submit"
              className="btn bg-main text-white  "
            >
              Login
            </button>
          ) : (
            <button className="bg-main btn">
              {" "}
              <i className=" text-white fa-solid fa-spinner fa-spin"></i>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
