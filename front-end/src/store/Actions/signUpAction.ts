import { ALL_USER, SIGN_UP, RESET_PASSWORD, EDIT_PROFILE, RESET_PASSWORD_EMAIL, TOASTER } from '../constants'

export const getUserData = (data: any) => (dispatch: any) => {
    dispatch({
        type: ALL_USER, payload: data
    })
}

export const addUserData = (data: any) => (dispatch: any) => {
    dispatch({
        type: SIGN_UP, payload: data
    })
}

export const resetPasswordData = (data: any) => (dispatch: any) => {
    dispatch({
        type: RESET_PASSWORD, payload: data
    })
}

export const editUserData = (data: any) => (dispatch: any) => {
    dispatch({
        type: EDIT_PROFILE, payload: data
    })
}

export const resetPasswordEmailData = (data: any) => (dispatch: any) => {
    dispatch({
        type: RESET_PASSWORD_EMAIL, payload: data
    })
}

export const toastMessage = (data: any) => (dispatch: any) => {
    dispatch({
        type: TOASTER, payload: data
    })
}