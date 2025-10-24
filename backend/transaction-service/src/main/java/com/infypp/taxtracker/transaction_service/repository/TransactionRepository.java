package com.infypp.taxtracker.transaction_service.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.infypp.taxtracker.transaction_service.entity.Transaction;


@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    Page<Transaction> findByDateBetween(LocalDate startDate, LocalDate endDate, Pageable pageable);

    List<Transaction> findByUserId(Long userId);
}
