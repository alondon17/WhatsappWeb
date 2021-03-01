import { Group, User } from "../types/dbTypes"
import { LOGOUT, CHANGE_USER, LogoutAction, ChangeUserAction ,ChangeCurrChatAction, CHANGE_CURR_CHAT, SetGroupsAction, SET_GROUPS, SetGroupsScreenAction, SET_GROUPS_SCREEN, GroupsSectionScreenType} from "./types"

export const logout=():LogoutAction=>{
    return{
        type:LOGOUT
    }
}
export const changeUser=(user:User):ChangeUserAction=>{
    return{
        type:CHANGE_USER,
        user:user
    }
}
export const changeCurrChat=(chatId:number):ChangeCurrChatAction=>{
    return{
        type:CHANGE_CURR_CHAT,
        chatId:chatId
    }
}
export const setGroups=(groups:Group[]|undefined):SetGroupsAction=>{
    return{
        type:SET_GROUPS,
        groups:groups
    }
}
export const setGroupsScreen=(groupsScreen:GroupsSectionScreenType):SetGroupsScreenAction=>{
    return{
        type:SET_GROUPS_SCREEN,
        groupScreen:groupsScreen
    }
}
