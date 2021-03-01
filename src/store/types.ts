import { Group, User } from '../types/dbTypes';

export const CHANGE_USER = 'SET_USER'
export const LOGOUT = 'LOGOUT'
export const CHANGE_CURR_CHAT = 'CHANGE_CURR_CHAT'
export const SET_GROUPS = 'SET_GROUPS'
export const SET_GROUPS_SCREEN = 'SET_GROUPS_SCREEN'

export type GroupsSectionScreenType='new-group-users'|'new-group-name'|'my-profile'|'search'|'new-chat'|'none'

export interface ChangeUserAction {
    type: typeof CHANGE_USER,
    user: User
}
export interface LogoutAction {
    type: typeof LOGOUT,
}
export interface ChangeCurrChatAction {
    type: typeof CHANGE_CURR_CHAT,
    chatId: number
}
export interface SetGroupsAction {
    type: typeof SET_GROUPS,
    groups:Group[]|undefined
}
export interface SetGroupsScreenAction {
    type: typeof SET_GROUPS_SCREEN,
    groupScreen:GroupsSectionScreenType
}
export type UserActionTypes =
    LogoutAction | ChangeUserAction | ChangeCurrChatAction|SetGroupsAction|SetGroupsScreenAction
