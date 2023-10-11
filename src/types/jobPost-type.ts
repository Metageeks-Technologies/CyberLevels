
export interface IJobPost {
    title: string;
    description: string;
    location: string;
    jobType: 'full-time' | 'part-time' | 'internship' | 'hourly-contract' | 'fixed-price';
    jobCategory?: string;
    skillsRequired: string[];
    salary: {
        minimum: string;
        maximum: string;
        isDisclosed: boolean;
    };
    preferredExperience: string;
    companyId?: string
    fileAttachment?: {
        data: Buffer;
        contentType: string;
    };
}
