/* eslint-disable @typescript-eslint/no-namespace */

export namespace GetMaps {
  export interface MapMarker {
    _id: string;
    latitude: number;
    longitude: number;
    review: {
      _id: string;
      thumbnail: string;
      headline: string;
    };
  }

  export interface MapMarkerDetailed {
    _id: string;
    latitude: number;
    longitude: number;
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
        _id: string;
        name: string;
      }[];
      keyType: string;
      keyUsed: string;
    };
  }

  export interface Response {
    data: MapMarkerDetailed | MapMarker[];
    total: number;
    message: string;
    statusCode: number;
  }
}
