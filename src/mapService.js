import MapImageLayer from '@arcgis/core/layers/MapImageLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

export const sampleLayers = [
    {
        id: "City",
        visible: false,
        sublayers: [
            {
                id: 0,
                visible: true,
            },
            {
                id: 1,
                visible: false,
            },
        ],
    },
    {
        id: "State",
        visible: false,
        sublayers: [
            {
                id: 2,
                visible: true,
            }
        ],
    },
];

export function createLayers(layers) {
    return new MapImageLayer({
        url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer',
        sublayers: layers
    });
}