import { useRef, useEffect, useState } from 'react'
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import { useEvent, useWatch } from '../../hook';

// Link https://developers.arcgis.com/javascript/latest/guide/working-with-props/index.html#watching-properties"

export default function BaseMapGallery({ mapView }) {
    const basemapGalleryRef = useRef(null);
    const [basemapGallery, setBasemapGallery] = useState(null);

    useEffect(() => {
        if (mapView !== null && basemapGalleryRef.current) {
            const basemap = new BasemapGallery({
                view: mapView,
                container: basemapGalleryRef.current,
            });
            setBasemapGallery(basemap);
            basemap.watch('selectionchange', function () {
                console.log('a');
            })
        }
    }, [mapView]);
    const a = function (newValue, oldValue, property, object) {
        console.log("New value: ", newValue,      // The new value of the property
            "<br>Old value: ", oldValue,  // The previous value of the changed property
            "<br>Watched property: ", property,  // In this example this value will always be "basemap.title"
            "<br>Watched object: ", object);     // In this example this value will always be the map object
    }
    useWatch(basemapGallery, 'activeBasemap', a);
    return (
        <div ref={basemapGalleryRef} className="basemapGallery" />
    )
}
