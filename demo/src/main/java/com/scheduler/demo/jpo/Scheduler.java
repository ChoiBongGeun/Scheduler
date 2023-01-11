package com.scheduler.demo.jpo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.scheduler.demo.dto.scheduler.SchedulerDto;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Entity
@Getter
@RequiredArgsConstructor
@Table(name = "scheuler")
public class Scheduler
{
    @Id
    @Column(name = "scheduler_key")
    private int schedulerKey;

    @Column(name = "scheduler_title")
    private String schedulerTitle;

    @Column(name = "scheduler_content")
    private String schedulerContent;

    @Column(name = "scheduler_start_time")
    private String shcedulerStartTime;

    @Column(name = "scheduler_repetition")
    private String schedulerRepetition;

    @Column(name = "scheduler_end_time")
    private String schedulerEndTime;

    @Column(name = "scheduler_date")
    private String schedulerDate;

    public SchedulerDto toResponseDto(){
        return SchedulerDto.SchedulerDto()
            .scheduler(this).build();
    }

}
