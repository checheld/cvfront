import { call, takeEvery } from 'redux-saga/effects'
import getUniversitiesFetch from './Education/universitiesSaga';
import deltUniversityFetch from './Education/delUniveersitySaga';
import { searchUniversitiesRequestAction, getUniversitiesRequestAction, universitiesActions, delUniversityRequestAction, addUniversityRequestAction, editUniversityRequestAction } from '../actionsTypes/universitiesActionTypes';
import addUniversityFetch from './Education/addUniversitySaga';
import editUniversityFetch from './Education/editUniversitySaga';
import searchUniversitiesFetch from './Education/searchUniversitiesSaga';

import { getCompaniesRequestAction, searchCompaniesRequestAction, companiesActions, delCompanyRequestAction, addCompanyRequestAction, editCompanyRequestAction } from '../actionsTypes/companiesActionTypes';
import getCompaniesFetch from './WorkExp/companiesSaga';
import delCompanyFetch from './WorkExp/delCompanySaga';
import addCompanyFetch from './WorkExp/addCompanySaga';
import editCompanyFetch from './WorkExp/editCompanySaga'
import searchCompaniesFetch from './WorkExp/searchCompaniesSaga';

import { getTechnologiesRequestAction, searchTechnologiesRequestAction, technologiesActions, delTechnologyRequestAction, addTechnologyRequestAction, editTechnologyRequestAction } from '../actionsTypes/technologiesActionTypes';
import getTechnologiesFetch from './Technologies/technologiesSaga';
import delTechnologyFetch from './Technologies/delTechnologySaga';
import addTechnologyFetch from './Technologies/addTechnologySaga';
import editTechnologyFetch from './Technologies/editTechnologySaga'
import searchTechnologiesFetch from './Technologies/searchTechnologiesSaga';

import { getProjectsRequestAction, searchProjectsRequestAction, projectsActions, delProjectRequestAction, addProjectRequestAction, editProjectRequestAction, getProjectRequestAction } from '../actionsTypes/projectsActionTypes';
import getProjectsFetch from './Projects/projectsSaga';
import delProjectFetch from './Projects/delProjectSaga';
import addProjectFetch from './Projects/addProjectSaga';
import editProjectFetch from './Projects/editProjectSaga'
import searchProjectsFetch from './Projects/searchProjectsSaga';
import getProjectFetch from './Projects/getProjectSaga';

import { getUsersRequestAction, searchUsersRequestAction, usersActions, delUserRequestAction, addUserRequestAction, editUserRequestAction, getUserRequestAction } from '../actionsTypes/usersActionTypes';
import getUsersFetch from './Users/usersSaga';
import delUserFetch from './Users/delUserSaga';
import addUserFetch from './Users/addUserSaga';
import editUserFetch from './Users/editUserSaga'
import searchUsersFetch from './Users/searchUserSaga';
import getUserFetch from './Users/getUserSaga';

import { getCVsRequestAction, searchCVsRequestAction, CVsActions, delCVRequestAction, addCVRequestAction, editCVRequestAction, getCVRequestAction, downloadCVRequestAction } from '../actionsTypes/CVsActionTypes';
import getCVsFetch from './CVs/getCVsSaga';
import delCVFetch from './CVs/delCVSaga';
import addCVFetch from './CVs/addCVSaga';
import editCVFetch from './CVs/editCVSaga'
import searchCVsFetch from './CVs/searchCVsSaga';
import getCVFetch from './CVs/getCVSaga';
import downloadCVFetch from './CVs/downloadCVSaga';

import { addUserPhotoRequestAction, userPhotosActions } from '../actionsTypes/userPhotosActionTypes';
import addUserPhotoFetch from './Users/UserPhotos/addUserPhotoSaga';

import { addProjectPhotoRequestAction, projectPhotosActions } from '../actionsTypes/projectPhotosActionTypes';
import addProjectPhotoFetch from './Projects/addProjectPhotoSaga';

import getProjectTypesFetch from './ProjectTypes/projectTypesSaga';
import deltProjectTypeFetch from './ProjectTypes/delProjectTypeSaga';
import { searchProjectTypesRequestAction, getProjectTypesRequestAction, projectTypesActions, delProjectTypeRequestAction, addProjectTypeRequestAction, editProjectTypeRequestAction } from '../actionsTypes/projectTypesActionTypes';
import addProjectTypeFetch from './ProjectTypes/addProjectTypeSaga';
import editProjectTypeFetch from './ProjectTypes/editProjectTypeSaga';
import searchProjectTypesFetch from './ProjectTypes/searchProjectTypeSaga';

import loginFetch from './Login/loginSaga';
import { loginActions, loginRequestAction } from '../actionsTypes/loginActionTypes';

