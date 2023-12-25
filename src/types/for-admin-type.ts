import type { ILocation } from "./company";

export interface ICandidateForAdmin {
    _id: string,
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    phoneNumber: string;
    avatar: string;
}

export interface IEmployerForAdmin {
    _id: string,
    email: string;
    firstName: string;
    lastName: string;
    gender?: string;
    phoneNumber: string;
    avatar: string;
    company?: {
        name: string;
        companyId: string;
    };
}


export interface ICompanyForAdmin {
    _id: string,
    email: string;
    founderName: string;
    contactNumber: string;
    logo: string;
    teamSize: string;
    location: ILocation[];
}