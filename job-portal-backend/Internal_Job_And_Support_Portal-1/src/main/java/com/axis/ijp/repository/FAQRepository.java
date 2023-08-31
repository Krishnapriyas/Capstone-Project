package com.axis.ijp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.axis.ijp.entity.FAQ;

public interface FAQRepository extends JpaRepository<FAQ, Long> {

    // List<FAQ> findByKeywordsIn(String[] keywords);

    // List<FAQ> findByQuestionContainingIgnoreCase(String keyword);

    @Query("SELECT f FROM FAQ f WHERE LOWER(f.question) LIKE %:keyword%")
    List<FAQ> findByKeywordInQuestionIgnoreCase(String keyword);

}
