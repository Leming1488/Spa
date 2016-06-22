'use strict';

let spaShell = (function() {
  const CONFIG_MAP = {
    main_html: `<div class="spa-shell-head">
      <div class="spa-shell-head-logo"></div>
      <div class="spa-shell-head-acct"></div>
      <div class="spa-shell-head-search"></div>
    </div>
    <div class="spa-shell-main">
      <div class="spa-shell-main-nav"></div>
      <div class="spa-shell-main-content"></div>
    </div>
    <div class="spa-shell-foot"></div>
    <div class="spa-shell-chat"></div>
    <div class="spa-shell-modal"></div>`,
    chat_extend_time: 250,
    chat_retract_time: 300,
    chat_extend_height: 450,
    chat_retract_height: 15,
    chat_extend_title: 'Щелкните, чтобы свернуть',
    chat_retract_title: 'Щелкните, чтобы раскрыть',
    anchor_schema_map: {
      chat: {
        open: true,
        closed: true
      }
    }
  };

  let state_map = {
    container: null,
    is_chat_retracted: true,
    anchor_map: {}
  };

  let  element_map = {};

  let refresh_element_map = function () {
    let container = state_map.container;

    element_map = {
      container: container,
      chat: container.querySelector('.spa-shell-chat')
    };
  };


  let do_animate = function(options) {
    let start = performance.now();
    requestAnimationFrame(function do_animate(time) {
      let timeFraction = (time - start) / options.duration;
      if (timeFraction > 1) timeFraction = 1;
      let progress = options.timing(timeFraction)
      options.draw(progress);
      if (timeFraction < 1) {
        requestAnimationFrame(do_animate);
      }
    });
  }

  let toggleChat = (do_extend, callback) => {

    let px_chat_ht = element_map.chat.clientHeight;
    let is_open = px_chat_ht === CONFIG_MAP.chat_extend_height;
    let is_closed = px_chat_ht === CONFIG_MAP.chat_retract_height;
    let is_sliding = !is_open && !is_closed;

    if (is_sliding) return false;

    if (do_extend) {

      do_animate({
        duration: CONFIG_MAP.chat_extend_time,
        timing: function(timeFraction) {
          return timeFraction;
        },
        draw: function(progress) {
          element_map.chat.style.height = progress * CONFIG_MAP.chat_extend_height + 'px';
        }
      });
      element_map.chat.title = `${CONFIG_MAP.chat_extend_title}`;
      state_map.is_chat_retracted = false;
      return true;
    };

    do_animate({
      duration: CONFIG_MAP.chat_retract_time,
      timing: function(timeFraction) {
        return timeFraction;
      },
      draw: function(progress) {
        element_map.chat.style.height = progress * CONFIG_MAP.chat_retract_height + 'px';
      }
    });
    element_map.chat.title = `${CONFIG_MAP.chat_retract_title}`;
    state_map.is_chat_retracted = true;
    return true;
  };

  let _onClickChat = event => {
    if (toggleChat(state_map.is_chat_retracted)) {
      history.replaceState(`chat: ${state_map.is_chat_retracted ? 'closed' : 'open'}`, document.title, window.location.pathname);
    };
  };

  let initModule = function(container) {
    state_map.container = container;
    state_map.container.insertAdjacentHTML('beforeEnd', CONFIG_MAP.main_html);
    refresh_element_map();
    state_map.is_chat_retracted = true;
    element_map.chat.title = `${CONFIG_MAP.chat_retract_title}`;
    element_map.chat.addEventListener('click', _onClickChat);
    window.addEventListener('popstate', event => {
      state_map.anchor_map = event.state;
    });
  };

  return {initModule : initModule};

}())

export default spaShell;
