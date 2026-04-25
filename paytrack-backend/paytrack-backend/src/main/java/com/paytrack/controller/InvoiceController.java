package com.paytrack.controller;

import com.paytrack.model.Invoice;
import com.paytrack.model.User;
import com.paytrack.repository.UserRepository;
import com.paytrack.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService invoiceService;
    private final UserRepository userRepository;

    private User getUser(Authentication auth) {
        return userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping
    public ResponseEntity<List<Invoice>> getAll(Authentication auth) {
        User user = getUser(auth);
        return ResponseEntity.ok(invoiceService.getAllByUser(user.getId()));
    }

    @PostMapping
    public ResponseEntity<Invoice> create(@RequestBody Invoice invoice,
                                          Authentication auth) {
        User user = getUser(auth);
        invoice.setUser(user);
        return ResponseEntity.ok(invoiceService.create(invoice));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Invoice> getById(@PathVariable Long id) {
        return ResponseEntity.ok(invoiceService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Invoice> update(@PathVariable Long id,
                                          @RequestBody Invoice invoice) {
        return ResponseEntity.ok(invoiceService.update(id, invoice));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        invoiceService.delete(id);
        return ResponseEntity.ok("Invoice deleted successfully");
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Invoice> updateStatus(@PathVariable Long id,
                                                @RequestBody Invoice invoice) {
        Invoice existing = invoiceService.getById(id);
        existing.setStatus(invoice.getStatus());
        return ResponseEntity.ok(invoiceService.update(id, existing));
    }
}