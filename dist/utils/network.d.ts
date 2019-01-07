import Request, { CoreOptions, UriOptions } from "request";
/**
 * Generate a set of options to upload a file
 */
export declare function formOptions(params: any, options: CoreOptions | CoreOptions & UriOptions): Request.CoreOptions & Request.UriOptions;
/**
 * Generate the default options
 */
export declare function defaultOptions(options: CoreOptions | CoreOptions & UriOptions): Request.CoreOptions & Request.UriOptions;
/**
 * Detect an error in the response
 */
export declare function validateUtServerResponse(error: any, response: Request.Response, body: any): any;
