package com.scheduler.demo.controller;

import com.scheduler.demo.dto.ApiResult;
import com.scheduler.demo.dto.scheduler.SchedulerDto;
import com.scheduler.demo.dto.scheduler.SearchSchedulerRequestDto;
import com.scheduler.demo.service.scheduler.SchedulerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/scheduler")
@RequiredArgsConstructor
public class SchedulerController
{
    private final SchedulerService schedulerService;

    @GetMapping
    public ApiResult findAll() { return schedulerService.findAll();}

    @PostMapping
    public ApiResult register(@RequestBody SchedulerDto schedulerDto) { return schedulerService.register(schedulerDto); }

    @GetMapping("{schedulerKey}")
    public ApiResult findOne(@PathVariable int schedulerKey) {return schedulerService.findOne(schedulerKey); }

    @PostMapping("/search")
    public ApiResult search(@RequestBody SearchSchedulerRequestDto searchSchedulerRequestDto) { return schedulerService.search(searchSchedulerRequestDto); }
}
