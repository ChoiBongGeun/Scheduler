package com.scheduler.demo.repository.scheduler;

import org.springframework.data.jpa.repository.JpaRepository;
import com.scheduler.demo.jpo.Scheduler;

public interface SchedulerRepository extends JpaRepository<Scheduler, Integer>, SchedulerRepositoryCustom {

}
