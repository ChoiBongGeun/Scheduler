import { AxiosResponse } from "axios";
import { action, makeObservable } from "mobx";

import SchedulerStore from "./scheduler/SchedulerStore";

class RootStore implements IRootStore {
    schedulerStore: SchedulerStore;
    
    constructor(){
        makeObservable(this, {
            handleResponse : action,
            handleError:action
        }, { autoBind : true });
        this.schedulerStore = new SchedulerStore(this);
    }

    handleResponse(result: any) {
        return result.data;
    }

    handleError(error: any) {
        alert(error);
    }

}
export interface IRootStore {
    handleResponse(response: AxiosResponse): any;
    handleError(error: any): any;
    schedulerStore : SchedulerStore;
}

export default new RootStore();

