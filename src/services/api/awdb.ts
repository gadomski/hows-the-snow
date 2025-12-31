import { apiClient } from './client';
import type { components } from '../../types/awdb';

export type Station = components['schemas']['StationDTO'];

export const awdbApi = {
  getStations: async (params: { networkCode: string }): Promise<Station[]> => {
    const response = await apiClient.get('/services/v1/stations', {
      params: {
        stationTriplets: '*:*:' + params.networkCode,
      },
    });
    return response.data;
  },
};
