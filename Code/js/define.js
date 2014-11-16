(function (window) {
    'use strict';

    window = window || {};

    function App () {}
    function Data () {}

    window.app = new App();
    window.data = new Data();
    window.data.cache = 1 * new Date();
    window.data.logList = [];

    window.app.log = function (s, module) {

        module = module || "App";

        if (s) {
        	if (console) console.log('['+ (module) + ']: ' + s);
	        window.data.logList.push({
	        	time: new Date(),
	        	module: module,
	        	message: s
	        });
        } else {
        	if (console) console.log(data, app);
        }
    };

    window.app.log("init");

})(window);