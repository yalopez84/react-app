import {combineReducers} from "redux";
import {toDoItem} from "./toDoItem";
import {user} from "./user";

export const reducers = combineReducers({
    toDoItem,
    user
})