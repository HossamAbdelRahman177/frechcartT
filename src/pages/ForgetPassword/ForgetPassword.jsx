import React, { useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'


export default function ForgetPassword() {
    let [errMassege, SetErrMassege] = useState("")
    let [FormStatus, SetFormStauts] = useState(true)
    let [loading, setLoading] = useState(true)
    let [spin, SetSpin] = useState(true)
    let Navg = useNavigate()
    let validationSchema = Yup.object({
        email: Yup.string().required("email is Required").email("enter valid email"),

    })

    let Formik = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: ForgetPasswordApi,
        validationSchema
    })

    let validationSchema2 = Yup.object({
        resetCode: Yup.string().required("resetCode is Not Required").matches(/^[0-9]{4,6}$/, "Entar Valid Code"),

    })

    let Formik2 = useFormik({
        initialValues: {
            resetCode: ""
        },

        onSubmit: verifyResetCode,

        validationSchema: validationSchema2
    })
    async function ForgetPasswordApi(value) {
        setLoading(false)
        console.log(value);
        let req = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
            value).catch((err) => {
                SetErrMassege(err.response.data.message)
                setLoading(true)

            })

        if (req.data.statusMsg == "success") {
            SetFormStauts(false)
        }
        console.log(req);

    }

    async function verifyResetCode(value) {
        SetSpin(false)
        let req = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
            value).catch((err) => {
                SetErrMassege(err.response.data.message)
                SetSpin(true)
            })
        if (req.data.status == "Success") {
            Navg("/ResetPassword")
        }

        console.log(req);
    }
    return <>



        <div>
            {errMassege ? <div className='alert alert-danger'>
                {errMassege}
            </div> : ""}
            {FormStatus ?
                <form onSubmit={Formik.handleSubmit} >
                    <label htmlFor="email">Entar Your Email</label>
                    <input onChange={Formik.handleChange} onBlur={Formik.handleBlur} type="email" name='email' className='form-control my-1 mb-3' id='email' />
                    <div className='d-flex justify-content-end' >
                        {loading ? <button disabled={!(Formik.isValid && Formik.dirty)} type='submit' className='btn bg-main text-white  '>Send</button> : <button className='bg-main btn'> <i className=' text-white fa-solid fa-spinner fa-spin'></i></button>}
                    </div>
                </form> :
                <div>
                    <form onSubmit={Formik2.handleSubmit} >
                        <label htmlFor="resetCode">Entar Code</label>
                        <input onChange={Formik2.handleChange} onBlur={Formik2.handleBlur} type="resetCode" name='resetCode' className='form-control my-1 mb-3' id='resetCode' />
                        {Formik2.errors.resetCode && Formik2.touched.resetCode ? <div className='alert alert-danger'>{Formik2.errors.resetCode}</div> : ""}
                        <div className='d-flex justify-content-end' >
                            {spin ? <button disabled={!(Formik2.isValid && Formik2.dirty)} type='submit' className='btn bg-main text-white  '>Virify Code</button> : <button className='bg-main btn'> <i className=' text-white fa-solid fa-spinner fa-spin'></i></button>}
                        </div>
                    </form>
                </div>}

        </div>

    </>

}
