(function (window, app, data) {

    app.replaceLinksWithImages = function () {

        app.log("Lazy load start", me);

        var me = "replaceLinksWithImages";

        function loadImage (element) {

            app.log("Lazy load of " + element.getAttribute("href"), me);

            element.innerHTML = '<img src="' + element.getAttribute("href") + '" alt="">';
            element.classList.add("lazy-loading");

            var imgLoad = imagesLoaded(element);
            imgLoad.on('done', function (instance) {
                element.classList.add("lazy-loaded");
                element.classList.remove("lazy-loading");
                
                app.log("IMG loaded: " + element.getAttribute("href"), me);
            });
            imgLoad.on('fail', function (instance) {
                element.classList.add("lazy-loading-error");
                element.classList.remove("lazy-loading");

                app.log("IMG not found: " + element.getAttribute("href"), me);
            });
        }

        function loadSVG (element) {

            app.log("Lazy load of " + element.getAttribute("href"), me);

            var xhr = new XMLHttpRequest();

            xhr.addEventListener("load", function (e) {
                element.appendChild(xhr.responseXML.documentElement);
                element.classList.add("lazy-loaded");
                element.classList.remove("lazy-loading");

                var svg = element.querySelector("svg");
                var svgViewBox = svg.getAttribute("viewBox").split(" ");
                var svgRatio = svgViewBox[3] / svgViewBox[2];
                var svgSpace = svg.offsetWidth;
                svg.setAttribute("height", svgSpace * svgRatio);

                app.log("SVG loaded: " + element.getAttribute("href"), me);

            }, false);
            xhr.addEventListener("error", function (e) {
                element.classList.add("lazy-loading-error");
                element.classList.remove("lazy-loading");

                app.log("SVG not found: " + element.getAttribute("href"), me);
            }, false);
            xhr.open("GET", element.getAttribute("href"), false);
            // Following line is just to be on the safe side;
            // not needed if your server delivers SVG with correct MIME type
            try {
                xhr.overrideMimeType("image/svg+xml");
            } catch (e) {
                app.log("Override Mime Type not supported");
            }
            element.classList.add("lazy-loading");
            xhr.send();            
        }

        var q = document.querySelectorAll(".lazy.img");
        var i = 0;

        for (i = 0; i < q.length; ++i) {
            loadImage(q[i]);
        }

        q = document.querySelectorAll(".lazy.svg");

        for (i = 0; i < q.length; ++i) {
            loadSVG(q[i]);
        }

        app.log("Lazy load complete", me);
    };
})(window, window.app, window.data);