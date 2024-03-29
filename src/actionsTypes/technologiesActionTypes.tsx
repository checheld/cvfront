import { ITechnology } from "../interfaces/index";
 
export enum technologiesActions {
    GET_TECHNOLOGIES_REQUEST = 'GET_TECHNOLOGIES_REQUEST',
    GET_TECHNOLOGIES_RESULT = 'GET_TECHNOLOGIES_RESULT',
    DEL_TECHNOLOGY_REQUEST = 'DEL_TECHNOLOGY_REQUEST',
    DEL_TECHNOLOGY_RESULT = 'DEL_TECHNOLOGY_RESULT',
    ADD_TECHNOLOGY_REQUEST = 'ADD_TECHNOLOGY_REQUEST',
    ADD_TECHNOLOGY_RESULT = 'ADD_TECHNOLOGY_RESULT',
    EDIT_TECHNOLOGY_REQUEST = 'EDIT_TECHNOLOGY_REQUEST',
    EDIT_TECHNOLOGY_RESULT = "EDIT_TECHNOLOGY_RESULT",
    SEARCH_TECHNOLOGIES_REQUEST = 'SEARCH_TECHNOLOGIES_REQUEST',
    SEARCH_TECHNOLOGIES_RESULT = "SEARCH_TECHNOLOGIES_RESULT"
}

export interface getTechnologiesResultAction {
    type: string,
    payload: ITechnology[]
}

export interface getTechnologiesRequestAction {
    type: string
}

export interface delTechnologyRequestAction {
    type: string,
    id: number
}

export interface delTechnologyResultAction {
    type: string
}

export interface addTechnologyRequestAction {
    type: string,
    payload: Array<ITechnology>
}

export interface addTechnologyResultAction {
    type: string
}

export interface editTechnologyRequestAction {
    type: string,
    payload: {name: string, type: string},
    id: number
}

export interface editTechnologyResultAction {
    type: string,
}

export interface searchTechnologiesRequestAction {
    type: string,
    payload: string
}

export interface searchTechnologiesResultAction {
    type: string,
    payload: ITechnology[]
}
