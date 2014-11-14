(function (window) {
    'use strict';

    window = window || {};

    function App () {}
    function Data () {}

    window.app = new App();
    window.data = new Data();
    window.data.cache = 1 * new Date();

})(window);