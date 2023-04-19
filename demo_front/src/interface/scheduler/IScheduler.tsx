export interface IScheduler{
    schedulerContent : string,
    schedulerDate : string,
    schedulerEndTime: string,
    schedulerKey : number,
    schedulerRepetition :string,
    schedulerStartTime : string,
    schedulerTitle : string
    }

export interface ISchedulerSearchParams{
        schedulerContent? : string,
        schedulerDate? : string,
        schedulerEndTime? : string,
        schedulerRepetition? : string,        
        schedulerStartTime? : string,
        schedulerTitle? : string
        }