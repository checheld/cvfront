import { companiesActions } from "../actionsTypes/companiesActionTypes"
import { ICompany, action, UniversitiesMapper } from "../interfaces/index"

interface companiesReduser {
  companies: ICompany[],
  isLoading: {
    add: boolean,
    delete: boolean,
    edit: boolean,
    get: boolean,
    getAll: boolean,
    search: boolean
  }
  result: {
    add: null | undefined | number,
    delete: null | string,
    edit: null | undefined | number,
    search: null | undefined | number,
  }
}

export const initialState: companiesReduser = {
  companies: [],
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

export const companiesReducer = (state = initialState, action: action):companiesReduser => {

  switch (action.type) {
    case companiesActions.GET_COMPANIES_REQUEST:
      return {
        ...state,
      };

    case companiesActions.GET_COMPANIES_RESULT:
      let companies: ICompany[] = action.payload.map((x: ICompany) => UniversitiesMapper(x))
      return {
        ...state,
        isLoading: {...state.isLoading, getAll: false},
        companies: companies.sort((a, b) => Number(a.name) - Number(b.name))
      };

    case companiesActions.DEL_COMPANY_REQUEST:
      return {...state, isLoading: {...state.isLoading, delete: true}, result: {
        ...state.result, delete: null
      }
    };

    case companiesActions.DEL_COMPANY_RESULT:
      return {
        ...state, 
        isLoading: {...state.isLoading, delete: false},
        result: {
          ...state.result
        }
      };

    case companiesActions.ADD_COMPANY_REQUEST:
      return {...state,
         isLoading: {
        ...state.isLoading, get: true
      }};   

    case companiesActions.ADD_COMPANY_RESULT:
      return {
        ...state, 
        isLoading: {
          ...state.isLoading, add: false
        },
        result: {
          ...state.result, add: action.response
        }
      }

    case companiesActions.EDIT_COMPANY_REQUEST:
      return {...state,
        isLoading: {
          ...state.isLoading, edit: true
        }
      };

    case companiesActions.EDIT_COMPANY_RESULT:
      return {
        ...state,
        isLoading: {
          ...state.isLoading, edit: false
        },
        result: {
          ...state.result, edit: action.response
        }
      }

    case companiesActions.SEARCH_COMPANIES_REQUEST:
      return {
        ...state,
        isLoading: { ...state.isLoading, search: false },
      };

    case companiesActions.SEARCH_COMPANIES_RESULT:
      let uni: ICompany[] = action.response.map((x: ICompany) => UniversitiesMapper(x))
      return {
        ...state,
        isLoading: { ...state.isLoading, search: true },
        companies: uni.sort((a, b) => Number(a.name) - Number(b.name))
      };

    default:
      return state
  };
}