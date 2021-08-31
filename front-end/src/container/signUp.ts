import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUserData, getUserData, toastMessage } from '../store/Actions/signUpAction';
import { signUpValidation } from '../utils/signUpValidation';
import axios from 'axios'
import updateProfileContainer from './updateProfile';

const initialState = { name: "", email: "", image: "", password: "", confirmPassword: "" }

const signUp = () => {
    const dispatch = useDispatch()
    const { fetchData } = updateProfileContainer()
    const [formData, setFormData]: any = useState(initialState)
    const [formError, setError] = useState({ name: "", email: "", image: "", password: "", confirmPassword: "" })
    const [imagePreview, setImagePreview] = useState<null | string>(null)

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

    const handleSubmit = async (e: any) => {
        e.preventDefault()
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
        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("profilePic", formData.image[0]);

        await axios.post(process.env.REACT_APP_API_BACKEND_URL + "/create",
            data,
        ).then(resp => {
            if (resp?.data?.data) {
                dispatch(toastMessage({ status: true, type: "success", message: resp?.data?.message || 'Created successfully.' }))
                dispatch(addUserData(formData))
                fetchData()
                const newData = { id: resp?.data?.data.id, name: resp?.data?.data.name, email: resp?.data?.data.email, image: resp?.data?.data.profilePic }
                dispatch(getUserData(newData))
                setFormData(initialState)
                setImagePreview(null)
            }
        })
            .catch(err => {
                dispatch(toastMessage({ status: true, type: "danger", message: err?.response?.data?.message || "Something went wrong please try again." }))
            });
    }

    return { formData, formError, handleInputEvent, handleSubmit, imagePreview }
}
export default signUp
