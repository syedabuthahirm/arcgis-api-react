import React, { useRef, useEffect, useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/Map";

import "./App.css";
import BaseMapGallery from "./Components/Arcgis/BaseMapGallery";

function App() {
  const mapDiv = useRef(null);
  const [view, setView] = useState(null);
  useEffect(() => {
    if (mapDiv.current) {
      const webmap = new WebMap({
        basemap: 'topo-vector'
      });
      const mapView = new MapView({
        container: mapDiv.current,
        map: webmap,
        zoom: 3
      });
      setView(mapView);
    }
  }, []);

  return (
    <>
      <div className="mapDiv" ref={mapDiv} />
      <BaseMapGallery mapView={view} />
    </>
  );
}

export default App;
