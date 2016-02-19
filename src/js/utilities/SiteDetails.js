define(["utilities/OmnyApiRequester", "utilities/CookieManager", "utilities/QueryStringReader"],
    function(omnyApiRequester, cookieManager, queryStringReader) {
        var SiteDetails = {};
        SiteDetails.siteCache = {};
        SiteDetails.getSiteDetails = function(hostname, callback) {
            if(typeof SiteDetails.siteCache[hostname]!="undefined") {
                callback(SiteDetails.siteCache[hostname])
            } else {
                omnyApiRequester.apiRequest("sites", hostname, {
                    success: function(details) {
                        SiteDetails.siteCache[hostname] = details;
                        callback(details);
                    },
                    site: hostname
                });
            }
        };
        SiteDetails.getCurrentSite = function() {
            var site = cookieManager.getCookie("active_site");
            if(!site) {
                site = queryStringReader.getParameter("site");
            }
            return site;
        };
        
        SiteDetails.setCurrentSite = function(site) {
            cookieManager.setCookie("active_site",site,360);
        };
        

        return SiteDetails;
    }
);





