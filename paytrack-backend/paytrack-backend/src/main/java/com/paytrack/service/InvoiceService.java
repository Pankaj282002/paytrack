package com.paytrack.service;

import com.paytrack.model.Invoice;
import com.paytrack.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;

    public Invoice create(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    public List<Invoice> getAllByUser(Long userId) {
        return invoiceRepository.findByUserId(userId);
    }

    public Invoice getById(Long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));
    }

    public Invoice update(Long id, Invoice updated) {
        Invoice existing = getById(id);
        existing.setClientName(updated.getClientName());
        existing.setClientEmail(updated.getClientEmail());
        existing.setAmount(updated.getAmount());
        existing.setDueDate(updated.getDueDate());
        existing.setStatus(updated.getStatus());
        return invoiceRepository.save(existing);
    }

    public void delete(Long id) {
        invoiceRepository.deleteById(id);
    }
}