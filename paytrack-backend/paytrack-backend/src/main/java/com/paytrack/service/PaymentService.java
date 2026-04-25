package com.paytrack.service;

import com.paytrack.model.Payment;
import com.paytrack.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public Payment add(Payment payment) {
        return paymentRepository.save(payment);
    }

    public List<Payment> getAllByInvoice(Long invoiceId) {
        return paymentRepository.findByInvoiceId(invoiceId);
    }
}