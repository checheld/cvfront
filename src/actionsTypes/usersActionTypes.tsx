import { IEducation, IPhotoParams, ITechnology, IUser, IWorkExperience } from "../interfaces/index";

export enum usersActions {
    GET_USERS_REQUEST = 'GET_USERS_REQUEST',
    GET_USERS_RESULT = 'GET_USERS_RESULT',
    GET_USER_REQUEST = 'GET_USER_REQUEST',
    GET_USER_RESULT = 'GET_USER_RESULT',
    DEL_USER_REQUEST = 'DEL_USER_REQUEST',
    DEL_USER_RESULT = 'DEL_USER_RESULT',
    ADD_USER_REQUEST = 'ADD_USER_REQUEST',
    ADD_USER_RESULT = 'ADD_USER_RESULT',
    EDIT_USER_REQUEST = 'EDIT_USER_REQUEST',
    EDIT_USER_RESULT = "EDIT_USER_RESULT",
    SEARCH_USERS_REQUEST = 'SEARCH_USERS_REQUEST',
    SEARCH_USERS_RESULT = "SEARCH_USERS_RESULT"
}

export interface getUsersResultAction {
    type: string,
    payload: IUser[]
}

export interface getUsersRequestAction {
    type: string
}

export interface getUserResultAction {
    type: string,
    payload: IUser
}

export interface getUserRequestAction {
    type: string,
    id: number
}

export interface delUserRequestAction {
    type: string,
    id: number
}

export interface delUserResultAction {
    type: string
}

export interface addUserRequestAction {
    type: string,
    payload: IUser
}

export interface addUserResultAction {
    type: string
}

export interface editUserRequestAction {
    type: string,
    payload: { id: number, firstName: string, lastName: string, description: string, educations: IEducation[], workExperiences: IWorkExperience[], technologies: ITechnology[], photoUrl?: string, photoParams?: any },
    id: number
}

export interface editUserResultAction {
    type: string,
}

export interface searchUsersRequestAction {
    type: string,
    payload: string
}

export interface searchUsersResultAction {
    type: string,
    payload: IUser[]
}
