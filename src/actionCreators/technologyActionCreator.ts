import { 
    getTechnologiesResultAction,
    getTechnologiesRequestAction,
    technologiesActions,
    delTechnologyRequestAction,
    delTechnologyResultAction,
    addTechnologyRequestAction,
    addTechnologyResultAction,
    editTechnologyRequestAction,
    searchTechnologiesRequestAction,
    searchTechnologiesResultAction,
    editTechnologyResultAction
} from '../actionsTypes/technologiesActionTypes';
import { ITechnology } from "../interfaces/index";


export const getTechnologiesRequest = () : getTechnologiesRequestAction => {
    return{
        type:  technologiesActions.GET_TECHNOLOGIES_REQUEST
    }
}
export const getTechnologiesResult = (technologies:ITechnology[]) : getTechnologiesResultAction => {
    return{
        type: technologiesActions.GET_TECHNOLOGIES_RESULT,
        payload: technologies
    }
}
export const delTechnologyRequest = (id: number): delTechnologyRequestAction => {
    return{
        type: technologiesActions.DEL_TECHNOLOGY_REQUEST,
        id: id
    }
}

export const delTechnologyResult = (): delTechnologyResultAction => {
    return{
        type: technologiesActions.DEL_TECHNOLOGY_RESULT
    }
}

export const addTechnologyRequest = (payload: Array<ITechnology>): addTechnologyRequestAction => {
    return{
        type: technologiesActions.ADD_TECHNOLOGY_REQUEST,
        payload: payload
    }
}

export const addTechnologyResult = (): addTechnologyResultAction => {
    return{
        type: technologiesActions.ADD_TECHNOLOGY_RESULT
    }
}

export const editTechnologyRequest = (payload: {name: string, type: string}, id: number): editTechnologyRequestAction => {
    return{
        type: technologiesActions.EDIT_TECHNOLOGY_REQUEST,
        payload: payload,
        id: id
    }
}

export const editTechnologyResult = (): editTechnologyResultAction => {
    return{
        type: technologiesActions.EDIT_TECHNOLOGY_RESULT,
    }
}

export const searchTechnologiesRequest = (payload: string): searchTechnologiesRequestAction => {
    return{
        type: technologiesActions.SEARCH_TECHNOLOGIES_REQUEST,
        payload: payload
    }
}

export const searchTechnologiesResult = (searchTechnologies:ITechnology[]) : searchTechnologiesResultAction => {
    return{
        type: technologiesActions.SEARCH_TECHNOLOGIES_RESULT,
        payload: searchTechnologies
    }
}