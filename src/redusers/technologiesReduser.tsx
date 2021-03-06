import { technologiesActions } from "../actionsTypes/technologiesActionTypes"
import { ITechnology, action, TechnologiesMapper } from "../interfaces/index"

interface technologiesReduser {
  technologies: ITechnology[],
  isLoading: {
    add: boolean,
    delete: boolean,
    edit: boolean,
    get: boolean,
    getAll: boolean,
    search: boolean,
  }
  result: {
    add: null | undefined | number,
    delete: null | string,
    edit: null | undefined | number,
    search: null | undefined | number,
  }
}

export const initialState: technologiesReduser = {
  technologies: [],
  isLoading: {
    get: false,
    getAll: true,
    add: false,
    delete: false,
    edit: false,
    search: false,
  },
  result: {
    add: null,
    delete: null,
    edit: null,
    search: null,
  }
}

export const technologiesReducer = (state = initialState, action: action):technologiesReduser => {

  switch (action.type) {
    case technologiesActions.GET_TECHNOLOGIES_REQUEST:
      return {
        ...state
      };

    case technologiesActions.GET_TECHNOLOGIES_RESULT:
      let technologies: ITechnology[] = action.payload.map((x: ITechnology) => TechnologiesMapper(x))
      return {
        ...state,
        isLoading: {...state.isLoading, getAll: false},
        technologies: technologies.sort((a, b) => Number(a.name) - Number(b.name))
      };

    case technologiesActions.DEL_TECHNOLOGY_REQUEST:
      return {...state, isLoading: {...state.isLoading, delete: true}, result: {
        ...state.result, delete: null
      }
    };

    case technologiesActions.DEL_TECHNOLOGY_RESULT:
      return {
        ...state, 
        isLoading: {...state.isLoading, delete: false},
        result: {
          ...state.result
        }
      };

    case technologiesActions.ADD_TECHNOLOGY_REQUEST:
      return {...state,
         isLoading: {
        ...state.isLoading, get: true
      }};   

    case technologiesActions.ADD_TECHNOLOGY_RESULT:
      return {
        ...state, 
        isLoading: {
          ...state.isLoading, add: false
        },
        result: {
          ...state.result, add: action.response
        }
      }

    case technologiesActions.EDIT_TECHNOLOGY_REQUEST:
      return {...state,
          isLoading: {
        ...state.isLoading, edit: true
      }}; 

    case technologiesActions.EDIT_TECHNOLOGY_RESULT:
      return {
        ...state,
        isLoading: {
          ...state.isLoading, edit: false
        },
        result: {
          ...state.result, edit: action.response
        }
      }

    case technologiesActions.SEARCH_TECHNOLOGIES_REQUEST:
      return {
        ...state,
        isLoading: { ...state.isLoading, search: false },
      };

    case technologiesActions.SEARCH_TECHNOLOGIES_RESULT:
      let uni: ITechnology[] = action.response.map((x: ITechnology) => TechnologiesMapper(x))
      return {
        ...state,
        isLoading: { ...state.isLoading, search: true },
        technologies: uni.sort((a, b) => Number(a.name) - Number(b.name))
      };

    default:
      return state
  };
}