'use strict';

let spaChat = (function() {
  const CONFIG_MAP = {
    main_html: `<div class="spa-chat">
                  <div class="spa-chat-head">
                    <div class="spa-chat-head-toggle">+</div>
                    <div class="spa-chat-head-title">Chat</div>
                  </div>
                  <div class="spa-chat-closer">x</div>
                  <div class="spa-chat-main">
                    <div class="spa-chat-main-nav"></div>
                    <div class="spa-chat-main-content"></div>
                  </div>
                  <div class="spa-chat-foot"></div>
                  <div class="spa-chat-chat"></div>
                  <div class="spa-chat-modal"></div>
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
