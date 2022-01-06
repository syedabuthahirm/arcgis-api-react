import React, { useRef, useEffect, useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import BaseMapGallery from './Components/Arcgis/BaseMapGallery';
import ImageryLayer from '@arcgis/core/layers/ImageryLayer';

import "./App.css";

function useMap(map, options) {
  const elRef = useRef(null);
  const [view, setView] = useState(null);
  const initialArguments = useRef({ map, options });
  useEffect(() => {
    const { map: mapProperties, options } = initialArguments.current;
    const map = new Map({ ...mapProperties });
    const { view } = options;
    const mapView = new MapView({
      ...view,
      map,
    });
    mapView.container = elRef.current;
    setView(mapView);
    return function cleanUp(view) {
      if (!view) {
        return;
      }
      view = view.container = null;
    }
  }, []);
  return [elRef, view];
}

function App() {
  const layer = new ImageryLayer({
    url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/NLCDLandCover2001/ImageServer",
    format: "jpgpng" // server exports in either jpg or png format
  });
  const map = {
    basemap: "streets",
    layers: [layer]
  };
  const options = {
    view: {
      center: [15, 65],
      zoom: 4
    }
  };
  const [ref, view] = useMap(map, options);
  return (
    <>
      <div className="mapDiv" ref={ref} />
      <BaseMapGallery mapView={view} />
    </>
  );
}

export default App;
