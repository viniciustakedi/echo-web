/* eslint-disable @typescript-eslint/no-namespace */

export namespace PostReviews {
  export interface Create {
    thumbnail: string;
    headline: string;
    content: string;
    rating: number;
    priceRating: number;
    address: string;
    country: string;
    city: string;
    tags: {
      _id: string;
      name: string;
    }[];
  }
}
