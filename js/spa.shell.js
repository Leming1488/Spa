'use strict';


const CONFIG_MAP = {
  main_html:
  `<div class="spa-shell-head">
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
  anchor_schema_map : {
    chat : {open: true, closed : true }
  }
};

const STATE_MAP = {
  is_chat_retracted: true,
  anchor_map: {}
};


function animate(options) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction от 0 до 1
    let timeFraction = (time - start) / options.duration;
    if (timeFraction > 1) timeFraction = 1;

    // текущее состояние анимации
    let progress = options.timing(timeFraction)

    options.draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}

export default class SpaShell {
  constructor(container) {
    this.container = container;
    this.initModule();
  };

  initModule() {
    this.container.insertAdjacentHTML('beforeEnd', CONFIG_MAP.main_html);
    const ELEMENT_MAP= {
      container: document.querySelector('.main-spa'),
      chat:  document.querySelector('.spa-shell-chat')
    }
    let toggleChat =  (do_extend, callback) => {
      const ELEMENT_MAP= {
        container: document.querySelector('.main-spa'),
        chat:  document.querySelector('.spa-shell-chat')
      }
      let px_chat_ht = ELEMENT_MAP.chat.clientHeight;
      let is_open = px_chat_ht === CONFIG_MAP.chat_extend_height;
      let is_closed = px_chat_ht === CONFIG_MAP.chat_retract_height;
      let is_sliding = ! is_open && ! is_closed;

      if (is_sliding) return false;

      if (do_extend) {

        animate({
          duration: CONFIG_MAP.chat_extend_time,
          timing: function(timeFraction) {
            return timeFraction;
          },
          draw: function(progress) {
            ELEMENT_MAP.chat.style.height = progress * CONFIG_MAP.chat_extend_height + 'px';
          }
        });
        ELEMENT_MAP.chat.title = `${CONFIG_MAP.chat_extend_title}`;
        STATE_MAP.is_chat_retracted = false;
        return true;
      };

      animate({
        duration: CONFIG_MAP.chat_retract_time,
        timing: function(timeFraction) {
          return timeFraction;
        },
        draw: function(progress) {
          ELEMENT_MAP.chat.style.height = progress * CONFIG_MAP.chat_retract_height + 'px';
        }
      });
      ELEMENT_MAP.chat.title = `${CONFIG_MAP.chat_retract_title}`;
      STATE_MAP.is_chat_retracted = true;
      return true;
    };

    let _onClickChat = event => {
      if(toggleChat(STATE_MAP.is_chat_retracted)) {
        history.replaceState(`chat: ${STATE_MAP.is_chat_retracted ? 'closed' : 'open'}`, document.title, window.location.pathname);
      };
    };
    STATE_MAP.is_chat_retracted = true;
    ELEMENT_MAP.chat.title = `${CONFIG_MAP.chat_retract_title}`;
    ELEMENT_MAP.chat.addEventListener('click', _onClickChat);
    window.addEventListener('popstate', event => {
      STATE_MAP.anchor_map = event.state;
      // if (STATE_MAP.anchor_map) {
      //   switch (expression) {
      //     case expression:
      //
      //       break;
      //     default:
      //
      //   }
      // }
    });
  };
};
