import { Router } from "express";

import { getEmotions, getEmotionFromId,postEmotion, putEmotion, deleteEmotion } from '../controller/emotion';

export const router = Router();

/**
 * Uma emoção referente a um usuário
 * @typedef {object} Emotion
 * @property {string} name.required - O nome da emoção
 */

/**
 * GET /api/emotions
 * @summary Retorna todos as Emoções
 * @tags emotions
 * @param {number} page.query - Seleciona a página requerida
 * @param {number} limit.query - Limita a quantidade de elementos a ser retornado. Max 20
 * @param {number} sort.query - Ordena os elementos pela data de criação. 'asc' ou 'desc'
 * @param {boolean} timestamps.query - Adiciona os campos de createdAt e updatedAt
 * @return {object} 200 - Resposta de Sucesso - application/json
 * @return {object} 401 - Sem autenticação - application/json
 * @security BearerAuth
 * 
 * @example response - 200 - Padrão
 * {
 *     "status": 200,
 *     "message": "",
 *     "data": [
 *         {
 *             "_id": "60e78e197ce2c21cb77e1a77",
 *             "name": "Exemplo"
 *         }
 *     ]
 * }
 * @example response - 200 - Com timestamps
 * {
 *     "status": 200,
 *     "message": "",
 *     "data": [
 *         {
 *             "_id": "60e78e197ce2c21cb77e1a77",
 *             "name": "Exemplo",
 *             "createdAt": "2021-07-08T23:45:29.612Z",
 *             "updatedAt": "2021-07-08T23:45:29.612Z"
 *         }
 *     ]
 * }
 * 
 * @example response - 401 - Padrão
 * {
 *     "status": 401,
 *     "message": "Credenciais inválidas"
 * }
 */

router.get("/", getEmotions);

/**
 * GET /api/emotions/:id
 * @summary Retorna as informações de uma emoção específica
 * @tags emotions
 * @param {string} id.param - Id da emoção a ser retornada
 * @param {number} page.query - Seleciona a página requerida
 * @param {number} limit.query - Limita a quantidade de elementos a ser retornado. Max 20
 * @param {number} sort.query - Ordena os elementos pela data de criação. 'asc' ou 'desc'
 * @param {boolean} timestamps.query - Adiciona os campos de createdAt e updatedAt
 * @return {object} 200 - Resposta de Sucesso - application/json
 * @return {object} 401 - Sem autenticação - application/json
 * @security BasicAuth & BearerAuth
 * 
 * @example response - 200 - Padrão
 * {
 *     "status": 200,
 *     "message": "",
 *     "data":{
 *         "_id": "60e78e197ce2c21cb77e1a77",
 *         "name": "Exemplo"
 *     }
 * }
 * @example response - 200 - Com timestamps
 * {
 *     "status": 200,
 *     "message": "",
 *     "data": {
 *         "_id": "60e78e197ce2c21cb77e1a77",
 *         "name": "Exemplo",
 *         "createdAt": "2021-07-08T23:45:29.612Z",
 *         "updatedAt": "2021-07-08T23:45:29.612Z"
 *     }
 * }
 * 
 * @example response - 401 - Padrão
 * {
 *     "status": 401,
 *     "message": "Credenciais inválidas"
 * }
 */

router.get("/:id", getEmotionFromId);

/**
 * POST /api/emotions
 * @summary Cria uma nova emoção
 * @tags emotions
 * @param {Emotion} request.body.required - Dados precisos para cadastrar uma novo registro - application/json
 * @return {object} 200 - Resposta de Sucesso - application/json
 * @return {object} 400 - Campos inválidos - application/json
 * @return {object} 401 - Sem autenticação - application/json
 * @security BasicAuth & BearerAuth
 * 
 * @example response - 200 - Padrão
 * {
 *     "status": 200,
 *     "message": "Emoção criada com sucesso"
 * }
 * 
 * @example response - 400 - Campos inválidos
 * {
 *     "status": 400,
 *     "message": "'name' pode conter apenas letras"
 * }
 * 
 * @example response - 400 - Registro já existe
 * {
 *     "status": 400,
 *     "message": "Essa emoção já existe"
 * }
 * 
 * @example response - 401 - Padrão
 * {
 *     "status": 401,
 *     "message": "Credenciais inválidas"
 * }
 */

router.post("/", postEmotion);

/**
 * PUT /api/emotions/:id
 * @summary Atualiza alguns dados de um registro
 * @tags emotions
 * @param {string} id.param.required - Id do registro a ser alterado
 * @param {Emotion} request.body.required - Campos a serem atualizados - application/json
 * @return {object} 200 - Resposta de Sucesso - application/json
 * @return {object} 400 - Campos inválidos - application/json
 * @return {object} 401 - Sem autenticação - application/json
 * @security BasicAuth & BearerAuth
 * 
 * @example response - 200 - Padrão
 * {
 *     "status": 200,
 *     "message": "Emoção atualizada com sucesso"
 * }
 * 
 * @example response - 400 - Campos inválidos
 * {
 *     "status": 400,
 *     "message": "'name' pode conter apenas letras"
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

router.put("/:id", putEmotion);

/**
 * DELETE /api/emotions/:id
 * @summary Deleta uma emoção a partir de um identificador
 * @tags emotions
 * @param {string} id.param.required - Id do registro a ser apagado
 * @return {object} 200 - Resposta de Sucesso - application/json
 * @return {object} 400 - Campos inválidos - application/json
 * @return {object} 401 - Sem autenticação - application/json
 * @security BasicAuth & BearerAuth
 * 
 * @example response - 200 - Padrão
 * {
 *     "status": 200,
 *     "message": "Emoção deletada com sucesso"
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

router.delete("/:id", deleteEmotion);