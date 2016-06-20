'use strict';

import SpaShell  from './spa.shell';

document.addEventListener('DOMContentLoaded', function () {
  if(document.querySelector('.main-spa')) {
    let shell = Array.prototype.slice.call(document.querySelectorAll('.main-spa'));
    shell.forEach(container => new SpaShell(container));
  };
});
