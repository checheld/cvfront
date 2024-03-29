import { put, call } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { getTechnologiesResult } from '../../actionCreators/technologyActionCreator';
import { ITechnology } from '../../interfaces/index'
import instance from '../axiosSetting';
import config from '../headers';

const axiosGetTechnologies = (config: any) =>

  instance.get<ITechnology[]>(
    "/technologies",
    config
  );

export default function* getTechnologiesFetch() {
  try {
    const getTechnologiesResponse: AxiosResponse<ITechnology[]> = yield call(axiosGetTechnologies, config);
    if (getTechnologiesResponse.status === 200) {
      const response = getTechnologiesResponse.data;
      yield put(getTechnologiesResult(response));
    }
  }
  catch (e) {
    console.log(e)
  }
}


