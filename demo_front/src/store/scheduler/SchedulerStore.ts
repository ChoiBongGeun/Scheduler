import { makeAutoObservable } from "mobx";
import { IScheduler,ISchedulerSearchParams } from "../../interface/scheduler/IScheduler";
import * as SchedulerRepository from '../../repository/scheduler/SchedulerRepository';
import { IRootStore } from "../RootStore";

const defaultSchedulerListFilter: ISchedulerSearchParams = {
    schedulerContent : '',
    schedulerDate : '',
    schedulerEndTime : '',
    schedulerRepetition : '',        
    schedulerStartTime : '',
    schedulerTitle : ''

};
class SchedulerStore implements ISchedulerStore {
    rootStore: IRootStore;
    schedulerList: IScheduler[] = [];
    filter = defaultSchedulerListFilter;

    constructor(rootStore:IRootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    *findAll(): any {
        try {
            const result = yield SchedulerRepository.findAll(this.filter);
            this.schedulerList = result.data.data;
        } catch(error) {
            this.rootStore.handleError(error);
        }
    }

    *find(key: string): any {
        try {
            const result = yield SchedulerRepository.find(key);
            return result.data.data;
        } catch(error) {
            this.rootStore.handleError(error);
        }
    }

    *search(newFilter?: ISchedulerSearchParams): any {
        try {
            this.schedulerList = [];
            this.setFilter(newFilter || this.filter);
            yield this.findAll();
        } catch(error) {
            this.rootStore.handleError(error);
        }
    }

    reset(): void {
        this.schedulerList = [];
    }

    getCompany(schedulerKey: number): IScheduler | undefined {
        return this.schedulerList.find((a) => a.schedulerKey === schedulerKey);
    }

    setFilter(newFilter: ISchedulerSearchParams): void {
        this.filter = { ...this.filter, ...newFilter };
    }
}

export interface ISchedulerStore {
    schedulerList: IScheduler[];
    filter: ISchedulerSearchParams;
    findAll(): any;
    find(key: string): any;
    search(params: ISchedulerSearchParams): any;
    getCompany(key: number): any;
    setFilter(filter: ISchedulerSearchParams): void;
}

export default SchedulerStore;