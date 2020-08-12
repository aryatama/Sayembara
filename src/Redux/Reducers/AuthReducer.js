const initState = {
    token: null,
    register: false,
    userId: null
}

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                token: action.token,
                userId: action.userId
            }

        case "LOGOUT":
            return {
                ...state,
                userId: null,
                token: null,
            }

        case "CHECK_TOKEN":
            return {
                ...state,
                token: action.token,
                userId: action.userId
            }
        case "REGISTERED":
            return {
                ...state,
                register: true,
            }
        case "RESET_REGISTER":
            return {
                ...state,
                register: false,
            }

        default:
            return state;
    }
}