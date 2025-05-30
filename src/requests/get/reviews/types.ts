/* eslint-disable @typescript-eslint/no-namespace */

export namespace GetReviews {
  export interface ReviewByKey {
    _id: string;
    thumbnail: string;
    headline: string;
    friendlyUrl: string;
    content: string;
    rating: number;
    claps: number;
    createdBy: string;
    updatedAt: string;
    address: string;
    country: string;
    city: string;
    createdAt: string;
    priceRating: number;
    tags: {
      _id: string;
      name: string;
    }[];
  }

  export interface GetReviewResponse {
    data: ReviewByKey;
    total: number;
    message: string;
    statusCode: number;
  }

  export interface ReviewListItem {
    _id: string;
    thumbnail: string;
    headline: string;
    friendlyUrl: string;
    rating: number;
    address: string;
    country: string;
    city: string;
    claps: number;
    createdAt: string;
    priceRating: number;
    tags: {
      _id: string;
      name: string;
    }[];
  }

  export interface GetReviewsResponse {
    data: ReviewListItem[];
    total: number;
    page: number;
    limit: number;
    message: string;
    statusCode: number;
  }
}
