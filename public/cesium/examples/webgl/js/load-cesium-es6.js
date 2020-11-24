window.CESIUM_BASE_URL = "../Source/";
import * as Cesium from "../../Source/Cesium.js";
window.Cesium = Cesium;

if (!window.startupCalled && typeof window.onload === 'function') {
    window.onload(Cesium);
}
