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