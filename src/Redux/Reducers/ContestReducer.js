const initState = {
    allContest: [],
    myContest: [],
    detailContest: {},
    submissions: {}
}

export const contestReducer = (state = initState, action) => {
    switch (action.type) {
        case "GET_ALL_CONTEST":
            return {
                ...state,
                allContest: action.allContest,
            }

        case "GET_MYCONTEST":
            return {
                ...state,
                myContest: action.payload,
            }

        case "GET_DETAIL_CONTEST":
            return {
                ...state,
                detailContest: action.payload,
                submissions : action.submission
            }

        default:
            return state;
    }
}