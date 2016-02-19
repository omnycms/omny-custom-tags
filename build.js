({
    baseUrl: 'src/js',
    waitSeconds: 20,
    config: {
        text: {
            useXhr: function (url, protocol, hostname, port) {
                return true;
            }
        }
    },
    paths: {
        jquery: 'lib/jquery',
        "jqueryui": 'lib/jquery-ui/js/jquery-ui',
        ext: "https://modules.omny.ca"
    },
    name: "app",
    out: "output/js/app.js"
})
