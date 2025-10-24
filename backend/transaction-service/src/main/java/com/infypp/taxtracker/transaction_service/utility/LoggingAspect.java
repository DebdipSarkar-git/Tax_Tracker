package com.infypp.taxtracker.transaction_service.utility;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import com.infypp.taxtracker.transaction_service.exception.TransactionException;

@Aspect
@Component
public class LoggingAspect {

	private static final Logger LOGGER = LogManager.getLogger(LoggingAspect.class);
	@AfterThrowing(pointcut="execution(*  com.infypp.taxtracker.transaction_service.service.*Impl.*(..))", throwing="exception")
	public void logServiceException(TransactionException exception) {
		LOGGER.error(exception.getMessage(), exception);
	}

}