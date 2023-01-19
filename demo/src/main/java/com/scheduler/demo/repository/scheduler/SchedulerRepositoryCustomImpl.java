package com.scheduler.demo.repository.scheduler;

import static com.scheduler.demo.jpo.QScheduler.scheduler;
import static org.springframework.util.StringUtils.hasText;

import java.util.List;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.scheduler.demo.dto.scheduler.SchedulerListResponseDto;
import com.scheduler.demo.dto.scheduler.SearchSchedulerRequestDto;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class SchedulerRepositoryCustomImpl implements SchedulerRepositoryCustom
{
    private final JPAQueryFactory query;

    @Override
    public List<SchedulerListResponseDto> search(SearchSchedulerRequestDto searchSchedulerRequestDto)
    {
        return query.select(Projections.bean(SchedulerListResponseDto.class,
                scheduler.schedulerKey,
                scheduler.schedulerTitle,
                scheduler.schedulerContent,
                scheduler.schedulerDate,
                scheduler.schedulerRepetition,
                scheduler.schedulerStartTime,
                scheduler.schedulerEndTime))
            .from(scheduler)
            .where(
                schedulerTitleContain(searchSchedulerRequestDto.getSchedulerTitle()),
                schedulerContentContain(searchSchedulerRequestDto.getSchedulerContent()),
                schedulerDateContain(searchSchedulerRequestDto.getSchedulerDate()),
                schedulerRepetitionContain(searchSchedulerRequestDto.getSchedulerRepetition()),
                schedulerStartTimeContain(searchSchedulerRequestDto.getSchedulerStartTime()),
                schedulerEndTimeContain(searchSchedulerRequestDto.getSchedulerEndTime())
            )
            .orderBy(scheduler.schedulerKey.desc())
            .fetch();
    }

    private BooleanExpression schedulerTitleContain(String schedulerTitle)
    {
        return hasText(schedulerTitle) ? scheduler.schedulerTitle.containsIgnoreCase(schedulerTitle) : null ;
    }
    private BooleanExpression schedulerContentContain(String schedulerContent)
    {
        return hasText(schedulerContent) ? scheduler.schedulerContent.containsIgnoreCase(schedulerContent) : null ;
    }
    private BooleanExpression schedulerDateContain(String schedulerDate)
    {
        return hasText(schedulerDate) ? scheduler.schedulerDate.containsIgnoreCase(schedulerDate) : null ;
    }
    private BooleanExpression schedulerRepetitionContain(String schedulerRepetition)
    {
        return hasText(schedulerRepetition) ? scheduler.schedulerRepetition.containsIgnoreCase(schedulerRepetition) : null ;
    }
    private BooleanExpression schedulerStartTimeContain(String schedulerStartTime)
    {
        return hasText(schedulerStartTime) ? scheduler.schedulerStartTime.containsIgnoreCase(schedulerStartTime) : null ;
    }
    private com.querydsl.core.types.dsl.BooleanExpression schedulerEndTimeContain(String schedulerEndTime)
    {
        return hasText(schedulerEndTime) ? scheduler.schedulerEndTime.containsIgnoreCase(schedulerEndTime) : null ;
    }
}
