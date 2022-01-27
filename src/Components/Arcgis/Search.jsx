import React, { useRef, useState, useEffect } from 'react';
import Search from '@arcgis/core/widgets/Search';

export default function SearchWidget({ mapview, showSearch }) {
    const searchElRef = useRef(null);
    const [searchInstance, setSearchInstance] = useState(null);
    useEffect(() => {
        if (mapview !== null) {
            const o = new Search({
                view: mapview,
                visible: false
            });
            mapview.ui.add(o, {
                position: "top-left",
                index: 2
            })
            setSearchInstance(o);
        }
    }, [mapview]);
    useEffect(() => {
        if (searchInstance !== null) {
            searchInstance.visible = showSearch;
        }
    }, [showSearch]);

    return <div ref={searchElRef}></div>;
}
