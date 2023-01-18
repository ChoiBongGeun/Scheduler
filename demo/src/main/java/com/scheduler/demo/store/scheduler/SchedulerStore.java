package com.scheduler.demo.store.scheduler;

import java.util.List;
import java.util.NoSuchElementException;

import com.scheduler.demo.dto.scheduler.SchedulerDto;
import com.scheduler.demo.jpo.Scheduler;
import com.scheduler.demo.repository.scheduler.SchedulerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class SchedulerStore
{
    private final SchedulerRepository schedulerRepository;

    public List<Scheduler> findAll() {return schedulerRepository.findAll(Sort.by(Sort.Direction.DESC,"schedulerKey"));}

    public Scheduler findOne(int schedulerKey)
    {
        return schedulerRepository.findById(schedulerKey).orElseThrow(() -> new NoSuchElementException("schedulerKey not found"));
    }
    public void save(Scheduler scheduler) {
        schedulerRepository.save(scheduler);
    }

    public List<SchedulerDto> search(SchedulerDto schedulerDto)
    {
        return schedulerRepository.search(schedulerDto);
    }

}