// university
export function* getUniversities({ type }: getUniversitiesRequestAction) {
  yield call(getUniversitiesFetch);
}

export function* delUniversity({ type, id }: delUniversityRequestAction) {
  yield call(deltUniversityFetch, id);
}

export function* addUniversity({ type, payload }: addUniversityRequestAction) {
  yield call(addUniversityFetch, payload);
}

export function* editUniversity({ type, payload, id }: editUniversityRequestAction) {
  yield call(editUniversityFetch, payload, id);
}

export function* searchUniversities({ type, payload }: searchUniversitiesRequestAction) {
  yield call(searchUniversitiesFetch, payload);
}

// company
export function* getCompanies({ type }: getCompaniesRequestAction) {
  yield call(getCompaniesFetch);
}

export function* delCompany({ type, id }: delCompanyRequestAction) {
  yield call(delCompanyFetch, id);
}

export function* addCompany({ type, payload }: addCompanyRequestAction) {
  yield call(addCompanyFetch, payload);
}

export function* editCompany({ type, payload, id }: editCompanyRequestAction) {
  yield call(editCompanyFetch, payload, id);
}

export function* searchCompanies({ type, payload }: searchCompaniesRequestAction) {
  yield call(searchCompaniesFetch, payload);
}

// technology
export function* getTechnologies({ type }: getTechnologiesRequestAction) {
  yield call(getTechnologiesFetch);
}

export function* delTechnology({ type, id }: delTechnologyRequestAction) {
  yield call(delTechnologyFetch, id);
}

export function* addTechnology({ type, payload }: addTechnologyRequestAction) {
  yield call(addTechnologyFetch, payload);
}

export function* editTechnology({ type, payload, id }: editTechnologyRequestAction) {
  yield call(editTechnologyFetch, payload, id);
}

export function* searchTechnologies({ type, payload }: searchTechnologiesRequestAction) {
  yield call(searchTechnologiesFetch, payload);
}

// project
export function* getProjects({ type }: getProjectsRequestAction) {
  yield call(getProjectsFetch);
}

export function* getProject({ type, id }: getProjectRequestAction) {
  yield call(getProjectFetch, id);
}

export function* delProject({ type, id }: delProjectRequestAction) {
  yield call(delProjectFetch, id);
}

export function* addProject({ type, payload }: addProjectRequestAction) {
  yield call(addProjectFetch, payload);
}

export function* editProject({ type, project, id }: editProjectRequestAction) {
  yield call(editProjectFetch, project, id);
}

export function* searchProjects({ type, payload }: searchProjectsRequestAction) {
  yield call(searchProjectsFetch, payload);
}

export function* addProjectPhoto({ type, payload }: addProjectPhotoRequestAction) {
  yield call(addProjectPhotoFetch, payload);
}

// user
export function* getUsers({ type }: getUsersRequestAction) {
  yield call(getUsersFetch);
}

export function* getUser({ type, id }: getUserRequestAction) {
  yield call(getUserFetch, id);
}

export function* delUser({ type, id }: delUserRequestAction) {
  yield call(delUserFetch, id);
}

export function* addUser({ type, payload }: addUserRequestAction) {
  yield call(addUserFetch, payload);
}

export function* editUser({ type, payload, id }: editUserRequestAction) {
  yield call(editUserFetch, payload, id);
}

export function* searchUsers({ type, payload }: searchUsersRequestAction) {
  yield call(searchUsersFetch, payload);
}

export function* addUserPhoto({ type, payload }: addUserPhotoRequestAction) {
  yield call(addUserPhotoFetch, payload);
}

// CV
export function* getCVs({ type }: getCVsRequestAction) {
  yield call(getCVsFetch);
}

export function* getCV({ type, id }: getCVRequestAction) {
  yield call(getCVFetch, id);
}

export function* delCV({ type, id }: delCVRequestAction) {
  yield call(delCVFetch, id);
}

export function* addCV({ type, payload }: addCVRequestAction) {
  yield call(addCVFetch, payload);
}

export function* editCV({ type, payload, id }: editCVRequestAction) {
  yield call(editCVFetch, payload, id);
}

export function* searchCVs({ type, payload }: searchCVsRequestAction) {
  yield call(searchCVsFetch, payload);
}

export function* downloadCV({ type, payload }: downloadCVRequestAction) {
  yield call(downloadCVFetch, payload);
}

// projectType
export function* getProjectTypes({ type }: getProjectTypesRequestAction) {
  yield call(getProjectTypesFetch);
}

export function* delProjectType({ type, id }: delProjectTypeRequestAction) {
  yield call(deltProjectTypeFetch, id);
}

export function* addProjectType({ type, payload }: addProjectTypeRequestAction) {
  yield call(addProjectTypeFetch, payload);
}

