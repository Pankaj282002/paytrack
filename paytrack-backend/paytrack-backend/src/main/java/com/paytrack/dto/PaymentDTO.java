package com.paytrack.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class PaymentDTO {
    private BigDecimal paidAmount;
    private LocalDate paidDate;
    private String paymentMode;
    private String note;
}