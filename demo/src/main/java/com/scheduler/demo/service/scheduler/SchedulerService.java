package com.scheduler.demo.service.scheduler;

import java.lang.invoke.MethodHandles;
import java.util.List;
import java.util.stream.Collectors;

import com.scheduler.demo.dto.ApiResult;
import com.scheduler.demo.dto.scheduler.SchedulerDto;
import com.scheduler.demo.jpo.Scheduler;
import com.scheduler.demo.store.scheduler.SchedulerStore;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SchedulerService
{
    private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

    private final SchedulerStore schedulerStore;

    public ApiResult findAll()
    {
        ApiResult apiResult = new ApiResult();

        try {
            List<SchedulerDto> schedulerList = schedulerStore.findAll()
                .stream()
                .map(Scheduler::toResponseDto)
                .collect(Collectors.toList());

            apiResult.setData(schedulerList);
            apiResult.setSuccess();
        }
        catch (Exception e)
        {
            logger.error("########## [driver error] msg: {}, cause: {}", e.getMessage(), e.getCause());
            apiResult.setFail();
        }
        return apiResult;
    }
}
