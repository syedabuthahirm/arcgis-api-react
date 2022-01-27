import React, { useRef, useEffect, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import BaseMapGallery from './Components/Arcgis/BaseMapGallery';
import { createLayers, sampleLayers } from "./mapService";
import "./App.css";
import Search from "./Components/Arcgis/Search";

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
  const layer = createLayers(sampleLayers);
  const [visible, setVisible] = useState(false);
  const map = {
    basemap: "gray-vector",
    layers: [layer]
  };
  const options = {
    view: {
      center: [-122.436, 37.764],
      zoom: 4
    }
  };
  const [ref, view] = useMap(map, options);
  const toggleSearch = () => {
    setVisible(!visible);
  }
  return (
    <>
      <button onClick={toggleSearch}>{visible ? 'hide' : 'show'} Search</button>
      <div className="mapDiv" ref={ref} />
      <Search mapview={view} showSearch={visible} />
    </>
  );
}

export default App;
