import request, { CoreOptions, UriOptions } from "request";
export interface Credentials {
    username: string;
    password: string;
}
/**
 * Generate a set of options for a form
 */
export declare function formOptions(params: any, options: CoreOptions & UriOptions): request.CoreOptions & request.UriOptions;
/**
 * Generate the default options
 */
export declare function defaultOptions(options: CoreOptions & UriOptions): request.CoreOptions & request.UriOptions;
/**
 * Upload a file via HTTP
 */
export declare function upload(): void;
/**
 * Send an HTTP request
 */
export declare function sendRequest(options: CoreOptions & UriOptions): Promise<string>;
