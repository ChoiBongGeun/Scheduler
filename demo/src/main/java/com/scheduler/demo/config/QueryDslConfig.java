package com.scheduler.demo.config;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class QueryDslConfig
{
    @PersistenceContext
    private EntityManager em;

    @Bean
    public JPAQueryFactory initJPAQueryFactory(){
        return new JPAQueryFactory(em);
    }
}
