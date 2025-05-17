/* eslint-disable @typescript-eslint/no-namespace */

export namespace PostRequests {
  export namespace SignIn {
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
}
