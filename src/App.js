import React, { useRef, useEffect, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
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

  // const hwyRenderer = {
  //   type: "unique-value",
  //   legendOptions: {
  //     title: "Freeway type"
  //   },
  //   field: "RTTYP",
  //   uniqueValueInfos: [{
  //     value: "S",
  //     label: "State highway",
  //     symbol: {
  //       type: "simple-line",
  //       color: "#e6d800",
  //       width: "6px",
  //       style: "solid"
  //     }
  //   }, {
  //     value: "I",
  //     label: "Interstate",
  //     symbol: {
  //       type: "simple-line",
  //       color: "#e60049",
  //       width: "6px",
  //       style: "solid"
  //     }
  //   }, {
  //     value: "U",
  //     label: "US Highway",
  //     symbol: {
  //       type: "simple-line",
  //       color: "#9b19f5",
  //       width: "6px",
  //       style: "solid"
  //     }
  //   }]
  // };

  // const hwyLayer = new FeatureLayer({
  //   url:
  //     "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/TIGER_Roads_2021_view/FeatureServer/0",
  //   definitionExpression: "MTFC = 'Primary Road'",
  //   renderer: hwyRenderer,
  //   title: "USA Freeway System",
  //   minScale: 0,
  //   maxScale: 0
  // });

  // const citiesRenderer = {
  //   type: "simple", // autocasts as new SimpleRenderer()
  //   symbol: {
  //     type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
  //     size: 5,
  //     color: [0, 255, 255],
  //     outline: null
  //   }
  // };

  // const citiesLayer = new FeatureLayer({
  //   url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/WorldCities/FeatureServer/0",
  //   renderer: citiesRenderer,
  //   definitionExpression: "adm = 'United States of America'"
  // });

  /******************************************************************
   *
   * Set up renderer for visualizing all highways with a single symbol
   *
   ******************************************************************/

  const hwyRenderer = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: {
      type: "simple-line", // autocasts as new SimpleLineSymbol()
      width: 1,
      color: [0, 255, 255, 0.2]
    }
  };

  const hwyLayer = new FeatureLayer({
    url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/TIGER_Roads_2021_view/FeatureServer/0",
    definitionExpression: "MTFC = 'Primary Road'",
    renderer: hwyRenderer,
    minScale: 0,
    maxScale: 0,
    title: "Freeways"
  });

  /******************************************************************
   *
   * Set up renderer for visualizing all states with a single symbol
   *
   ******************************************************************/

  // const statesRenderer = {
  //   type: "simple", // autocasts as new SimpleRenderer()
  //   symbol: {
  //     type: "simple-fill", // autocasts as new SimpleFillSymbol()
  //     color: [0, 0, 0, 0],
  //     outline: {
  //       color: [252, 186, 3],
  //       width: 0.5
  //     }
  //   }
  // };

  // const statesLayer = new FeatureLayer({
  //   url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3",
  //   renderer: statesRenderer
  // });

  const map = {
    basemap: 'gray-vector',
    layers: [layer, hwyLayer]
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
