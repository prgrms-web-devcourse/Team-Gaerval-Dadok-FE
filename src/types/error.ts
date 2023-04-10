import { HttpStatusCode } from 'axios';

export type ServiceErrorCode =
  | 'CM1'
  | 'CM2'
  | 'U1'
  | 'C1'
  | 'C2'
  | 'A1'
  | 'A2'
  | 'A3'
  | 'A4'
  | 'A5'
  | 'A6'
  | 'A7'
  | 'B1'
  | 'B2'
  | 'BS1'
  | 'BS2'
  | 'BC1'
  | 'BC2'
  | 'BG1'
  | 'BG2'
  | 'BG3'
  | 'BG4'
  | 'BG5'
  | 'BG6'
  | 'BG7'
  | 'BG8'
  | 'BG9'
  | '-1'
  | '-2'
  | '-5'
  | '-7'
  | '-8'
  | '-9'
  | '-10'
  | '401'
  | '603'
  | '9798';

export type APIErrorResponseData = {
  code: ServiceErrorCode;
  status: HttpStatusCode;
  errors: string;
  message: string;
  statusText?: string;
  timestamp?: string;
  path?: string;
};
