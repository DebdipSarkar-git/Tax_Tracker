package com.infypp.taxtracker.apigateway.security;

import java.security.Key;
import java.util.Date;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import com.infypp.taxtracker.apigateway.config.JwtConfig;
import com.infypp.taxtracker.apigateway.exception.JwtTokenIncorrectStructureException;
import com.infypp.taxtracker.apigateway.exception.JwtTokenMalformedException;
import com.infypp.taxtracker.apigateway.exception.JwtTokenMissingException;

@Component
public class JwtTokenUtil {

	private final JwtConfig config;

	public JwtTokenUtil(JwtConfig config) {
		this.config = config;
	}

	public String generateToken(String id) {
		Claims claims = Jwts.claims().setSubject(id);
		long nowMillis = System.currentTimeMillis();
		long expMillis = nowMillis + config.getValidity() * 1000 * 60;
		Date exp = new Date(expMillis);
		return Jwts.builder().setClaims(claims).setIssuedAt(new Date(nowMillis)).setExpiration(exp)
				.signWith(SignatureAlgorithm.HS512, config.getSecret()).compact();
	}

	public String validateToken(final String header) throws JwtTokenMalformedException, JwtTokenMissingException {
		try {
			String[] parts = header.split(" ");
			if (parts.length != 2 || !"Bearer".equals(parts[0])) {
				throw new JwtTokenIncorrectStructureException("Incorrect Authentication Structure");
			}
			Claims claims = extractAllClaims(parts[1]);
			isTokenExpired(claims);
			return claims.getSubject();
		} catch (SignatureException ex) {
			throw new JwtTokenMalformedException("Invalid JWT signature");
		} catch (MalformedJwtException ex) {
			throw new JwtTokenMalformedException("Invalid JWT token");
		} catch (ExpiredJwtException ex) {
			throw new JwtTokenMalformedException("Expired JWT token");
		} catch (UnsupportedJwtException ex) {
			throw new JwtTokenMalformedException("Unsupported JWT token");
		} catch (IllegalArgumentException ex) {
			throw new JwtTokenMissingException("JWT claims string is empty.");
		}
	}

	private void isTokenExpired(Claims claims) throws JwtTokenMalformedException {
		Date date = claims.getExpiration();
        if(date.before(new Date())) {
			throw new JwtTokenMalformedException("Expired JWT token");
		}
    }

	public Claims extractAllClaims(String token) {
        return Jwts
		.parserBuilder()
		.setSigningKey(getSignInKey())
		.build()
		.parseClaimsJws(token)
		.getBody();
    }

	private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(config.getSecret());
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
