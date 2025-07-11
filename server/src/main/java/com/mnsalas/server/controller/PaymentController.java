package com.mnsalas.server.controller;

import java.util.Map;
import java.util.UUID;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.mnsalas.server.dto.PaymentRequestDTO;

@RestController
@RequestMapping("/api/v1/payment")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {
  private final String BASE_URL = "https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions";
  private final String COMMERCE_CODE = "597055555540";
  private final String API_KEY_SECRET = "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C"; // para pruebas no es necesario

  private final RestTemplate restTemplate = new RestTemplate();

  @PostMapping("create")
  public ResponseEntity<?> create(@RequestBody PaymentRequestDTO req) {
    System.out.println(req);
    String sessionId = UUID.randomUUID().toString();
    String returnUrl = "http://localhost:3000/profile/cart";

    Map<String, Object> payload = Map.of(
      "buy_order", req.getOrderId(),
      "session_id", sessionId,
      "amount", req.getAmount(),
      "return_url", returnUrl
    );

    System.out.println(payload);

    HttpHeaders headers = new HttpHeaders();
    headers.set("Tbk-Api-Key-Id", COMMERCE_CODE);
    headers.set("Tbk-Api-Key-Secret", API_KEY_SECRET);
    headers.setContentType(MediaType.APPLICATION_JSON);

    HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);
    System.out.println(entity);
    ResponseEntity<Map> response = restTemplate.postForEntity(BASE_URL, entity, Map.class);

    return ResponseEntity.ok(response.getBody());
  }

  @PutMapping("commit/{token}")
  public ResponseEntity<?> commit(@PathVariable String token) {
    HttpHeaders headers = new HttpHeaders();
    headers.set("Tbk-Api-Key-Id", COMMERCE_CODE);
    headers.set("Tbk-Api-Key-Secret", API_KEY_SECRET);
    headers.setContentType(MediaType.APPLICATION_JSON);

    HttpEntity<Void> entity = new HttpEntity<>(headers);

    ResponseEntity<Map> response = restTemplate.exchange(
      BASE_URL + "/" + token,
      HttpMethod.PUT,
      entity,
      Map.class
    );

    System.out.println(response);
    return ResponseEntity.ok(response.getBody());
  }
}
/*
 * -> usuario hace click en comprar
 * |
 * |
 * -> endpoint create
 * |
 * |
 * usuario confirma el pago
 * |
 * |
 * -> usuario redirigido a una pagina
 * |
 * |
 * ?
 * -> "http://localhost:3000/profile/cart"; buscar uan forma de confirmar el pago
 * 
 * 
 * 
 */