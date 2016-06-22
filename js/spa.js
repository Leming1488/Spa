'use strict';

import spaShell  from './spa.shell';

let spa = (function() {
  let initModule = function( container ) {
    spaShell.initModule( container);
  };
  return { initModule : initModule };
}());


document.addEventListener('DOMContentLoaded', function () {
  let container = document.querySelector('.main-spa');
  spa.initModule(container);
});
