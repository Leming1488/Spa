'use strict';

let spaChat = (function() {
  const CONFIG_MAP = {
    main_html: `<div style="padding: 1em; color:#fff;">
                  Say Hello
                </div>`,
    settable_map: {}
  };

  let stateMap = {
    container: null
  };

  let  elementMap = {};

  let refresh_elementMap = function () {
    let container = stateMap.container;

    elementMap = {
      container: container,
    };
  };

  let initModule = function(container) {
    stateMap.container = container;
    stateMap.container.insertAdjacentHTML('beforeEnd', CONFIG_MAP.main_html);
    refresh_elementMap();
  };

  return {initModule : initModule};

}());

export default spaChat;
