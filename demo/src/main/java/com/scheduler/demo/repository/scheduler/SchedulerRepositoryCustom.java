package com.scheduler.demo.repository.scheduler;

import java.util.List;

import com.scheduler.demo.dto.scheduler.SchedulerListResponseDto;
import com.scheduler.demo.dto.scheduler.SearchSchedulerRequestDto;

public interface SchedulerRepositoryCustom
{
    List<SchedulerListResponseDto> search(SearchSchedulerRequestDto searchSchedulerRequestDto);
}
