import AsyncStorage from '@react-native-community/async-storage';
import Axios from "axios"

const BASE_URL = "https://sayembara.herokuapp.com"

export const checkToken = () => {
    return async dispatch => {
        try {
            const res = await AsyncStorage.getItem("@token")
            const resId = await AsyncStorage.getItem("@userId")
            console.log(res)
            console.log(resId)
            dispatch({ type: 'CHECK_TOKEN', token: res, userId: parseInt(resId) })

        } catch (error) {
            console.log(error)
        }
    }
}

export const Login = (Email, Password) => {
    return async dispatch => {
        try {
            const res = await Axios.post(`${BASE_URL}/api/v1/user/login`, {
                email: Email,
                password: Password
            })
            // console.log(res)
            console.log(res.data.data)


            if (res.status == 201) {
                if(res.data.data.User.role == "participant") {

                    const resMyContest = await Axios.get(`${BASE_URL}/api/v1/contest/mine`, {
                        headers: {
                            Authorization: res.data.data.token
                        }
                    })
                    const dataMyContest = resMyContest.data.data.rows
                    if (resMyContest.status == 200 && dataMyContest !== "no contest yet") {
                        dispatch({ type: "GET_MYCONTEST", payload: dataMyContest })
                        console.log("data my contest", dataMyContest)
                    } else dispatch({ type: "GET_MYCONTEST", payload: [] })
    
    
                    const resProfile = await Axios.get(`${BASE_URL}/api/v1/profile`, {
                        headers: {
                            Authorization: res.data.data.token
                        }
                    })
                    const dataProfile = resProfile.data.data.data
                    if (resProfile.status == 200) {
                        dispatch({ type: "GET_PROFILE", payload: dataProfile })
                        console.log("data profile", dataProfile)
                    }
    
    
                    await AsyncStorage.setItem("@token", res.data.data.token)
                    await AsyncStorage.setItem("@userId", String(res.data.data.User.id))
                    dispatch({ type: 'LOGIN', token: res.data.data.token, userId: res.data.data.User.id })
                    dispatch({ type: 'LOADING' })
                    dispatch({ type: "TOAST", toastMessage: "Login success" })
                } else {
                    dispatch({ type: 'LOADING' })
                    dispatch({ type: "GOTO_WEB", payload: "You are not a participant, please login on the website!"}) 
                }
            } else {
                dispatch({ type: 'LOADING' })
                dispatch({ type: "TOAST", toastMessage: "Incorrect Email and Password, try again!" })
            }

        } catch (error) {
            dispatch({ type: 'LOADING' })
            dispatch({ type: "TOAST", toastMessage: "Incorrect Email and Password, try again!" })
            console.log(error)
        }
    }
}

export const Register = (First, Last, Email, Password, Password2) => {
    return async dispatch => {
        try {
            const res = await Axios.post(`${BASE_URL}/api/v1/user/register`, {
                first_name: First,
                last_name: Last,
                email: Email,
                password: Password,
                verify_password: Password2,
                role: "participant"
            })
            // console.log(res)
            // console.log(res.data.data.token)
            if (res.status == 201) {
                dispatch({ type: 'REGISTERED' })
                dispatch({ type: 'LOADING' })
                dispatch({ type: "TOAST", toastMessage: "Register success, to continue please login" })
            } else {
                dispatch({ type: 'LOADING' })
                dispatch({ type: "TOAST", toastMessage: "Incorrect input or email has been used, try again!" })
            }

        } catch (error) {
            dispatch({ type: 'LOADING' })
            dispatch({ type: "TOAST", toastMessage: "Incorrect input or email has been used, try again!" })
            console.log(error)
        }
    }
}

export const Logout = () => {
    return async dispatch => {
        try {
            await AsyncStorage.removeItem('@token')
            await AsyncStorage.removeItem('@userId')
            dispatch({ type: "LOGOUT" })
            dispatch({ type: "LOADING" })
        } catch (error) {
            console.log(error)
        }
    }
}