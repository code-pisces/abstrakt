"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const record_1 = require("../controller/record");
exports.router = express_1.Router();
/**
 * API records routes.
 */
/**
 * Uma record representa um registro feito pelo usuário
 * @typedef {object} Record
 * @property {string} date.required - Data do registro, no formato DD-MM-YYYY hh:mm:ss
 * @property {string} thought.required - Pensamento
 * @property {number} thought_believe.required - O quanto a pessoa acredita no pensamento
 * @property {array<EmotionFeel>} thought_emotions.required - Array contendo a lista de sentimentos
 * @property {string} answer.required - Resposta racional
 * @property {number} answer_believe.required - O quanto a pessoa acredita no pensamento após a resposta racional
 * @property {array<EmotionFeel>} answer_emotions.required - Array contendo a lista de sentimentos
 * @property {string} action.required - Ação a ser tomada
 */
/**
 * Representa um elemento contendo a emoção e a porcentagem de sentimento
 * @typedef {object} EmotionFeel
 * @property {string} emotion.required - Id da emoção referente
 * @property {number} feel.required - Número de 0 a 100 representando a porcentagem
 */
/**
 * GET /api/emotions
 * @summary Retorna as informações de um registro específico
 * @tags records
 * @param {number} page.query - Seleciona a página requerida
 * @param {number} limit.query - Limita a quantidade de elementos a ser retornado. Max 20
 * @param {number} sort.query - Ordena os elementos pela data de criação. 'asc' ou 'desc'
 * @param {boolean} timestamps.query - Adiciona os campos de createdAt e updatedAt
 * @param {boolean} populate.query - Popula os campos emotion adicionando name e _id
 * @return {object} 200 - Resposta de Sucesso - application/json
 * @return {object} 400 - Mensagem de Erro - application/json
 * @return {object} 401 - Sem autenticação - application/json
 *
 * @example response - 200 - Padrão
 * {
 *     "status": 200,
 *     "message": "",
 *       "data": [{
 *           "_id": "60e79cc7907eb226ab86dc9e",
 *           "date": "2021-07-08T00:10:30.000Z",
 *           "thought": "Teste",
 *           "thought_believe": 50,
 *           "thought_emotions": [
 *               {
 *                   "emotion": "60e624faafbaba0fab8f6e8c",
 *                   "feel": 68
 *               }
 *           ],
 *           "answer": "Teste",
 *           "answer_believe": 10,
 *           "answer_emotions": [
 *               {
 *                   "emotion": "60e624faafbaba0fab8f6e8c",
 *                   "feel": 10
 *               }
 *           ],
 *           "action": "Teste"
 *       }]
 * }
 * @example response - 200 - Com timestamps
 * {
 *     "status": 200,
 *     "message": "",
 *       "data": [{
 *           "_id": "60e79cc7907eb226ab86dc9e",
 *           "date": "2021-07-08T00:10:30.000Z",
 *           "thought": "Teste",
 *           "thought_believe": 50,
 *           "thought_emotions": [
 *               {
 *                   "emotion": "60e624faafbaba0fab8f6e8c",
 *                   "feel": 68
 *               }
 *           ],
 *           "answer": "Teste",
 *           "answer_believe": 10,
 *           "answer_emotions": [
 *               {
 *                   "emotion": "60e624faafbaba0fab8f6e8c",
 *                   "feel": 10
 *               }
 *           ],
 *           "action": "Teste",
 *           "createdAt": "2021-07-09T00:48:07.644Z",
 *           "updatedAt": "2021-07-09T00:48:07.644Z"
 *       }]
 * }
 *
 * @example response - 200 - Com populate
 * {
 *     "status": 200,
 *     "message": "",
 *       "data": [{
 *           "_id": "60e79cc7907eb226ab86dc9e",
 *           "date": "2021-07-08T00:10:30.000Z",
 *           "thought": "Teste",
 *           "thought_believe": 50,
 *           "thought_emotions": [
 *               {
 *                   "emotion": {
 *                      "_id": "60e624faafbaba0fab8f6e8c",
 *                      "name": "Teste"
 *                  },
 *                   "feel": 68
 *               }
 *           ],
 *           "answer": "Teste",
 *           "answer_believe": 10,
 *           "answer_emotions": [
 *               {
 *                   "emotion": {
 *                      "_id": "60e624faafbaba0fab8f6e8c",
 *                      "name": "Teste"
 *                    },
 *                   "feel": 10
 *               }
 *           ],
 *           "action": "Teste"
 *       }]
 * }
 *
 * @example response - 400 - Id inválido
 * {
 *     "status": 400,
 *     "message": "Houve um erro ao processar a requisição"
 * }
 *
 * @example response - 401 - Token Inválido
 * {
 *     "status": 401,
 *     "message": "Credenciais inválidas"
 * }
 */
