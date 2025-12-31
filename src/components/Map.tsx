import Map, { Layer, NavigationControl, Source } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MAP_STYLE, MAP_OPTIONS, INITIAL_VIEW_STATE } from '@/lib/mapConfig';
import { useStations } from '@/hooks/useStations';
import { useMemo } from 'react';
import { point, featureCollection } from '@turf/helpers';

export default function OurMap() {
  const { data: snotelStations } = useStations({ networkCode: 'SNTL' });

  const stations = useMemo(() => {
    if (snotelStations) {
      return snotelStations
        .filter((station) => station.latitude && station.longitude)
        .map((station) =>
          point([station.longitude as number, station.latitude as number])
        );
    }
  }, [snotelStations]);
  return (
    <Map
      mapStyle={MAP_STYLE}
      initialViewState={INITIAL_VIEW_STATE}
      style={{ width: '100%', height: '100dvh' }}
      {...MAP_OPTIONS}
    >
      <NavigationControl position="top-right" />

      {stations && (
        <Source
          id="stations"
          type="geojson"
          data={featureCollection(stations)}
          cluster={true}
        >
          <Layer
            id="clusters"
            type="circle"
            filter={['has', 'point_count']}
            paint={{ 'circle-radius': 10 }}
          />
          <Layer
            id="cluster-count"
            type="symbol"
            filter={['has', 'point_count']}
            layout={{
              'text-field': '{point_count_abbreviated}',
              'text-size': 12,
            }}
            paint={{ 'text-color': 'white' }}
          />
          <Layer
            id="unclustered-points"
            type="circle"
            filter={['!has', 'point_count']}
            paint={{ 'circle-radius': 6 }}
          />
        </Source>
      )}
    </Map>
  );
}
