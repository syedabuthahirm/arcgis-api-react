import { useRef, useEffect } from 'react'
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import Basemap from "@arcgis/core/Basemap";

export default function BaseMapGallery({ mapView }) {
    const basemapGalleryRef = useRef(null);
    useEffect(() => {
        if (mapView !== null && basemapGalleryRef.current) {
            new BasemapGallery({
                view: mapView,
                activeBasemap: 'topo-vector',
                container: basemapGalleryRef.current,
                source: [
                    new Basemap({
                        baseLayers: [],
                        title: "Topographic",
                        thumbnailUrl: 'https://www.arcgis.com/sharing/rest/content/items/6e03e8c26aad4b9c92a87c1063ddb0e3/info/thumbnail/topo_map_2.jpg',
                        id: "topo"
                    }),
                    new Basemap({
                        baseLayers: [],
                        title: "Gray Canvas",
                        thumbnailUrl: 'https://www.arcgis.com/sharing/rest/content/items/6e03e8c26aad4b9c92a87c1063ddb0e3/info/thumbnail/topo_map_2.jpg',
                        id: "canvas"
                    }),
                ],
            });
        }
    }, [mapView]);
    return (
        <div ref={basemapGalleryRef} className="basemapGallery" />
    )
}
