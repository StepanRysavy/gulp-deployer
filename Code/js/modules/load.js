(function (window, app, data) {
    app.loadCSS = function (url, callback) {

        function afterLoad () {
            app.log ("CSS loaded: " + url, "load.js");

            if (callback) callback();
        }

        // Adding the script tag to the head as suggested before
        var head = document.getElementsByTagName('head')[0];
        var css = document.createElement('link');
        css.href = url;
        css.rel = "stylesheet";
        css.type = "text/css";

        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        css.onreadystatechange = afterLoad;
        css.onload = afterLoad;

        // Fire the loading
        head.appendChild(css);
    };

    app.loadScript = function (url, callback) {

        function afterLoad () {
            app.log ("Script loaded: " + url, "load.js");

            if (callback) callback();
        }

        // Adding the script tag to the head as suggested before
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = url;
        script.async = true;

        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        script.onreadystatechange = afterLoad;
        script.onload = afterLoad;

        // Fire the loading
        head.appendChild(script);
    };
})(window, window.app, window.data);