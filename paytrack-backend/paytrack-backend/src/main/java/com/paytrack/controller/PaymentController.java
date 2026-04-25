package com.paytrack.controller;

import com.paytrack.dto.PaymentDTO;
import com.paytrack.model.Invoice;
import com.paytrack.model.Payment;
import com.paytrack.service.InvoiceService;
import com.paytrack.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices/{invoiceId}/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;
    private final InvoiceService invoiceService;

    @GetMapping
    public ResponseEntity<List<Payment>> getAll(@PathVariable Long invoiceId) {
        return ResponseEntity.ok(paymentService.getAllByInvoice(invoiceId));
    }

    @PostMapping
    public ResponseEntity<Payment> add(@PathVariable Long invoiceId,
                                       @RequestBody PaymentDTO dto) {
        Invoice invoice = invoiceService.getById(invoiceId);
        Payment payment = new Payment();
        payment.setInvoice(invoice);
        payment.setPaidAmount(dto.getPaidAmount());
        payment.setPaidDate(dto.getPaidDate());
        payment.setPaymentMode(Payment.PaymentMode.valueOf(dto.getPaymentMode()));
        payment.setNote(dto.getNote());
        return ResponseEntity.ok(paymentService.add(payment));
    }
}