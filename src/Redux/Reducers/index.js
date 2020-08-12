import { combineReducers } from "redux";

import { authReducer } from "./AuthReducer";
import { contestReducer } from "./ContestReducer";
import { messageReducer } from "./MessageReducer";
import { profileReducer } from "./ProfileReducers";

export default combineReducers ({
    auth: authReducer,
    contest : contestReducer,
    message : messageReducer,
    profile : profileReducer
})