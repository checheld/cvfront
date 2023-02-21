export interface IUniversity {
    id: number,
    name: string,
}

export interface ICompany {
    id: number,
    name: string,
}


export interface ITechnology {
    id: number,
    name: string,
    type: string,
}

export interface IProject {
    id: number,
    name: string,
    description: string,
    projectType: IProjectType,
    country: string,
    link: string,
    technologies: ITechnology[],
    photoList: IProjectPhoto[]
}

export interface IProjectPhoto {
    id?: number,
    projectId?: number,
    project?: IProject,
    url: string
}

export interface IUser {
    id: number,
    firstName: string,
    lastName: string,
    description: string,
    photoParamsId?: number,
    photoParams?: any,
    educations: IEducation[],
    workExperiences: IWorkExperience[],
    technologies: ITechnology[],
    photoUrl: string | null
}

export interface IEducation {
    id?: number,
    universityId: number,
    university?: IUniversity,
    speciality: string,
    startDate: string,
    endDate: string,
    userId?: number,
}

export interface IWorkExperience {
    id?: number,
    companyId: number,
    company?: ICompany,
    position: string,
    startDate: string,
    endDate: string,
    description: string,
    userId?: number,
}

export interface IProjectCV {
    id?: number,
    projectId: number,
    project?: IProject,
    position: string,
    startDate: string,
    endDate: string,
    description: string
}

export interface IProjectType {
    id: number,
    name: string,
}

export interface ICV {
    id: number,
    cvName: string,
    user?: IUser,
    userId: number,
    createdAt: string,
    projectCVList: IProjectCV[]
}

export interface IPhotoParams {
    id?: number,
    scale: number;
    position: {
        x: number;
        y: number;
    };
}

export interface ILogin {
    email: string,
    password: string,
}

export interface action {
    type: string,
    payload?: any,
    response?: any
    statusText?: string
}