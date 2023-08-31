package com.axis.ijp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.axis.ijp.dto.FAQDTO;
import com.axis.ijp.entity.FAQ;
import com.axis.ijp.service.impl.FAQServiceImpl;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/faqs")
public class FAQController {

	@Autowired
    private FAQServiceImpl faqService;

    /**
     * Get all FAQs.
     * Author: Krishnapriya S
     */
    @GetMapping("/all-faqs")
    public ResponseEntity<List<FAQ>> getAllFAQs() {
        List<FAQ> faqs = faqService.getAllFAQs();
        return ResponseEntity.ok(faqs);
    }
    
    /**
     * Create a new FAQ.
     * Author: Krishnapriya S
     */
    @PostMapping("/create-faqs")
    public ResponseEntity<FAQ> createFAQ(@RequestBody FAQDTO faq) {
        FAQ savedFAQ = faqService.saveFAQ(faq.getQuestion(),faq.getAnswer());
        return ResponseEntity.ok(savedFAQ);
    }
}
