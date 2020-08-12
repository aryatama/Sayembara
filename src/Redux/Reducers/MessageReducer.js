const initState = {
    isLoading: false,
    message: "",
    toastMessage: "",
    isVisible: false,
    isToast: false,
    isFlash: true,
    isDirect: false,
    directMessage: ""
}

export const messageReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOADING":
            let loading = state.isLoading
            return {
                ...state,
                isLoading: !loading
            }
        case "MESSAGE":
            let visible = state.isVisible
            return {
                ...state,
                isVisible: !visible,
                message: action.message
            }

        case "TOAST":
            let toast = state.isToast
            return {
                ...state,
                isToast: !toast,
                toastMessage: action.toastMessage
            }
        case "GOTO_WEB":
            let direct = state.isDirect
            return {
                ...state,
                isDirect: !direct,
                directMessage: action.payload
            }

        case "FLASH":
            return {
                ...state,
                isFlash: false
            }

        default:
            return state;
    }
}