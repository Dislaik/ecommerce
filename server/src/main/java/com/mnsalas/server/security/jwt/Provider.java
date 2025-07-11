package com.mnsalas.server.security.jwt;

import com.mnsalas.server.security.service.UserDetailsImpl;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class Provider {
  private final static Logger LOGGER = LoggerFactory.getLogger(Provider.class);

  @Value("${jwt.secret}")
  private String SECRET;
  @Value("${jwt.expiration}")
  private Integer EXPIRATION;

  private SecretKey getSecretKey() {
    return Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8)); // Para HS256
  }

  public String generateToken(Authentication authentication) {
    UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

    return Jwts.builder()
      .subject((userPrincipal.getUsername()))
      .claim("username", userPrincipal.getUsername())
      .claim("email", userPrincipal.getEmail())
      .issuedAt(new Date())
      .expiration(new Date(System.currentTimeMillis() + (24 * 60 * 60 * 1000))) // 1 Hora
      .signWith(getSecretKey())
      .compact();
  }

  public String getUserNameFromJwtToken(String token) {
    return Jwts.parser()
            .verifyWith(getSecretKey()) // nueva forma
            .build()
            .parseSignedClaims(token) // parsea y verifica firma
            .getPayload()
            .getSubject();
  }

  public boolean validateJwtToken(String authToken) {
    try {
      Jwts.parser().verifyWith(getSecretKey()).build().parse(authToken);
      return true;
    } catch (MalformedJwtException e) {
      LOGGER.error("Invalid JWT token: {}", e.getMessage());
    } catch (ExpiredJwtException e) {
      LOGGER.error("JWT token is expired: {}", e.getMessage());
    } catch (UnsupportedJwtException e) {
      LOGGER.error("JWT token is unsupported: {}", e.getMessage());
    } catch (IllegalArgumentException e) {
      LOGGER.error("JWT claims string is empty: {}", e.getMessage());
    }

    return false;
  }
}
