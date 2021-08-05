import rateLimit from 'express-rate-limit';

const MaxRequestPerHour = 2000;
const MaxTryLoginForFiveMinutes = 5;
const MaxTryRegisterForFiveMinutes = 5;

export const GeneralRateLimit = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: MaxRequestPerHour
});

export const LoginRateLimit = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: MaxTryLoginForFiveMinutes
});

export const RegisterRateLimit = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: MaxTryRegisterForFiveMinutes
});