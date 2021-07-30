interface IMessages extends Object{
    [ key: string ]: any;
}

/**
 * Returns a default message depending on type
 * @param name Type of message, must be string. Required.
 * @returns Message in the chosen language, if not, returns in the default language. Default "en-US".
 */

export const getMessage = (language: string, name: string | undefined): string => {
    if(!name || name === "")
        return "";

    if(messages.hasOwnProperty(language))
        return messages[language][name] || "Return message not found";
    return messages['pt-BR'][name] || "Return message not found";
};

/**
 * Returns a default message depending on type
 * @returns An array of strings containing as allowed languages.
 */

export const getAllowedLanguages = (): string[] => {
    return Object.keys(messages);
}


/**
 * Return message list
 */

export const messages: IMessages = {
    "pt-BR": {
        default: "Houve um erro ao processar a requisição",
        default_error: "Houve um erro ao processar a requisição",

        unauthorized: "Credenciais inválidas",
        not_implemented: "Recurso não implementado",
        invalid_google_token: "Token OAuth inválido",

        //Database default
        entry_not_found: "Registro não encontrado",

        //Params errors
        id_required: "'id' é obrigatório",
        page_invalid: "'page' precisa ser um número",
        sort_invalid: "'sort' precisa ser 'asc' ou 'desc'",
        limit_invalid: "'limit' precisa ser um número",
        populate_invalid: "'populate' precisa ser booleano",
        timestamps_invalid: "'timestamps' precisa ser booleano",

        //Form default
        name_invalid: "'name' pode conter apenas letras",
        email_invalid: "'email' é obrigatório e precisa ser um email válido",
        password_invalid: "'password' é obrigatório e pode conter letras e números e ter mais que 6 caracteres",
        date_invalid: "'date' é obrigatório e precisa estar no formato: DD-MM-YYYY hh:mm:ss",
        thought_invalid: "'thought' é obrigatório e precisa ser string",
        thought_believe_invalid: "'thought_believe' é obrigatório e precisa ser number",
        thought_emotions_invalid: "'thought_emotions' é obrigatório, precisa ser array e conter 'emotion' e 'feel'",
        answer_invalid: "'answer' é obrigatório e precisa ser string",
        answer_believe_invalid: "'answer_believe' é obrigatório e precisa ser number",
        answer_emotions_invalid: "'answer_emotions' é obrigatório, precisa ser array e conter 'emotion' e 'feel'",
        action_invalid: "'action' é obrigatório e precisa ser string",

        //User
        user_already_exists: "Email já cadastrado",
        user_local_invalid: "Email ou senha inválidos",
        user_success_create: "Usuário criado com sucesso",

        //Record
        record_success_create: "Registro criado com sucesso",
        record_success_update: "Registro atualizado com sucesso",
        record_success_delete: "Registro excluido com sucesso",

        //Emotion
        emotion_already_exists: "Essa emoção já existe",
        emotion_success_create: "Emoção criada com sucesso",
        emotion_success_delete: "Emoção excluida com sucesso",
        emotion_success_update: "Emoção atualizada com sucesso"
    },
    "en-US": {
        default: "Houve um erro ao processar a requisição",
        unauthorized: "You dont have permission to access this resource"
    }
};