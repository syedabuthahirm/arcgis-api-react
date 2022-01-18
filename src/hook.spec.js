import { renderHook, act } from '@testing-library/react-hooks'
import { useWatch } from './hook'
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';

test('should increment counter', () => {
    const callbackHandler = jest.fn();
    const spy = jest.spyOn(BasemapGallery.prototype, 'watch').mockImplementation((name, fn) => callbackHandler);
    const basemapGallery = new BasemapGallery({
        view: {},
        container: '#mapDiv'
    });
    const { result } = renderHook(() => useWatch(basemapGallery, 'activebasemap', callbackHandler));
    expect(spy).toHaveBeenCalled();
})