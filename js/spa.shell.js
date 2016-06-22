'use strict';

import spaChat  from './spa.chat';

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

  let stateMap = {
    container: null,
    is_chat_retracted: true,
    anchor_map: {}
  };

  let  elementMap = {};

  let refresh_elementMap = function () {
    let container = stateMap.container;

    elementMap = {
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
  };

  let toggleChat = (do_extend, callback) => {

    let px_chat_ht = elementMap.chat.clientHeight;
    let is_open = px_chat_ht === CONFIG_MAP.chat_extend_height;
    let is_closed = px_chat_ht === CONFIG_MAP.chat_retract_height;
    let is_sliding = !is_open && !is_closed;

    if (is_sliding) return false;

    if (do_extend) {

      do_animate({
        duration: CONFIG_MAP.chat_extend_time,
        timing: timeFraction => {
          return timeFraction;
        },
        draw: progress => {
          elementMap.chat.style.height = progress * CONFIG_MAP.chat_extend_height + 'px';
        }
      });
      elementMap.chat.title = `${CONFIG_MAP.chat_extend_title}`;
      stateMap.is_chat_retracted = false;
      return true;
    };

    do_animate({
      duration: CONFIG_MAP.chat_retract_time,
      timing: timeFraction => {
        return timeFraction;
      },
      draw: progress => {
        elementMap.chat.style.height = progress * CONFIG_MAP.chat_retract_height + 'px';
      }
    });
    elementMap.chat.title = `${CONFIG_MAP.chat_retract_title}`;
    stateMap.is_chat_retracted = true;
    return true;
  };

  let _onClickChat = event => {
    // if (toggleChat(stateMap.is_chat_retracted)) {
      changeAnchorPart({
        chat: ( stateMap.is_chat_retracted ? 'open' : 'closed' )
      });
      // location.hash = `chat:${stateMap.is_chat_retracted ? 'closed' : 'open'}`;
    // };
  };

  let copyAnchorMap = () => {
    return  Object.assign({}, stateMap.anchor_map);
  };

  let changeAnchorPart = ( arg_map ) =>  {
    let anchor_map_revise = copyAnchorMap();
    let key_name, key_name_dep;
    let bool_return = true;

    KEYVAL:
    for ( key_name in arg_map ) {
      if ( arg_map.hasOwnProperty( key_name ) ) {

        if ( key_name.indexOf( '_' ) === 0 ) { continue KEYVAL; }

        anchor_map_revise[key_name] = arg_map[key_name];

        key_name_dep = '_' + key_name;
        if ( arg_map[key_name_dep] ) {
          anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
        }
        else {
          delete anchor_map_revise[key_name_dep];
          delete anchor_map_revise['_s' + key_name_dep];
        }
      }
    }
    try {
      location.hash = `${key_name}:${anchor_map_revise[key_name]}`;
    }
    catch (error) {
      location.hash = stateMap.anchor_map;
      bool_return = false;
    }
    return bool_return;
  };

  let _onHashcChange = event => {
    let anchor_map_previous = copyAnchorMap();
    let anchor_map_proposed, _s_chat_previous, _s_chat_proposed, s_chat_proposed;
    try { anchor_map_proposed = location.hash }
    catch ( error ) {
      location.hash = anchor_map_previous;
      return false;
    }
    stateMap.anchor_map = anchor_map_proposed;

    _s_chat_previous = anchor_map_previous;
    _s_chat_proposed = anchor_map_proposed;

    if ( ! anchor_map_previous || _s_chat_previous !== _s_chat_proposed ) {
      s_chat_proposed = anchor_map_proposed;
      switch ( s_chat_proposed) {
        case '#chat:open':
          toggleChat( true );
          break;
          case '#chat:closed':
            toggleChat( false );
            break;
        default:
          toggleChat( false );
          location.hash = anchor_map_proposed;
      };
    }

    return false;
  };

  let initModule = container => {
    stateMap.container = container;
    stateMap.container.insertAdjacentHTML('beforeEnd', CONFIG_MAP.main_html);
    refresh_elementMap();
    stateMap.is_chat_retracted = true;
    elementMap.chat.title = `${CONFIG_MAP.chat_retract_title}`;
    elementMap.chat.addEventListener('click', _onClickChat);
    spaChat.initModule( elementMap.chat );

    window.addEventListener('hashchange', function (e) {
      _onHashcChange(e);

    });
  };

  return {initModule : initModule};

}());

export default spaShell;
