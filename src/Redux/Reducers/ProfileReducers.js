const initState = {
    dataProfile: {},
}

export const profileReducer = (state = initState, action) => {
    switch (action.type) {
        case "GET_PROFILE":
            return {
                ...state,
                dataProfile: action.payload,
            }

        case "UPDATE_PROFILE":
            return {
                ...state,
                dataProfile: action.payload,
            }

        default:
            return state;
    }
}