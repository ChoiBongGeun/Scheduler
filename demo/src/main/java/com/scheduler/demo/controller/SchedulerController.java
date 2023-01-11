package com.scheduler.demo.controller;

import com.scheduler.demo.dto.ApiResult;
import com.scheduler.demo.service.scheduler.SchedulerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/scheduler")
@RequiredArgsConstructor
public class SchedulerController
{
    private final SchedulerService schedulerService;

    @GetMapping
    public ApiResult findAll() { return schedulerService.findAll();}
}
