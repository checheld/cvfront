import { IProject, IProjectCV, IUser, ICV } from "../interfaces/index";
 
export enum CVsActions {
    GET_CVS_REQUEST = 'GET_CVS_REQUEST',
    GET_CVS_RESULT = 'GET_CVS_RESULT',
    GET_CV_REQUEST = 'GET_CV_REQUEST',
    GET_CV_RESULT = 'GET_CV_RESULT',
    DEL_CV_REQUEST = 'DEL_CV_REQUEST',
    DEL_CV_RESULT = 'DEL_CV_RESULT',
    DOWNLOAD_CV_REQUEST = 'DOWNLOAD_CV_REQUEST',
    DOWNLOAD_CV_RESULT = 'DOWNLOAD_CV_RESULT',
    ADD_CV_REQUEST = 'ADD_CV_REQUEST',
    ADD_CV_RESULT = 'ADD_CV_RESULT',
    EDIT_CV_REQUEST = 'EDIT_CV_REQUEST',
    EDIT_CV_RESULT = "EDIT_CV_RESULT",
    SEARCH_CVS_REQUEST = 'SEARCH_CVS_REQUEST',
    SEARCH_CVS_RESULT = "SEARCH_CVS_RESULT"
}

export interface getCVsResultAction {
    type: string,
    payload: ICV[]
}

export interface getCVsRequestAction {
    type: string
}

export interface getCVResultAction {
    type: string,
    payload: ICV
}

export interface getCVRequestAction {
    type: string,
    id: number
}

export interface delCVRequestAction {
    type: string,
    id: number
}

export interface delCVResultAction {
    type: string
}

export interface downloadCVRequestAction {
    type: string,
    payload: number
}

export interface downloadCVResultAction {
    type: string,
}

export interface addCVRequestAction {
    type: string,
    payload: ICV
}

export interface addCVResultAction {
    type: string
}

export interface editCVRequestAction {
    type: string,
    payload: { id: number, CVName: string, user: IUser, projectcvs: IProjectCV[]},
    id: number
}

export interface editCVResultAction {
    type: string,
}

export interface searchCVsRequestAction {
    type: string,
    payload: string
}

export interface searchCVsResultAction {
    type: string,
    payload: ICV[]
}
