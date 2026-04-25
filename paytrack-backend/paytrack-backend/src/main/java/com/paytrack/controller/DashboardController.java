package com.paytrack.controller;

import com.paytrack.model.Invoice;
import com.paytrack.model.User;
import com.paytrack.repository.UserRepository;
import com.paytrack.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final InvoiceService invoiceService;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getSummary(Authentication auth) {
        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Invoice> invoices = invoiceService.getAllByUser(user.getId());

        long totalInvoices = invoices.size();

        BigDecimal totalPaid = invoices.stream()
                .filter(i -> i.getStatus() == Invoice.Status.PAID)
                .map(Invoice::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalPending = invoices.stream()
                .filter(i -> i.getStatus() == Invoice.Status.PENDING)
                .map(Invoice::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalOverdue = invoices.stream()
                .filter(i -> i.getStatus() == Invoice.Status.OVERDUE)
                .map(Invoice::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        List<Invoice> recentInvoices = invoices.stream()
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .limit(5)
                .collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("totalInvoices", totalInvoices);
        response.put("totalPaid", totalPaid);
        response.put("totalPending", totalPending);
        response.put("totalOverdue", totalOverdue);
        response.put("recentInvoices", recentInvoices);

        return ResponseEntity.ok(response);
    }
}