import { put, call } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { IProjectType } from '../../interfaces/index'
import { projectTypesActions } from '../../actionsTypes/projectTypesActionTypes';
import instance from '../axiosSetting';
import config from '../headers';

const axiosDelProjectType = (id: number, config: any) =>
    instance.delete(
        `/projectTypes/${id}`,
        config
    )


export default function* deltProjectTypeFetch(id: number) {
    try {
        const delProjectTypeResponse: AxiosResponse<IProjectType> = yield call(axiosDelProjectType, id, config);
        yield put({ type: projectTypesActions.DEL_PROJECTTYPE_RESULT, response: delProjectTypeResponse.data });
    }
    catch (e) {
        console.log(e)
    }
}

