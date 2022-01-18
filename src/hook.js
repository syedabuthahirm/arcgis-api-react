import { useEffect } from 'react';

export function useEvents(
    obj,
    names,
    callback,
) {
    useEffect(() => {
        if (!obj) {
            return;
        }
        const handles = names.map(name => obj.on(name, callback));
        return function removeHandles() {
            handles.forEach(handle => {
                handle.remove();
            });
        };
    }, [obj, names, callback]);
}

export function useEvent(obj, name, callback) {
    useEvents(obj, [name], callback);
}

export function useWatches(obj, names, callback) {
    useEffect(() => {
        // console.log(obj);
        if (!obj) {
            return;
        }
        const handles = names.map(name => obj.watch(name, callback));
        return function removeHandles() {
            handles.forEach(handle => {
                handle.remove();
            });
        };
    }, [obj, names, callback]);
}

export function useWatch(obj, name, callback) {
    useWatches(obj, [name], callback);
}