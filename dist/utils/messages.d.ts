interface IMessages extends Object {
    [key: string]: any;
}
/**
 * Returns a default message depending on type
 * @param name Type of message, must be string. Required.
 * @returns Message in the chosen language, if not, returns in the default language. Default "en-US".
 */
export declare const getMessage: (language: string, name: string | undefined) => string;
/**
 * Returns a default message depending on type
 * @returns An array of strings containing as allowed languages.
 */
export declare const getAllowedLanguages: () => string[];
/**
 * Return message list
 */
export declare const messages: IMessages;
export {};
