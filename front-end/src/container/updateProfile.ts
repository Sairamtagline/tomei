import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signUpValidation } from '../utils/signUpValidation';
import { editUserData, getUserData, toastMessage } from '../store/Actions/signUpAction'

const initialState: any = { name: "", email: "", image: "" }

const updateProfileContainer = () => {
    const dispatch = useDispatch()
    const [allData, setAllData] = useState([])
    const [formData, setFormData] = useState(initialState)
    const [isOpen, setIsOpen] = useState(false)
    const [deleteModal, setDeleteModal] = useState({ id: "", email: "" })
    const [imagePreview, setImagePreview] = useState<null | string>(null)
    const [formError, setError] = useState({ name: "", email: "", image: "" })
    const userData = useSelector((state: any) => state.SignUpUser.edit_user)
    const allUserData = useSelector((state: any) => state.SignUpUser.allUser)

    useEffect(() => {
        if (userData) {
            setFormData({ ...formData, name: userData.name, email: userData.email, image: userData.image })
        }
    }, [userData])

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        setAllData(allUserData)
    }, [allUserData])

    const fetchData = async () => {
        await axios.get(process.env.REACT_APP_API_BACKEND_URL + "/list").then(resp => {
            dispatch(getUserData(resp?.data?.data))
        })
            .catch(err => {
                console.log(`error`, err)
            })
    }

    const handleInputEvent = (e: any) => {
        const { name, value, type, checked, files } = e.target
        let reader: any = new FileReader();
        const val = type === 'file' ? files : value
        setFormData({ ...formData, [name]: val })
        if (type === "file") {
            reader.onloadend = () => { setImagePreview(reader.result) };
            reader.readAsDataURL(files[0])
        }
        setError(formError => ({
            ...formError,
            [name]: signUpValidation(name, value, formData)
        }));

    }

    const handleEdit = (data: any) => {
        const tempData = { name: data.name, email: data.email, image: process.env.REACT_APP_API_BACKEND_IMAGE_URL + data.profilePic }
        dispatch(editUserData(tempData))

    }

    const cancelClick = () => {
        setIsOpen(false)
    }

    const handleDelete = async () => {
        let temp: any = allData.slice()
        const data: any = { "email": deleteModal.email }
        await axios.delete(process.env.REACT_APP_API_BACKEND_URL + "/delete", {
            data: data,
        }
        ).then(resp => {
            dispatch(toastMessage({ status: true, type: "success", message: resp?.data?.message || 'Deleted successfully.' }))
            temp.splice(deleteModal.id, 1)
            setIsOpen(false)
            fetchData()
        }
        ).catch(err => {
            dispatch(toastMessage({ status: true, type: "danger", message: err?.response?.data?.message || "Something went wrong please try again." }))
            setIsOpen(false)
        });
    }

    const deleteClick = (id: string, email: string) => {
        setIsOpen(true)
        setDeleteModal({ id: id, email: email })

    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        let validationErrors: any = {};
        Object.keys(formData).forEach((name) => {
            const error = signUpValidation(name, formData && formData[name], formData);
            if (error && error.length > 0) {
                validationErrors[name] = error;
            }
        });

        if (Object.keys(validationErrors).length > 0) {
            setError(validationErrors);
            return;
        }

        const data = new FormData();
        data.append("name", formData?.name);
        data.append("email", formData?.email);
        if (typeof (formData?.image) === 'string') {
            data.append("profilePic", formData?.image)
        } else {
            data.append("profilePic", formData?.image[0]);
        }

        await axios.put(process.env.REACT_APP_API_BACKEND_URL + "/update",
            data,
        ).then(resp => {
            dispatch(toastMessage({ status: true, type: "success", message: resp?.data?.message || 'Data updated successfully.' }))
            setImagePreview(null)
            fetchData()
            dispatch(editUserData(initialState))
            setFormData(initialState)
        })
            .catch(err => {
                dispatch(toastMessage({ status: true, type: "danger", message: err?.response?.data?.message || "Something went wrong please try again." }))
            });
    }


    return { isOpen, allData, cancelClick, formData, formError, handleEdit, handleDelete, deleteClick, handleInputEvent, handleSubmit, imagePreview, fetchData }
}

export default updateProfileContainer