exports.router.get("/", record_1.getRecords);
/**
 * GET /api/emotions/:id
 * @summary Retorna as informações de um registro específico
 * @tags records
 * @param {string} id.param.required - Id da emoção a ser retornada
 * @param {number} page.query - Seleciona a página requerida
 * @param {number} limit.query - Limita a quantidade de elementos a ser retornado. Max 20
 * @param {number} sort.query - Ordena os elementos pela data de criação. 'asc' ou 'desc'
 * @param {boolean} timestamps.query - Adiciona os campos de createdAt e updatedAt
 * @param {boolean} populate.query - Popula os campos emotion adicionando name e _id
 * @return {object} 200 - Resposta de Sucesso - application/json
 * @return {object} 400 - Mensagem de Erro - application/json
 * @return {object} 401 - Sem autenticação - application/json
 *
 * @example response - 200 - Padrão
 * {
 *     "status": 200,
 *     "message": "",
 *       "data": {
 *           "_id": "60e79cc7907eb226ab86dc9e",
 *           "date": "2021-07-08T00:10:30.000Z",
 *           "thought": "Teste",
 *           "thought_believe": 50,
 *           "thought_emotions": [
 *               {
 *                   "emotion": "60e624faafbaba0fab8f6e8c",
 *                   "feel": 68
 *               }
 *           ],
 *           "answer": "Teste",
 *           "answer_believe": 10,
 *           "answer_emotions": [
 *               {
 *                   "emotion": "60e624faafbaba0fab8f6e8c",
 *                   "feel": 10
 *               }
 *           ],
 *           "action": "Teste"
 *       }
 * }
 * @example response - 200 - Com timestamps
 * {
 *     "status": 200,
 *     "message": "",
 *       "data": {
 *           "_id": "60e79cc7907eb226ab86dc9e",
 *           "date": "2021-07-08T00:10:30.000Z",
 *           "thought": "Teste",
 *           "thought_believe": 50,
 *           "thought_emotions": [
 *               {
 *                   "emotion": "60e624faafbaba0fab8f6e8c",
 *                   "feel": 68
 *               }
 *           ],
 *           "answer": "Teste",
 *           "answer_believe": 10,
 *           "answer_emotions": [
 *               {
 *                   "emotion": "60e624faafbaba0fab8f6e8c",
 *                   "feel": 10
 *               }
 *           ],
 *           "action": "Teste",
 *           "createdAt": "2021-07-09T00:48:07.644Z",
 *           "updatedAt": "2021-07-09T00:48:07.644Z"
 *       }
 * }
 *
 * @example response - 200 - Com populate
 * {
 *     "status": 200,
 *     "message": "",
 *       "data": {
 *           "_id": "60e79cc7907eb226ab86dc9e",
 *           "date": "2021-07-08T00:10:30.000Z",
 *           "thought": "Teste",
 *           "thought_believe": 50,
 *           "thought_emotions": [
 *               {
 *                   "emotion": {
 *                      "_id": "60e624faafbaba0fab8f6e8c",
 *                      "name": "Teste"
 *                  },
 *                   "feel": 68
 *               }
 *           ],
 *           "answer": "Teste",
 *           "answer_believe": 10,
 *           "answer_emotions": [
 *               {
 *                   "emotion": {
 *                      "_id": "60e624faafbaba0fab8f6e8c",
 *                      "name": "Teste"
 *                    },
 *                   "feel": 10
 *               }
 *           ],
 *           "action": "Teste"
 *       }
 * }
 *
 * @example response - 400 - Id inválido
 * {
 *     "status": 400,
 *     "message": "Houve um erro ao processar a requisição"
 * }
 *
 * @example response - 401 - Token Inválido
 * {
 *     "status": 401,
 *     "message": "Credenciais inválidas"
 * }
 */
exports.router.get("/:id", record_1.getRecordFromId);
/**
 * POST /api/records
 * @summary Cria um novo registro
 * @tags records
 * @param {Record} request.body.required - Dados precisos para cadastrar uma novo registro - application/json
 * @return {object} 200 - Resposta de Sucesso - application/json
 * @return {object} 400 - Campos inválidos - application/json
 * @return {object} 401 - Sem autenticação - application/json
 *
 * @example response - 200 - Padrão
 * {
 *     "status": 200,
 *     "message": "Registro criado com sucesso"
 * }
 *
 * @example response - 400 - Campos inválidos
 * {
 *     "status": 400,
 *     "message": "'action' pode conter apenas letras"
 * }
 *
 * @example response - 401 - Padrão
 * {
 *     "status": 401,
 *     "message": "Credenciais inválidas"
 * }
 */
exports.router.post("/", record_1.postRecord);
/**
 * PUT /api/records/:id
 * @summary Atualiza um registrojá existente
 * @tags records
 * @param {string} id.params.required - Id do registro a ser alterado
 * @param {Record} request.body - Dados precisos para cadastrar uma novo registro - application/json
 * @return {object} 200 - Resposta de Sucesso - application/json
 * @return {object} 400 - Campos inválidos - application/json
 * @return {object} 401 - Sem autenticação - application/json
 *
 * @example response - 200 - Padrão
 * {
 *     "status": 200,
 *     "message": "Registro atualizado com sucesso"
 * }
 *
 * @example response - 400 - Campos inválidos
 * {
 *     "status": 400,
 *     "message": "'action' pode conter apenas letras"
 * }
 *
 * @example response - 401 - Padrão
 * {
 *     "status": 401,
 *     "message": "Credenciais inválidas"
 * }
 */
exports.router.put("/:id", record_1.putRecord);
/**
 * DELETE /api/records/:id
 * @summary Deleta um registro a partir de um identificador
 * @tags records
 * @param {string} id.param.required - Id do registro a ser apagado
 * @return {object} 200 - Resposta de Sucesso - application/json
 * @return {object} 400 - Campos inválidos - application/json
 * @return {object} 401 - Sem autenticação - application/json
 *
 * @example response - 200 - Padrão
 * {
 *     "status": 200,
 *     "message": "Registro deletado com sucesso"
 * }
 *
 * @example response - 400 - Id inválido
 * {
 *     "status": 400,
 *     "message": "Houve um erro ao processar a requisição"
 * }
 *
 * @example response - 401 - Padrão
 * {
 *     "status": 401,
 *     "message": "Credenciais inválidas"
 * }
 */
exports.router.delete("/:id", record_1.deleteRecord);
