import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { ITechnology } from '../../interfaces/index'
import { technologiesActions } from '../../actionsTypes/technologiesActionTypes';
import instance from '../axiosSetting';

const axiosDelTechnology = (id: string) =>
  instance.delete(
    `/technologies/${id}`
  )

export default function* deltTechnologyFetch(id: string) {
  try {
    const delTechnologyResponse: AxiosResponse<ITechnology> = yield call(axiosDelTechnology, id);
    yield put({ type: technologiesActions.DEL_TECHNOLOGY_RESULT });
  }
  catch (e) {
    console.log(e)
  }
}

