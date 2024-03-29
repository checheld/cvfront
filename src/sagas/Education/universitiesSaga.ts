import { put, call } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { getUniversitiesResult } from '../../actionCreators/universityActionCreator';
import { IUniversity } from '../../interfaces/index'
import instance from '../axiosSetting';
import config from '../headers';

const axiosGetUniversities = (config: any) =>
  instance.get<IUniversity[]>(
    "/universities",
    config
  );

export default function* getUniversitiesFetch() {
  try {
    const getUniversitiesResponse: AxiosResponse<IUniversity[]> = yield call(axiosGetUniversities, config);
    if (getUniversitiesResponse.status === 200) {
      const response = getUniversitiesResponse.data;
      yield put(getUniversitiesResult(response));
    }
  }
  catch (e) {
    console.log(e)
  }
} 