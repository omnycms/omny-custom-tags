define(["jquery","utilities/OmnyApiRequester","utilities/SiteDetails"],
    function($,omnyApiRequester,siteDetails) {
        var PageLoader = {};
        PageLoader.loadPage = function(pageName, callback) {
            if (pageName == "") {
                pageName = "default";
            }
            if(pageName.indexOf(".")>=0) {
                pageName = pageName.split(".");
                pageName = pageName[0];
            }
            
            var pageDetailsPromise = new Promise(function (fulfill, reject) {
                omnyApiRequester.apiRequest("pages", "detailed", {
                    data: {
                        page: pageName
                    },
                    success: fulfill,
                    error: reject
                });
            });
            
            var siteDetailsPromise = new Promise(function (fulfill, reject) {
                siteDetails.getSiteDetails(omnyApiRequester.getHostname(),fulfill);
            });
            
            Promise.all([pageDetailsPromise, siteDetailsPromise]).then(function(values) {
               callback(values[0],values[1]); 
            });
        };

        return PageLoader;
    }
);


