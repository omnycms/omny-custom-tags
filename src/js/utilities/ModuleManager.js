define(["utilities/Guid"],
    function(Guid) {

        var ModuleManager = {};
        var moduleConfigurationFunctions = {};
        ModuleManager.setSaveFunction = function(element,func,url) {
            var id = Guid.simpleguid();
            $(element).attr("data-omny-config-id",id);
            $(element).addClass("omny-editable-module-element");
            var configFunc = func;
            moduleConfigurationFunctions[id] = configFunc;
        };
        ModuleManager.getHtml = function(element) {
            var id = $(element).attr("data-omny-config-id");
            if(typeof id == "string" && typeof moduleConfigurationFunctions[id] !="undefined") {
              return moduleConfigurationFunctions[id]();
            }
            return null;
        };

        return ModuleManager;
    }
);
