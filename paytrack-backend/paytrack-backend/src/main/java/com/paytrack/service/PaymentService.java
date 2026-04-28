package com.paytrack.service;

import com.paytrack.model.Invoice;
import com.paytrack.model.Payment;
import com.paytrack.repository.InvoiceRepository;
import com.paytrack.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final InvoiceRepository invoiceRepository;

    public Payment add(Payment payment) {
        Payment saved = paymentRepository.save(payment);

        // Auto status update
        Invoice invoice = payment.getInvoice();
        List<Payment> payments = paymentRepository.findByInvoiceId(invoice.getId());

        BigDecimal totalPaid = payments.stream()
                .map(Payment::getPaidAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        if (totalPaid.compareTo(invoice.getAmount()) >= 0) {
            invoice.setStatus(Invoice.Status.PAID);
        } else {
            invoice.setStatus(Invoice.Status.PENDING);
        }

        invoiceRepository.save(invoice);
        return saved;
    }

    public List<Payment> getAllByInvoice(Long invoiceId) {
        return paymentRepository.findByInvoiceId(invoiceId);
    }
}