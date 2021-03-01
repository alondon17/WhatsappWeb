
import { Group, User } from "../types/dbTypes";
import { actionTypes } from "./actionTypes";
import { LOGOUT, CHANGE_USER, UserActionTypes, CHANGE_CURR_CHAT, SET_GROUPS, GroupsSectionScreenType, SET_GROUPS_SCREEN } from "./types";

interface IAction {
    type: actionTypes
}
export interface IState {
    currentChat: number | undefined,
    user: User | undefined,
    groups: Group[] | undefined,
    groupSectionScreen: GroupsSectionScreenType

}
type TAction = IAction | UserActionTypes
const initialState: IState = {
    currentChat: undefined,
    user: undefined,
    groups: undefined,
    groupSectionScreen: 'none'
}
const reducer = (state: IState = initialState, action: TAction): IState => {
    console.log(action);
    
    switch (action.type) {
        case LOGOUT:
            return { ...state, user: undefined }
        case CHANGE_USER:
            return { ...state, user: action.user }
        case CHANGE_CURR_CHAT:
            return { ...state, currentChat: action.chatId }
        case SET_GROUPS:
            console.log(action.type);
            return { ...state, groups: action.groups }
        case SET_GROUPS_SCREEN:
            return { ...state, groupSectionScreen:action.groupScreen }
        default:
            return state

    }

}
export default reducer