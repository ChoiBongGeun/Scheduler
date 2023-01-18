package com.scheduler.demo.repository.scheduler;

import static com.scheduler.demo.jpo.QScheduler.scheduler;
import static org.springframework.util.StringUtils.hasText;

import java.util.List;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.scheduler.demo.dto.scheduler.SchedulerDto;
import com.querydsl.core.types.dsl.BooleanExpression;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class SchedulerRepostioryCustomImpl implements SchedulerRepositoryCustom
{
    private final JPAQueryFactory query;

    @Override
    public List<SchedulerDto> search(SchedulerDto schedulerDto)
    {
        return query.select(Projections.bean(SchedulerDto.class,
                scheduler.schedulerKey,
                scheduler.schedulerTitle,
                scheduler.schedulerContent,
                scheduler.schedulerDate,
                scheduler.schedulerRepetition,
                scheduler.schedulerStartTime,
                scheduler.schedulerEndTime))
            .from(scheduler)
            .where(
                schedulerTitleContain(schedulerDto.getSchedulerTitle()),
                schedulerContentContain(schedulerDto.getSchedulerContent()),
                schedulerDateContain(schedulerDto.getSchedulerDate()),
                schedulerRepetitionContain(schedulerDto.getSchedulerRepetition()),
                schedulerStartTimeContain(schedulerDto.getSchedulerStartTime()),
                schedulerEndTimeContain(schedulerDto.getSchedulerEndTime())
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
