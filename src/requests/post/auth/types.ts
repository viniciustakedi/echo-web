/* eslint-disable @typescript-eslint/no-namespace */

export namespace PostAuth {
  export interface SignInParams {
    email: string;
    password: string;
  }

  export interface SignInResponse {
    data?: string;
    total?: number;
    message: string;
    statusCode: number;
  }
}
