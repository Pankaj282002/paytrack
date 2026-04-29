package com.paytrack.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class InvoiceDTO {
    private String clientName;
    private String clientEmail;
    private BigDecimal amount;
    private LocalDate dueDate;
    private String status;
    private String currency;
    private BigDecimal advanceAmount;
}