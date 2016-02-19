define(["utilities/CookieManager", "utilities/QueryStringReader"],
    function(cookieManager, queryStringReader) {
        var CurrentSite = {};
        
        CurrentSite.getCurrentSite = function() {
            var site = cookieManager.getCookie("active_site");
            if(!site) {
                site = queryStringReader.getParameter("site");
            }
            return site;
        };
        
        CurrentSite.setCurrentSite = function(site) {
            cookieManager.setCookie("active_site",site,360);
        };
        

        return CurrentSite;
    }
);





