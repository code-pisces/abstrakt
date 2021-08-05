"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const rate_limit_1 = require("../middleware/rate-limit");
const user_1 = require("../controller/user");
const googleAuth_1 = require("../config/googleAuth");
exports.router = express_1.Router();
/**
 * Authentication routes, Google OAuth and Local
 */
/**
 * Usuário Local
 * @typedef {object} UserLocal
 * @property {string} name - Nome do usuário
 * @property {string} email.required - Email do usuário
 * @property {string} password.required - Senha do usuário. (Criptografada com BCrypt)
 */
/**
 * Usuário Google
 * @typedef {object} UserGoogle
 * @property {string} token - Token obtido com a autenticação do google
 */
/**
 * POST /auth/local/login
 * @summary Realizar um login usando email e senha e obtendo um token jwt de acesso
 * @tags auth
 * @param {UserLocal} request.body.required - Campos necessários para entrar
 * @return {object} 200 - Resposta de Sucesso - application/json
 * @return {object} 400 - Campos inválidos - application/json
 *
 * @example response - 200 - Padrão
 * {
 *     "status": 200,
 *     "message": "",
 *     "data": {
 *          "accessToken": "token"
 *     }
 * }
 *
 * @example response - 400 - Campos inválidos
 * {
 *     "status": 400,
 *     "message": "Credenciais inválidas"
 * }
 */
exports.router.post("/local/login", rate_limit_1.LoginRateLimit, passport_1.default.authenticate("local", { session: false, failWithError: true }), user_1.postLocalLogin);
/**
 * POST /auth/local/signup
 * @summary Cadastra um usuário com email e senha e retorna um token de autenticação
 * @tags auth
 * @param {UserLocal} request.body.required - Campos necessários para cadastrar
 * @return {object} 201 - Resposta de Sucesso - application/json
 * @return {object} 400 - Resposta de Erro - application/json
 *
 * @example response - 201 - Padrão
 * {
 *     "status": 201,
 *     "message": "Usuário criado com sucesso",
 *     "data": {
 *          "accessToken": "token"
 *     }
 * }
 *
 * @example response - 400 - Usuário já existe
 * {
 *     "status": 400,
 *     "message": "Email já cadastrado"
 * }
 *
 * @example response - 400 - Campos inválidos
 * {
 *     "status": 400,
 *     "message": "'email' é obrigatório e precisa ser um email válido"
 * }
 */
exports.router.post("/local/signup", rate_limit_1.RegisterRateLimit, user_1.postLocalSignup);
/**
 * POST /auth/google
 * @summary Cadastra ou Entra através de um token gerado pelo google, retornando um token para autenticação
 * @tags auth
 * @param {UserGoogle} request.body.required - Campos necessários para cadastrar ou entrar
 * @return {object} 201 - Resposta de Sucesso - application/json
 * @return {object} 400 - Resposta de Erro - application/json
 *
 * @example response - 201 - Padrão
 * {
 *     "status": 201,
 *     "message": "Usuário criado com sucesso",
 *     "data": {
 *          "accessToken": "token"
 *     }
 * }
 *
 * @example response - 400 - Usuário já existe
 * {
 *     "status": 400,
 *     "message": "Email já cadastrado"
 * }
 *
 * @example response - 400 - Token Inválido
 * {
 *     "status": 400,
 *     "message": "Token inválido"
 * }
 */
exports.router.post("/google", googleAuth_1.googleOAuthAuthenticate, user_1.postGoogleAuth);
