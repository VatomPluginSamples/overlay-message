import { BasePlugin, BaseComponent } from 'vatom-spaces-plugins'

/**
 * Overlay Message plugin.
 *
 * All information regarding plugin development can be found at
 * https://developer.vatom.com/plugins/plugins/
 *
 * @license MIT
 * @author Vatom Inc.
 */


// NOTE:
// For manual upload of plugin use the following instead of
// 'import  and 'export default' statements.
// module.exports = class ...


export default class OverlayMessagePlugin extends BasePlugin {
  //================ properties of class OverlayMessagePlugin

  // Plugin ID
  static get id()             { return 'toast-notice' }
  static get name()           { return 'Toast Notice' } 
  //
  // Client instance properties
  //myHudState        = null;   // What is currently showing on the hud?
  mySplashIsVisible = false;


  //================ methods for class OverlayMessagePlugin

  onLoad() {

    // Prepare a HUD display.
    this.menus.register({
      id:       'hud',
      title:    'hudmenu-label',
      text:     'hudmenu-text',
      section:  'overlay-top',
      panel: {
          iframeURL: this.paths.absolute('hud.html'),
          width: 600,
          height: 600
      }
    });
    //
    // Create buttons in the toolbar.
    this.menus.register({
      id: 'menu-toggle',
      icon: this.paths.absolute('button-icon.png'),
      text: 'Toggle',
      action: () => this.onBtnToggle(),
    });
  }// onLoad()

  updateHudView() {
    if( this.mySplashIsVisible ){
      const htmlPollResults
          = '<div style="color: black; background-color: #ffffff; font-size: 24px;">'
              + '<br><br><br><br><br><br>'
              + '<br>....................'
              + '<br>You Got It!'
              + '<br>....................'
              + `<br> \u2663`
          + '</div>';

      console.log(htmlPollResults);
    
      this.menus.postMessage({ action: 'hud-set', src: htmlPollResults });
      return;
    }else{
      this.menus.postMessage({ action: 'hud-clear' });
    }
  }// updateHudView()

  onBtnToggle() {
    console.log(`onBtnToggle`);
    //
    this.mySplashIsVisible = !(this.mySplashIsVisible);
    this.updateHudView();
  }


}// class OverlayMessagePlugin ===========================================================
