if(typeof console == "undefined") {
    console = {log:function(){}};
}

var port = window.location.port?":"+window.location.port:"";

var requireConfig = {
    baseUrl: omnyBaseUrl+'/js',
    waitSeconds: 20,
    shim : {
        "bootstrap" : { "deps" :['jquery'] }
    },
    paths: {
        jquery: 'lib/jquery',
        "jqueryui": 'lib/jquery-ui/js/jquery-ui',
        "bootstrap": 'lib/bootstrap/js/bootstrap.min',
        themes: "//"+window.location.hostname+port+'/themes',
        ext: "https://modules.omny.ca"
    }
};
requirejs.config(requireConfig
);
window.loadPromise = new Promise(function (fulfill, reject){
  window.loaded = fulfill;
  window.failLoad = reject;
});
window.onload = function() {
    requirejs([
        "main"
    ],function(main) {
        main.load();
    });
};
