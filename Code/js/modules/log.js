(function (window, app, data) {

	var list = (data.logList = []);

    app.log = function (s, module) {
        if (s) {
        	if (console) console.log(s);
	        list.push({
	        	time: new Date(),
	        	module: module || "app.js",
	        	message: s
	        });
        } else {
        	if (console) console.log(data, app);
        }
    };
})(window, window.app, window.data);