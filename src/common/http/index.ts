import type { NextFunction, Request, Response } from 'express';

export type HttpStatusCodes =
  | 100 // Continue - The server has received the request headers and the client should proceed to send the request body
  | 101 // Switching Protocols - The server is switching protocols according to the client request
  | 102 // Processing - The server has received and is processing the request, but no response is available yet
  | 103 // Early Hints - Indicates to the client that the server is likely to send a final response with the header fields included in the informational response
  | 200 // OK - The request has succeeded
  | 201 // Created - The request has been fulfilled and a new resource has been created
  | 202 // Accepted - The request has been accepted for processing, but the processing has not been completed
  | 203 // Non-Authoritative Information - The request has been successfully processed, but the returned information may be from another source
  | 204 // No Content - The request has been successfully processed, but there is no content to return
  | 205 // Reset Content - The request has been successfully processed, but the client should reset its view
  | 206 // Partial Content - The server is delivering only part of the resource due to a range header sent by the client
  | 207 // Multi-Status - The message body that follows is an XML message and can contain a number of separate response codes, depending on how many sub-requests were made
  | 208 // Already Reported - The members of a DAV binding have already been enumerated in a previous reply to this request, and are not being included again
  | 226 // IM Used - The server has fulfilled a request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance
  | 300 // Multiple Choices - The requested resource corresponds to any one of a set of representations, each with its own specific location
  | 301 // Moved Permanently - The requested resource has been assigned a new permanent URI and any future references to this resource should use one of the returned URIs
  | 302 // Found - The requested resource resides temporarily under a different URI
  | 303 // See Other - The response to the request can be found under a different URI and should be retrieved using a GET method
  | 304 // Not Modified - Indicates that the resource has not been modified since the version specified in the request headers If-Modified-Since or If-None-Match
  | 305 // Use Proxy - The requested resource must be accessed through the proxy given by the Location field
  | 307 // Temporary Redirect - The requested resource resides temporarily under a different URI
  | 308 // Permanent Redirect - The requested resource has been assigned a new permanent URI and any future references to this resource ought to use one of the returned URIs
  | 400 // Bad Request - The server cannot or will not process the request due to an apparent client error
  | 401 // Unauthorized - Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided
  | 402 // Payment Required - Reserved for future use
  | 403 // Forbidden - The server understood the request, but is refusing to fulfill it
  | 404 // Not Found - The requested resource could not be found but may be available in the future
  | 405 // Method Not Allowed - A request method is not supported for the requested resource
  | 406 // Not Acceptable - The requested resource is capable of generating only
  | 407 // Proxy Authentication Required - The client must first authenticate itself with the proxy
  | 408 // Request Timeout - The server timed out waiting for the request
  | 409 // Conflict - Indicates that the request could not be processed because of conflict in the request
  | 410 // Gone - Indicates that the requested resource is no longer available at the server and no forwarding address is known
  | 411 // Length Required - The server requires the request to be valid and non-empty Content-Length header to be present
  | 412 // Precondition Failed - The server does not meet one of the preconditions that the requester put on the request
  | 413 // Payload Too Large - The server will not accept the request, because the request entity is too large
  | 414 // URI Too Long - The server will not accept the request, because the URL is too long
  | 415 // Unsupported Media Type - The server will not accept the request, because the media type is not supported
  | 416 // Range Not Satisfiable - The client has asked for a portion of the file, but the server cannot supply that portion
  | 417 // Expectation Failed - The expectation given in an Expect request-header field could not be met by this server
  | 418 // I'm a teapot - This code was defined in 1998 as one of the traditional IETF April Fools' jokes, in RFC 2324
  | 421 // Misdirected Request - The request was directed at a server that is not able to produce a response
  | 422 // Unprocessable Entity - The request was well-formed but was unable to be followed due to semantic errors
  | 423 // Locked - The resource that is being accessed is locked
  | 424 // Failed Dependency - The request failed because it depended on another request and that request failed
  | 426 // Upgrade Required - The client should switch to a different protocol such as TLS/1.0, given in the Upgrade header field
  | 428 // Precondition Required - The origin server requires the request to be conditional
  | 429 // Too Many Requests - The user has sent too many requests in a given amount of time
  | 431 // Request Header Fields Too Large - The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large
  | 451 // Unavailable For Legal Reasons - A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource
  | 500 // Internal Server Error - A generic error message, given when an unexpected condition was encountered and no more specific message is suitable
  | 501 // Not Implemented - The server either does not recognize the request method, or it lacks the ability to fulfill the request
  | 502 // Bad Gateway - The server was acting as a gateway or proxy and received an invalid response from the upstream server
  | 503 // Service Unavailable - The server is currently unable to handle the request due to a temporary overload or scheduled maintenance
  | 504 // Gateway Timeout - The server was acting as a gateway or proxy and did not receive a timely response from the upstream server
  | 505 // HTTP Version Not Supported - The server does not support the HTTP protocol version used in the request
  | 506 // Variant Also Negotiates - Transparent content negotiation for the request results in a circular reference
  | 507 // Insufficient Storage - The server is unable to store the representation needed to complete the request
  | 508 // Loop Detected - The server detected an infinite loop while processing the request
  | 510 // Not Extended - Further extensions to the request are required for the server to fulfill it
  | 511; // Network Authentication Required - The client needs to authenticate to gain network access

