import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { CartContext } from "../../context/CartContext";
export default function CheckOut() {
  let [spinnerButton, SetSpinnerButton] = useState(true);

  let { checkOUtPayment } = useContext(CartContext);
  let { id, ownerid } = useParams();
  // console.log(id);

  let validationSchema = Yup.object({
    phone: Yup.string()
      .required("phone is Required")
      .matches(/^01[1520][0-9]{8}$/, "enter valid phone"),
    details: Yup.string().required("details is Required"),
    city: Yup.string()
      .required("city is Required")
      .matches(/^[\w-]{3,}$/, "enter valid city"),
  });
  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },

    onSubmit: payment,
    validationSchema,
  });

  async function payment(value) {
    SetSpinnerButton(true);
    let req = await checkOUtPayment(id, value);
    SetSpinnerButton(false);
    console.log(req);
    if (req.data.status == "success") {
      window.open(req.data.session.url, "_self");
    }
  }

  return (
    <>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="Enter Your City"
            className="form-control my-4"
            name="city"
          />
          {formik.touched.city && formik.errors.city ? (
            <p className="text-danger fw-bolder">{formik.errors.city}</p>
          ) : (
            ""
          )}
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="Enter Your phone"
            className="form-control my-4"
            name="phone"
          />
          {formik.touched.phone && formik.errors.phone ? (
            <p className="text-danger fw-bolder">{formik.errors.phone}</p>
          ) : (
            ""
          )}
          <textarea
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="Message "
            className="form-control"
            name="details"
          />
          {spinnerButton ? (
            <button
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
              onSubmit={formik.handleSubmit}
              className="btn bg-main text-white my-3 px-3 d-block ms-auto"
            >
              Pay <i className="fa-brands fa-cc-visa "></i>{" "}
            </button>
          ) : (
            <button className="bg-main btn ms-auto d-block my-3 text-white">
              {" "}
              <i className=" text-white fa-solid fa-spinner fa-spin"></i>
            </button>
          )}
        </form>
      </div>
    </>
  );
}
