export interface ICandidate {
    email: string;
    isEmailVerified: boolean;
    firstName: string;
    lastName: string;
    avatar: string;
    phoneNumber: string,
    password?: string;
    resume: string,
    signInProvider?: "linkedIn" | "jwt"
    skills: string[],
    experience: string,
    education: string,
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
    location: string,
    resume: string,
    industry: string,
    description: string,
    jobs: string,
    role: string,
    signInProvider?: "linkedIn" | "jwt"
    createdAt: string,
    updatedAt: string,
    _id: string,
    __v: number

}