/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unused-expressions */

export namespace GetTags {
  export interface Tags {
    _id: string;
    name: string;
    createdAt: string;
  }
  [];

  export interface Response {
    data: Tags;
    total: number;
    page: number;
    limit: number;
    message: string;
    statusCode: number;
  }
}
