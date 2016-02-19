define([],
    function () {
        Guid = {};
        Guid.guid = (function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
            }
            return function () {
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                        s4() + '-' + s4() + s4() + s4();
            };
        })();

        Guid.simpleguid = function () {
            return Guid.guid().replace(/[-]/g, '');
        };
        
        return Guid;
    }
);

