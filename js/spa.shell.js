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
  chat_extend_time: 1000,
  chat_retract_time: 300,
  chat_extend_height: 450,
  chat_retract_height: 15
};

export default class SpaShell {
  constructor(container) {
    this.container = container;
    this.initModule();
  };

  initModule() {
    this.container.insertAdjacentHTML('beforeEnd', CONFIG_MAP.main_html);
  };
};
