import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function ResetPassword() {
  let [loading, setLoading] = useState(true)
  let [ErrorMessage, SetErrorMessage] = useState('')
  let Navg = useNavigate()
  let validationSchema = Yup.object({
    email: Yup.string().required("email is Not Required").email("enter valid email"),
    newPassword: Yup.string().required("password is Not Required").matches(/^[A-Z][a-z!@#$%^&*()_0-9]{8,16}$/, "entar valid password"),
  })

  async function ConfirmNewPassword(val) {
    setLoading(false)
    let req = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      val).catch((err) => {
        console.log(err.response.data.message);
        SetErrorMessage(err.response.data.message)
        setLoading(true)
      })


    if (req.data.token) {
      Navg('/')
    }

    console.log(req);
  }
  let Formik = useFormik({
    initialValues: {
      email: "",
      newPassword: ""
    },
    onSubmit: ConfirmNewPassword,

    validationSchema
  })



  return <>
    <h2>ResetPassword</h2>
    {ErrorMessage ? <div className='alert alert-danger'>{ErrorMessage}</div> : ""}
    <form onSubmit={Formik.handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input onChange={Formik.handleChange} onBlur={Formik.handleBlur} type="email" name='email' className='form-control mb-3' id='email' />
        {(Formik.errors.email && Formik.touched.email) ? <div className='alert alert-danger'>
          {Formik.errors.email}
        </div> : ""}
      </div>

      <div>
        <label htmlFor="newPassword">NewPassword</label>
        <input onChange={Formik.handleChange} onBlur={Formik.handleBlur} type="password" name='newPassword' className='form-control mb-3' id='newPassword' />
        {(Formik.errors.newPassword && Formik.touched.newPassword) ? <div className='alert alert-danger'>
          {Formik.errors.newPassword}
        </div> : ""}
      </div>
      <div className='d-flex justify-content-end' >
        {loading ? <button disabled={!(Formik.isValid && Formik.dirty)} type='submit' className='btn bg-main text-white  '>confirm</button> : <button className='bg-main btn'> <i className='text-white fa-solid fa-spinner fa-spin'></i></button>}
      </div>
    </form>
  </>
}
