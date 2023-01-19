package com.scheduler.demo.dto.scheduler;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SearchSchedulerRequestDto
{
    private String schedulerTitle;
    private String schedulerContent;
    private String schedulerStartTime;
    private String schedulerRepetition;
    private String schedulerEndTime;
    private String schedulerDate;
}