export type StatusCode = {
  CONTINUE: 100;
  SWITCHING_PROTOCOLS: 101;
  PROCESSING: 102;
  EARLY_HINTS: 103;
  OK: 200;
  CREATED: 201;
  ACCEPTED: 202;
  NON_AUTHORITATIVE_INFORMATION: 203;
  NO_CONTENT: 204;
  RESET_CONTENT: 205;
  PARTIAL_CONTENT: 206;
  MULTI_STATUS: 207;
  ALREADY_REPORTED: 208;
  IM_USED: 226;
  MULTIPLE_CHOICES: 300;
  MOVED_PERMANENTLY: 301;
  FOUND: 302;
  SEE_OTHER: 303;
  NOT_MODIFIED: 304;
  USE_PROXY: 305;
  TEMPORARY_REDIRECT: 307;
  PERMANENT_REDIRECT: 308;
  BAD_REQUEST: 400;
  UNAUTHORIZED: 401;
  PAYMENT_REQUIRED: 402;
  FORBIDDEN: 403;
  NOT_FOUND: 404;
  METHOD_NOT_ALLOWED: 405;
  NOT_ACCEPTABLE: 406;
  PROXY_AUTHENTICATION_REQUIRED: 407;
  REQUEST_TIMEOUT: 408;
  CONFLICT: 409;
  GONE: 410;
  LENGTH_REQUIRED: 411;
  PRECONDITION_FAILED: 412;
  PAYLOAD_TOO_LARGE: 413;
  URI_TOO_LONG: 414;
  UNSUPPORTED_MEDIA_TYPE: 415;
  RANGE_NOT_SATISFIABLE: 416;
  EXPECTATION_FAILED: 417;
  IM_A_TEAPOT: 418;
  MISDIRECTED_REQUEST: 421;
  UNPROCESSABLE_ENTITY: 422;
  LOCKED: 423;
  FAILED_DEPENDENCY: 424;
  UPGRADE_REQUIRED: 426;
  PRECONDITION_REQUIRED: 428;
  TOO_MANY_REQUESTS: 429;
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431;
  UNAVAILABLE_FOR_LEGAL_REASONS: 451;
  INTERNAL_SERVER_ERROR: 500;
  NOT_IMPLEMENTED: 501;
  BAD_GATEWAY: 502;
  SERVICE_UNAVAILABLE: 503;
  GATEWAY_TIMEOUT: 504;
  HTTP_VERSION_NOT_SUPPORTED: 505;
  VARIANT_ALSO_NEGOTIATES: 506;
  INSUFFICIENT_STORAGE: 507;
  LOOP_DETECTED: 508;
  NOT_EXTENDED: 510;
  NETWORK_AUTHENTICATION_REQUIRED: 511;
};

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class HttpStatus {
  static CONTINUE: HttpStatusCodes = 100;
  static SWITCHING_PROTOCOLS: HttpStatusCodes = 101;
  static PROCESSING: HttpStatusCodes = 102;
  static EARLY_HINTS: HttpStatusCodes = 103;
  static OK: HttpStatusCodes = 200;
  static CREATED: HttpStatusCodes = 201;
  static ACCEPTED: HttpStatusCodes = 202;
  static NON_AUTHORITATIVE_INFORMATION: HttpStatusCodes = 203;
  static NO_CONTENT: HttpStatusCodes = 204;
  static RESET_CONTENT: HttpStatusCodes = 205;
  static PARTIAL_CONTENT: HttpStatusCodes = 206;
  static MULTI_STATUS: HttpStatusCodes = 207;
  static ALREADY_REPORTED: HttpStatusCodes = 208;
  static IM_USED: HttpStatusCodes = 226;
  static MULTIPLE_CHOICES: HttpStatusCodes = 300;
  static MOVED_PERMANENTLY: HttpStatusCodes = 301;
  static FOUND: HttpStatusCodes = 302;
  static SEE_OTHER: HttpStatusCodes = 303;
  static NOT_MODIFIED: HttpStatusCodes = 304;
  static USE_PROXY: HttpStatusCodes = 305;
  static TEMPORARY_REDIRECT: HttpStatusCodes = 307;
  static PERMANENT_REDIRECT: HttpStatusCodes = 308;
  static BAD_REQUEST: HttpStatusCodes = 400;
  static UNAUTHORIZED: HttpStatusCodes = 401;
  static PAYMENT_REQUIRED: HttpStatusCodes = 402;
  static FORBIDDEN: HttpStatusCodes = 403;
  static NOT_FOUND: HttpStatusCodes = 404;
  static METHOD_NOT_ALLOWED: HttpStatusCodes = 405;
  static NOT_ACCEPTABLE: HttpStatusCodes = 406;
  static PROXY_AUTHENTICATION_REQUIRED: HttpStatusCodes = 407;
  static REQUEST_TIMEOUT: HttpStatusCodes = 408;
  static CONFLICT: HttpStatusCodes = 409;
  static GONE: HttpStatusCodes = 410;
  static LENGTH_REQUIRED: HttpStatusCodes = 411;
  static PRECONDITION_FAILED: HttpStatusCodes = 412;
  static PAYLOAD_TOO_LARGE: HttpStatusCodes = 413;
  static URI_TOO_LONG: HttpStatusCodes = 414;
  static UNSUPPORTED_MEDIA_TYPE: HttpStatusCodes = 415;
  static RANGE_NOT_SATISFIABLE: HttpStatusCodes = 416;
  static EXPECTATION_FAILED: HttpStatusCodes = 417;
  static IM_A_TEAPOT: HttpStatusCodes = 418;
  static MISDIRECTED_REQUEST: HttpStatusCodes = 421;
  static UNPROCESSABLE_ENTITY: HttpStatusCodes = 422;
  static LOCKED: HttpStatusCodes = 423;
  static FAILED_DEPENDENCY: HttpStatusCodes = 424;
  static UPGRADE_REQUIRED: HttpStatusCodes = 426;
  static PRECONDITION_REQUIRED: HttpStatusCodes = 428;
  static TOO_MANY_REQUESTS: HttpStatusCodes = 429;
  static REQUEST_HEADER_FIELDS_TOO_LARGE: HttpStatusCodes = 431;
  static UNAVAILABLE_FOR_LEGAL_REASONS: HttpStatusCodes = 451;
  static INTERNAL_SERVER_ERROR: HttpStatusCodes = 500;
  static NOT_IMPLEMENTED: HttpStatusCodes = 501;
  static BAD_GATEWAY: HttpStatusCodes = 502;
  static SERVICE_UNAVAILABLE: HttpStatusCodes = 503;
  static GATEWAY_TIMEOUT: HttpStatusCodes = 504;
  static HTTP_VERSION_NOT_SUPPORTED: HttpStatusCodes = 505;
  static VARIANT_ALSO_NEGOTIATES: HttpStatusCodes = 506;
  static INSUFFICIENT_STORAGE: HttpStatusCodes = 507;
  static LOOP_DETECTED: HttpStatusCodes = 508;
  static NOT_EXTENDED: HttpStatusCodes = 510;
  static NETWORK_AUTHENTICATION_REQUIRED: HttpStatusCodes = 511;
}

export type ApiReq = Request & {
  [key: string]: any;
};

export type ApiRes = Response & {
  [key: string]: any;
};

export type ApiNext = NextFunction;
