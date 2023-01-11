package com.scheduler.demo.dto.scheduler;

import javax.persistence.Column;

import com.scheduler.demo.jpo.Scheduler;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SchedulerDto
{
    private int schedulerKey;
    private String schedulerTitle;
    private String schedulerContent;
    private String shcedulerStartTime;
    private String schedulerRepetition;
    private String schedulerEndTime;
    private String schedulerDate;

    @Builder(builderMethodName = "SchedulerDto")
    SchedulerDto(Scheduler scheduler)
    {
        this.schedulerKey = scheduler.getSchedulerKey();
        this.schedulerTitle = scheduler.getSchedulerTitle();
        this.schedulerContent = scheduler.getSchedulerContent();
        this.shcedulerStartTime = scheduler.getShcedulerStartTime();
        this.schedulerEndTime = scheduler.getSchedulerEndTime();
        this.schedulerRepetition = scheduler.getSchedulerRepetition();
        this.schedulerDate = scheduler.getSchedulerDate();
    }
}
