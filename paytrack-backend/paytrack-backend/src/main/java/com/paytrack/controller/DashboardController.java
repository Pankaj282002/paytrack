package com.paytrack.controller;

import com.paytrack.model.Invoice;
import com.paytrack.model.Payment;
import com.paytrack.model.User;
import com.paytrack.repository.PaymentRepository;
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
    private final PaymentRepository paymentRepository;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getSummary(Authentication auth) {
        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Invoice> invoices = invoiceService.getAllByUser(user.getId());

        long totalInvoices = invoices.size();

        // Actual paid amount — sum of all payments across all invoices
        BigDecimal totalPaid = BigDecimal.ZERO;
        BigDecimal totalPending = BigDecimal.ZERO;
        BigDecimal totalOverdue = BigDecimal.ZERO;

        for (Invoice invoice : invoices) {
            List<Payment> payments = paymentRepository.findByInvoiceId(invoice.getId());

            BigDecimal invoicePaid = payments.stream()
                    .map(Payment::getPaidAmount)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            BigDecimal advance = invoice.getAdvanceAmount() != null ? invoice.getAdvanceAmount() : BigDecimal.ZERO;
            BigDecimal totalInvoicePaid = invoicePaid.add(advance);

            BigDecimal invoiceRemaining = invoice.getAmount().subtract(totalInvoicePaid);
            if (invoiceRemaining.compareTo(BigDecimal.ZERO) < 0) {
                invoiceRemaining = BigDecimal.ZERO;
            }

            totalPaid = totalPaid.add(totalInvoicePaid);

            if (invoice.getStatus() == Invoice.Status.OVERDUE) {
                totalOverdue = totalOverdue.add(invoiceRemaining);
            } else if (invoice.getStatus() == Invoice.Status.PENDING) {
                totalPending = totalPending.add(invoiceRemaining);
            }
        }

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