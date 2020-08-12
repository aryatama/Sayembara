import AsyncStorage from '@react-native-community/async-storage';
import Axios from "axios"

const BASE_URL = "https://sayembara.herokuapp.com"

export const getProfile = (token, userId) => {
    return async dispatch => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/v1/profile`, {
                headers: {
                    Authorization: token
                }
            })
            const dataProfile = res.data.data.data
            if (res.status == 200) {
                dispatch({ type: "GET_PROFILE", payload: dataProfile })
                console.log("Ini data profile", res)
            }

        } catch (error) {
                console.log("Ini data error profile")
                console.log(error)
        }
    }
}

export const updateProfile = (token, userId, firstName, lastName, location, bank, accNum, photo, photoName, photoType) => {
    const dataForm = new FormData();
    dataForm.append('image', {
        uri: photo,
        name: photoName,
        type: photoType
    });
    dataForm.append('first_name', firstName);
    dataForm.append('last_name', lastName);
    dataForm.append('bank', bank);
    dataForm.append('acc_number', accNum);
    dataForm.append('location', location);

    return async dispatch => {
        try {
            const resUpdate = await Axios.put(`${BASE_URL}/api/v1/profile/update/${userId}`, dataForm, {
                headers: {
                    Authorization: token
                }
            })
            if (resUpdate.status == 200) {
                console.log("berhasil updateeeeeee")
                const res = await Axios.get(`${BASE_URL}/api/v1/profile`, {
                    headers: {
                        Authorization: token
                    }
                })
                const dataProfile = res.data.data.data
                if (res.status == 200) {
                    dispatch({ type: "GET_PROFILE", payload: dataProfile })
                    console.log("Ini data updateprofile", resUpdate)
                    dispatch({ type: "LOADING" })
                    dispatch({ type: "TOAST", toastMessage: "Profile has been updated!" })
                } else {
                    dispatch({ type: "LOADING" })
                    dispatch({ type: "TOAST", toastMessage: "Something wrong , try again!" })
                }
            }

        } catch (error) {
            console.log(error)
            dispatch({ type: "LOADING" })
            dispatch({ type: "TOAST", toastMessage: "Something wrong , try again!" })
        }
    }
}