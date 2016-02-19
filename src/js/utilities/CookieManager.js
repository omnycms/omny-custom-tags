define([],
        function() {
            var CoookieManager = {};
            //from w3schools http://www.w3schools.com/js/js_cookies.asp
            CoookieManager.setCookie=function(cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays*24*60*60*1000));
                var expires = "expires="+d.toGMTString();
                document.cookie = cname + "=" + cvalue + "; " + expires;
            };
            
            CoookieManager.getCookie = function(cname) {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for(var i=0; i<ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0)==' ') c = c.substring(1);
                    if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
                }
                return false;
            }
                

            return CoookieManager;
        }
);



