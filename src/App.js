import React, { useRef, useEffect } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/Map";

import "./App.css";

function App() {

  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      const webmap = new WebMap({
        basemap: 'topo-vector'
      });

      const view = new MapView({
        container: mapDiv.current,
        map: webmap,
        zoom: 3
      });
    }
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default App;
