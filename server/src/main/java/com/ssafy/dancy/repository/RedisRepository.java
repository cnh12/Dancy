package com.ssafy.dancy.repository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
@Slf4j
public class RedisRepository {

    private final RedisTemplate<Object, Object> redisTemplate;

    private static final String EMAIL_VERIFY_PREFIX = "VERIFY";

    public String saveEmailVerifyCode(String targetEmail, String code, int timeLimit){
        String key = String.format("%s:%s", EMAIL_VERIFY_PREFIX, targetEmail);
        return saveKeyValue(key, code, timeLimit);
    }

    public String saveKeyValue(String key, String value, int limitMinute){
        ValueOperations<Object, Object> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(key, value, limitMinute, TimeUnit.MINUTES);
        log.info("key: {}, value: {} 로 {} 분간 redis 저장", key, value, limitMinute);

        return String.format("%s -> %s", key, value);
    }
}