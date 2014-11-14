(function (window, app, data) {

    'use strict';	

    app.loadCSS("/css/main.css", init);

    function init () {
		app.replaceLinksWithImages();
    	app.log();
    }

})(window, window.app, window.data);
