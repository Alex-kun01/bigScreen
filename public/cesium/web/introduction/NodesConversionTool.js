/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.*/

var NodesConversionTool = {

    depsToNodes: function (moduleName) {
        var modules = {
            "openlayers": "SuperMap iClient for OpenLayers",
            "leaflet": "SuperMap iClient for Leaflet",
            "classic": "SuperMap iClient Classic",
            "mapboxgl": "SuperMap iClient for MapboxGL",
        };
        var data = {
            "id": modules[moduleName],
            "name": modules[moduleName],
            "des": modules[moduleName],
            "children": []
        };
        var clientModules = deps[moduleName];
        for (var clientModule in clientModules) {
            var modules = clientModules[clientModule];
            var childs = [];
            for (var module in modules) {
                if (module !== 'title' && module !== 'description' && modules[module]["modules"]) {
                    modules[module]["modules"].map(function (mod) {
                        childs.push(mod);
                    })
                }
            }
            data["children"].push({
                "name": clientModule,
                "des": clientModules[clientModule].description,
                "children": childs
            });
        }
        return data;
    }
};