export interface IEducation {
    degree: string;
    field: string;
    institute: string;
    startYear: string;
    endYear: string;
    description: string;
}
export interface IExperience {
    title: string;
    company: string;
    startYear: string;
    endYear: string;
    description: string;
}
interface ILocation {
    locality: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
    maplocation: string;
}


export interface ICandidate {
    email: string;
    isEmailVerified: boolean;
    firstName: string;
    lastName: string;
    avatar: string;
    phoneNumber: string,
    password?: string;
    resume: string[],
    signInProvider?: "linkedIn" | "jwt"
    skills: string[],
    experience: IExperience[],
    education: IEducation[],
    socialSites: string[];
    location: ILocation,
    bio: string,
    createdAt: string,
    updatedAt: string,
    role: string,
    _id: string,
    __v: number

}



export interface IEmployer {
    email: string;
    isEmailVerified: boolean;
    firstName: string;
    lastName: string;
    avatar: string;
    phoneNumber: string,
    companyName: string,
    password?: string;
    location: ILocation,
    resume: string,
    industry: string,
    socialSites: string[];
    description: string,
    jobs: string,
    role: string,
    bio: string,
    signInProvider?: "linkedIn" | "jwt"
    createdAt: string,
    updatedAt: string,
    _id: string,
    __v: number

}

export interface IAdmin {
    name: string;
    email: string;
    password: string,
    avatar: string,
    role: string;
    createdAt: string,
    updatedAt: string,
    _id: string,
    __v: number
}