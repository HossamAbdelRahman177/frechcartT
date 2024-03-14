import axios from 'axios'
import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function Registar() {
  let navg = useNavigate()
  let [ErrMessage, setErrMessage] = useState("")
  let [loading, setLoading] = useState(true)


  async function RegistarForm(value) {
    setLoading(false)
    let req = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",value)
       .catch((err) => {
        setLoading(true)
        setErrMessage(err.response.data.message)
      })
    if (req?.data.message == "success") {
      navg('/')
      setLoading(true)
    }
  }

  let validationSchema = Yup.object({
    name: Yup.string().required('Name is Not Required').min(3, 'min character 3').max(20, 'max character 20'),
    email: Yup.string().required("email is Not Required").email("enter valid email"),
    password: Yup.string().required("password is Not Required").matches(/^[A-Z][a-z!@#$%^&*()_0-9]{8,16}$/, "entar valid password"),
    rePassword: Yup.string().required("RePassword is Not Required").oneOf([Yup.ref("password")], "RePassword Not Match"),
    phone: Yup.string().required("phone is Not Required").matches(/^01[1520][0-9]{8}$/, "enter valid phone")
  })
  let form1 = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: ""
    },
    onSubmit: RegistarForm,
    validationSchema
  })

  return (
    <div>

      <h1 className='pb-2'>Registar Now.....</h1>
      {ErrMessage != "" ? <div className='alert alert-danger'>{ErrMessage}</div> : ""}

      <form onSubmit={form1.handleSubmit} >
        <div>
          <label htmlFor="name">Name</label>
          <input onChange={form1.handleChange} onBlur={form1.handleBlur}  type="text" name='name' className=' form-control mb-3 ' id='name' />
          {(form1.errors.name && form1.touched.name) ? <div className='alert alert-danger'>
            {form1.errors.name}
          </div> : ""}

        </div>
        <div>

          <label htmlFor="email">Email</label>
          <input onChange={form1.handleChange} onBlur={form1.handleBlur}  type="email" name='email' className='form-control mb-3' id='email' />
          {(form1.errors.email && form1.touched.email) ? <div className='alert alert-danger'>
            {form1.errors.email}
          </div> : ""}
        </div>

        <div>
          <label htmlFor="phone">phone</label>
          <input onChange={form1.handleChange} onBlur={form1.handleBlur}  type="tel" name='phone' className='form-control mb-3' id='phone' />
          {(form1.errors.phone && form1.touched.phone) ? <div className='alert alert-danger'>
            {form1.errors.phone}
          </div> : ""}
        </div>

        <div>
          <label htmlFor="password">password</label>
          <input onChange={form1.handleChange} onBlur={form1.handleBlur}  type="password" name='password' className='form-control mb-3' id='password' />
          {(form1.errors.password && form1.touched.password) ? <div className='alert alert-danger'>
            {form1.errors.password}
          </div> : ""}
        </div>
        <div>
          <label htmlFor="RePassword">rePassword</label>
          <input onChange={form1.handleChange} onBlur={form1.handleBlur} type="password" name='rePassword' className='form-control mb-3' id='rePassword' />
          {(form1.errors.rePassword && form1.touched.rePassword) ? <div className='alert alert-danger'>
            {form1.errors.rePassword}
          </div> : ""}
        </div>
        {loading ? <button disabled={!(form1.isValid && form1.dirty)} type='submit' className='btn bg-main text-white'>Registar</button> : <button className='bg-main btn'> <i className=' text-white fa-solid fa-spinner fa-spin'></i></button>}


      </form>
    </div>

  )
}
