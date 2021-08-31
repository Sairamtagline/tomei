import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordData, resetPasswordEmailData, toastMessage } from '../store/Actions/signUpAction';
import { signUpValidation } from '../utils/signUpValidation';

const initialState = { oldPassword: "", password: "", confirmPassword: "" }

const resetPassword = () => {
    const dispatch = useDispatch()
    const [formData, setFormData]: any = useState(initialState)
    const [formError, setError] = useState({ oldPassword: "", password: "", confirmPassword: "" })
    const [email, setEmail] = useState("")
    const userData = useSelector((state: any) => state.SignUpUser.resetPassword_email)

    useEffect(() => {
        if (userData) {
            setEmail(userData)
        }
    }, [userData])

    const handleInputEvent = (e: any) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        setError(formError => ({
            ...formError,
            [name]: signUpValidation(name, value, formData)
        }));
    }

    const handleEditPassword = (data: any) => {
        dispatch(resetPasswordEmailData(data.email))
    }

    const handleResetPassword = async (e: any) => {
        e.preventDefault();
        let validationErrors: any = {};
        Object.keys(formData).forEach((name) => {
            const error = signUpValidation(name, formData[name], formData);
            if (error && error.length > 0) {
                validationErrors[name] = error;
            }
        });
        if (Object.keys(validationErrors).length > 0) {
            setError(validationErrors);
            return;
        }
        const data = { email: email, oldPassword: formData.oldPassword, newPassword: formData.password, confirmPassword: formData.confirmPassword }
        await axios.post(process.env.REACT_APP_API_BACKEND_URL + "/reset-password",
            data,
        ).then(resp => {
            setEmail("")
            dispatch(toastMessage({ status: true, type: "success", message: resp?.data?.message || 'password updated successfully.' }))
            dispatch(resetPasswordEmailData(""))
            setFormData(initialState)
        })
            .catch(err => {
                dispatch(toastMessage({ status: true, type: "danger", message: err?.response?.data?.message || "Something went wrong please try again." }))
            });
        dispatch(resetPasswordData({ password: formData.newPassword }))
    }

    return { userData, formData, formError, handleEditPassword, handleInputEvent, handleResetPassword }
}

export default resetPassword
