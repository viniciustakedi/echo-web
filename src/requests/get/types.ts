/* eslint-disable @typescript-eslint/no-namespace */

export namespace GetRequests {
  export namespace Review {
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
      createdAt: string;
      priceRating: number;
      tags: {
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

  export namespace Map {
    export interface MapMarker {
      _id: string;
      latitude: string;
      longitude: string;
      review: {
        _id: string;
        thumbnail: string;
        headline: string;
      };
    }

    export interface GetMapMarkersResponse {
      data: MapMarker[];
      total: number;
      message: string;
      statusCode: number;
    }

    export interface GetDetailedMapMarkerResponse {
      _id: string;
      latitude: string;
      longitude: string;
      isDeleted: boolean;
      updatedAt: string;
      createdAt: string;
      review: {
        _id: string;
        thumbnail: string;
        headline: string;
        friendlyUrl: string;
        rating: number;
        priceRating: number;
        address: string;
        city: string;
        country: string;
        tags: {
          name: string;
        }[];
        keyType: string;
        keyUsed: string;
      };
    }

    export interface GetMapMarkersByIdResponse {
      data: GetDetailedMapMarkerResponse;
      total: number;
      message: string;
      statusCode: number;
    }
  }
}
