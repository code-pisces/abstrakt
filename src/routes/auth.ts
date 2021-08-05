import { Router } from 'express';
import passport from 'passport';

import { LoginRateLimit, RegisterRateLimit } from '../middleware/rate-limit';
import { postLocalLogin, postLocalSignup, postGoogleAuth } from '../controller/user'
import { googleOAuthAuthenticate } from '../config/googleAuth';

export const router: Router = Router();

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

router.post("/local/login", LoginRateLimit, passport.authenticate("local", { session: false, failWithError: true }), postLocalLogin);

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

router.post("/local/signup", RegisterRateLimit, postLocalSignup);

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

router.post("/google", googleOAuthAuthenticate, postGoogleAuth);