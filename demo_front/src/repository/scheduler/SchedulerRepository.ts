import axios, { AxiosPromise } from "axios";
import { ISchedulerSearchParams } from "../../interface/scheduler/IScheduler";

const COMPANY_API_URL = process.env.REACT_APP_API_URL + 'scheduler/'

export function findAll(params: ISchedulerSearchParams) : AxiosPromise {
    return axios.post(COMPANY_API_URL + 'search', params);
}

export function find(key: string) : AxiosPromise {
    return axios.get(COMPANY_API_URL + key);
}
