import resetPassword from '../../container/resetPassword'
import { ALL_USER, SIGN_UP, RESET_PASSWORD, EDIT_PROFILE, RESET_PASSWORD_EMAIL, TOASTER } from '../constants'

interface user {
    allUser: any,
    userData: { name: string, email: string, password: string, image: string },
    edit_user: any, resetPassword_email: string,
    toaster: { status: boolean, type: string, message: string }
}

const initialState: user = {
    allUser: [],
    userData: {
        name: '',
        email: '',
        password: '',
        image: ''
    },
    edit_user: [],
    resetPassword_email: "",
    toaster: { status: false, type: "", message: "" }
}

type actions = { type: "ALL_USER", payload: any } |
{ type: "SIGN_UP", payload: any } |
{ type: "RESET_PASSWORD", payload: any } |
{ type: "UPDATE_PROFILE", payload: any } |
{ type: "EDIT_PROFILE", payload: any } |
{ type: "RESET_PASSWORD_EMAIL", payload: any } |
{ type: "TOASTER", payload: any }

const signUpReducer = (state = initialState, action: actions) => {
    switch (action.type) {
        case ALL_USER:
            return {
                ...state,
                allUser: action.payload
            }

        case SIGN_UP:
            return {
                ...state,
                userData: action.payload,

            }

        case RESET_PASSWORD:
            return {
                ...state,
                userData: { ...state.userData, password: action.payload }
            }

        case EDIT_PROFILE:
            return {
                ...state,
                edit_user: action.payload
            }

        case RESET_PASSWORD_EMAIL:
            return {
                ...state,
                resetPassword_email: action.payload
            }

        case TOASTER:
            return {
                ...state,
                toaster: action.payload
            }

        default:
            return state;
    }
}

export default signUpReducer
export type RootState = ReturnType<typeof signUpReducer>