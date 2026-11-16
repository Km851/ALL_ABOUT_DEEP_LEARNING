// image-fallback.js - Patches loadImageFromStorage to fall back to ./images/ folder
// This allows local:img-* references to work without IndexedDB (e.g. on GitHub Pages)
(function() {
    'use strict';
    
    const IMAGE_DIR = './images/';
    const EXTENSIONS = ['webp', 'png', 'jpg', 'jpeg', 'gif'];
    
    // Cache of resolved image URLs
    const fileCache = {};
    // Cache of probe results
    const probeCache = {};
    
    // Probe for an image file with various extensions
    async function probeImageFile(imgId) {
        if (probeCache[imgId] !== undefined) return probeCache[imgId];
        
        for (const ext of EXTENSIONS) {
            const url = IMAGE_DIR + imgId + '.' + ext;
            try {
                const resp = await fetch(url, { method: 'HEAD' });
                if (resp.ok) {
                    probeCache[imgId] = url;
                    return url;
                }
            } catch(e) {}
        }
        probeCache[imgId] = null;
        return null;
    }
    
    // Override the async loader to add file fallback
    const origLoadAsync = window.loadImageFromStorageAsync;
    window.loadImageFromStorageAsync = async function(imageRef) {
        // Try original first (IndexedDB)
        if (origLoadAsync) {
            try {
                const result = await origLoadAsync(imageRef);
                if (result) return result;
            } catch(e) {}
        }
        
        // Fallback: try loading from ./images/ folder
        if (typeof imageRef === 'string' && imageRef.startsWith('local:')) {
            const imgId = imageRef.substring(6); // Remove 'local:' prefix
            if (fileCache[imgId]) return fileCache[imgId];
            
            const url = await probeImageFile(imgId);
            if (url) {
                fileCache[imgId] = url;
                return url;
            }
        }
        return null;
    };
    
    // Override sync loader to return cached file URLs
    const origLoad = window.loadImageFromStorage;
    window.loadImageFromStorage = function(imageRef) {
        // Try original first
        if (origLoad) {
            const result = origLoad(imageRef);
            if (result) return result;
        }
        
        // Return cached file URL if we've already probed it
        if (typeof imageRef === 'string' && imageRef.startsWith('local:')) {
            const imgId = imageRef.substring(6);
            if (fileCache[imgId]) return fileCache[imgId];
            
            // Trigger async probe for next render
            probeImageFile(imgId).then(function(url) {
                if (url) {
                    fileCache[imgId] = url;
                    // Trigger re-render after loading
                    if (window.mmRenderer && typeof window.mmRenderer.render === 'function') {
                        window.mmRenderer.render();
                    }
                }
            });
        }
        return null;
    };
    
    console.log('[image-fallback] File-based image fallback active (./images/)');
})();
