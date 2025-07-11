package com.mnsalas.server.dto;

public class PaymentRequestDTO {
  private String orderId;
  private double amount;

  public PaymentRequestDTO() {}

  public PaymentRequestDTO(double amount) {
    this.amount = amount;
  }

  public void setOrderId(String orderId) {
    this.orderId = orderId;
  }

  public String getOrderId()  {
    return this.orderId;
  }

  public void setAmount(double amount) {
    this.amount = amount;
  }

  public double getAmount() {
    return this.amount;
  }
}