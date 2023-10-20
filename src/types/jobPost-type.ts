
export interface IJobPost {
    title: string;
    description: string;
    location: string;
    jobType: string[];
    jobCategory: string;
    workMode: string;
    preferredLanguage: string;
    primarySkills: string[];
    secondarySkills: string[];
    salary: {
        minimum: number;
        maximum: number;
        isDisclosed: boolean;
    };
    preferredExperience: string[];
    companyId: string;
    testQuestions: string;
    __v: number,
    _id: string,
    benefits: string[],
    createdAt: string,

}
