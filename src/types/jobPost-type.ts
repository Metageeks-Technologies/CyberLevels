import { ICompany } from "./company";
import { IEmployer } from "./user-type";

export interface IJobPost {
    title: string;
    description: string;
    location: string[];
    jobType: string[];
    benefits: string[];
    jobCategory: string;
    workMode: string[];
    preferredLanguage: string;
    primarySkills: string[];
    secondarySkills: string[];
    joiningTime: String,
    salary: {
        minimum: number;
        maximum: number;
        isDisclosed: boolean;
        currency: {
            abbreviation: string;
            name: string;
            symbol: string;
        }
        period: "monthly" | "yearly" | "weekly" | "hourly";
    };
    preferredExperience: string[];
    workHours: string;
    preferredQualification: string;
    companyId: string | ICompany;
    employerId: string | IEmployer;
    candidates: string[];
    status: "active" | "expired",
    testQuestions: string;
    __v: number,
    _id: string,
    createdAt: string,
    isSaved?: boolean,
    matchScore?: number;
}
