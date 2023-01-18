package com.scheduler.demo.repository.scheduler;

import java.util.List;

import com.scheduler.demo.dto.scheduler.SchedulerDto;

public interface SchedulerRepositoryCustom
{
    List<SchedulerDto> search(SchedulerDto schedulerDto);
}
