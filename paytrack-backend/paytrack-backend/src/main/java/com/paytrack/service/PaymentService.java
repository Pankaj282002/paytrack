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
        Invoice invoice = payment.getInvoice();

        // Existing payments calculate karo
        List<Payment> existingPayments = paymentRepository.findByInvoiceId(invoice.getId());
        BigDecimal alreadyPaid = existingPayments.stream()
                .map(Payment::getPaidAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal advance = invoice.getAdvanceAmount() != null ? invoice.getAdvanceAmount() : BigDecimal.ZERO;
        BigDecimal totalAlreadyPaid = alreadyPaid.add(advance);
        BigDecimal remaining = invoice.getAmount().subtract(totalAlreadyPaid);

        // Cap payment at remaining amount
        if (payment.getPaidAmount().compareTo(remaining) > 0) {
            payment.setPaidAmount(remaining);
        }

        // remaining is 0 then don't save payment
        if (remaining.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Invoice is already fully paid");
        }

        Payment saved = paymentRepository.save(payment);

        // Recalculate total after save
        BigDecimal newTotal = totalAlreadyPaid.add(saved.getPaidAmount());
        if (newTotal.compareTo(invoice.getAmount()) >= 0) {
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