export function* editProjectType({ type, payload, id }: editProjectTypeRequestAction) {
  yield call(editProjectTypeFetch, payload, id);
}

export function* searchProjectTypes({ type, payload }: searchProjectTypesRequestAction) {
  yield call(searchProjectTypesFetch, payload);
}

// projectType
// export function* login({ type, payload }: loginRequestAction) {
//   yield call(loginFetch, payload);
// }

export function* watcherSaga() {
  yield takeEvery(universitiesActions.GET_UNIVERSITIES_REQUEST, getUniversities);
  yield takeEvery(universitiesActions.DEL_UNIVERSITY_REQUEST, delUniversity);
  yield takeEvery(universitiesActions.ADD_UNIVERSITY_REQUEST, addUniversity);
  yield takeEvery(universitiesActions.EDIT_UNIVERSITY_REQUEST, editUniversity);
  yield takeEvery(universitiesActions.SEARCH_UNIVERSITIES_REQUEST, searchUniversities);

  yield takeEvery(companiesActions.GET_COMPANIES_REQUEST, getCompanies);
  yield takeEvery(companiesActions.DEL_COMPANY_REQUEST, delCompany);
  yield takeEvery(companiesActions.ADD_COMPANY_REQUEST, addCompany);
  yield takeEvery(companiesActions.EDIT_COMPANY_REQUEST, editCompany);
  yield takeEvery(companiesActions.SEARCH_COMPANIES_REQUEST, searchCompanies);

  yield takeEvery(technologiesActions.GET_TECHNOLOGIES_REQUEST, getTechnologies);
  yield takeEvery(technologiesActions.DEL_TECHNOLOGY_REQUEST, delTechnology);
  yield takeEvery(technologiesActions.ADD_TECHNOLOGY_REQUEST, addTechnology);
  yield takeEvery(technologiesActions.EDIT_TECHNOLOGY_REQUEST, editTechnology);
  yield takeEvery(technologiesActions.SEARCH_TECHNOLOGIES_REQUEST, searchTechnologies);

  yield takeEvery(projectsActions.GET_PROJECTS_REQUEST, getProjects);
  yield takeEvery(projectsActions.GET_PROJECT_REQUEST, getProject);
  yield takeEvery(projectsActions.DEL_PROJECT_REQUEST, delProject);
  yield takeEvery(projectsActions.ADD_PROJECT_REQUEST, addProject);
  yield takeEvery(projectsActions.EDIT_PROJECT_REQUEST, editProject);
  yield takeEvery(projectsActions.SEARCH_PROJECTS_REQUEST, searchProjects);

  yield takeEvery(usersActions.GET_USERS_REQUEST, getUsers);
  yield takeEvery(usersActions.GET_USER_REQUEST, getUser);
  yield takeEvery(usersActions.DEL_USER_REQUEST, delUser);
  yield takeEvery(usersActions.ADD_USER_REQUEST, addUser);
  yield takeEvery(usersActions.EDIT_USER_REQUEST, editUser);
  yield takeEvery(usersActions.SEARCH_USERS_REQUEST, searchUsers);

  yield takeEvery(CVsActions.GET_CVS_REQUEST, getCVs);
  yield takeEvery(CVsActions.GET_CV_REQUEST, getCV);
  yield takeEvery(CVsActions.DEL_CV_REQUEST, delCV);
  yield takeEvery(CVsActions.ADD_CV_REQUEST, addCV);
  yield takeEvery(CVsActions.EDIT_CV_REQUEST, editCV);
  yield takeEvery(CVsActions.SEARCH_CVS_REQUEST, searchCVs);

  yield takeEvery(projectPhotosActions.ADD_PROJECTPHOTO_REQUEST, addProjectPhoto);
  yield takeEvery(userPhotosActions.ADD_USERPHOTO_REQUEST, addUserPhoto);

  yield takeEvery(CVsActions.DOWNLOAD_CV_REQUEST, downloadCV);

  yield takeEvery(projectTypesActions.GET_PROJECTTYPES_REQUEST, getProjectTypes);
  yield takeEvery(projectTypesActions.DEL_PROJECTTYPE_REQUEST, delProjectType);
  yield takeEvery(projectTypesActions.ADD_PROJECTTYPE_REQUEST, addProjectType);
  yield takeEvery(projectTypesActions.EDIT_PROJECTTYPE_REQUEST, editProjectType);
  yield takeEvery(projectTypesActions.SEARCH_PROJECTTYPES_REQUEST, searchProjectTypes);

  // yield takeEvery(loginActions.LOGIN_REQUEST, login);

}
export default function* rootSaga() {
  yield watcherSaga();
}
