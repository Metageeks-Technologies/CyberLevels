import { IJobPost } from "./jobPost-type";
import { ICandidate } from "./user-type";

export interface IJobApp {
    candidate: string | ICandidate,
    jobPost: string | IJobPost,
    status: string,
    __v: number,
    _id: string,
    createdAt: string,
    updatedAt: string,
}

export interface IChatMessage {
    role: 'candidate' | 'employer';
    userId: string;
    text: string;
    timestamp: Date;
    _id?: string;
}
export interface IChat {
    _id: string
    jobApp: string;
    participants: [string, string];
    messages: IChatMessage[];
}
