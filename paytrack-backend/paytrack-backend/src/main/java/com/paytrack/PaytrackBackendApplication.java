package com.paytrack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PaytrackBackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(PaytrackBackendApplication.class, args);
	}
}