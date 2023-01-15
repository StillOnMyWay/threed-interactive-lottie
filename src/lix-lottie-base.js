import { LitElement, html, css } from 'lit';
import '@lottiefiles/lottie-player';
import { create } from '@lottiefiles/lottie-interactivity';

/**
 * @author - Threed Software (Christopher Derrell) - https://threedsoftware.com
 * A base class which allows for Lottie Interactivity to work on Wix. Can be tweaked.
 */
export class LixLottieBase extends LitElement {
  constructor() {
    super();
    this.mode = 'scroll';
    this.animationFile =
      'https://assets2.lottiefiles.com/packages/lf20_i9mxcD.json';
    this.debugMode = false;
    this.height = '500px';
    this.lottiePlayer = document.createElement('lottie-player');
    this.lottiePlayer.autoplay = false;
    this.lottiePlayer.src = this.animationFile;
    this.animationControls;
    this.animationOptions;
  }

  render() {
    return html`
        <div style='height:${this.height};'></div>
        <div id="data">
          ${this.lottiePlayer}
        </div>
        <div style='height:${this.height};'></div>
    `;
  }

  firstUpdated() {
    //Check for animationfile URL having been set custom for the first run
    try {
      const data = new URL(this.animationFile);
      this.debugMode && console.log('Loaded the new animation file');
      this.lottiePlayer.src = this.animationFile;
    } catch (err) {
      console.error('Invalid Lottiefiles URL' + err.toString());

      this._fireEvent('error', {
        message: 'Invalid Lottiefiles URL',
        err: err.toString(),
      });
    }
    this.lottiePlayer.addEventListener('ready', async () => {
      this.debugMode && console.log('Lotted & Loaded');

      const options = {
        mode: this.mode,
        player: this.lottiePlayer.getLottie(),
        actions: [
          {
            type: 'seek',
            frames: [0, this.lottiePlayer.getLottie().totalFrames],
          },
        ],
      };
      if (this.mode === 'cursor')
        options.actions[0].position = { x: [0, 1], y: [0, 1] };
      if (this.mode === 'scroll') options.actions[0].visibility = [0, 1.0];
      this.debugMode &&
        console.log(
          'Total Frames:' + this.lottiePlayer.getLottie().totalFrames
        );
      this.debugMode && console.log('options:' + options);
      create(options);
      this._fireEvent('ready', {
        numFrames: this.lottiePlayer.getLottie().totalFrames,
      });
    });
    this.debugMode && console.log('First Updated');
  }

  //This willUpdate Function runs closer to the render method, and is called near to the start
  //of the update cycle.
  /**
   */
  willUpdate(changedProperties) {
    if (
      changedProperties.has('animationfile') ||
      changedProperties.has('animationFile')
    ) {
      this.debugMode && console.log(this.getAttribute('animationfile'));
    }
  }

  //This function runs to let the component know when it should update or not. Returns a boolean.
  shouldUpdate(changedProperties) {
    if (
      changedProperties.has('animationfile') ||
      changedProperties.has('animationFile')
    ) {
      return true;
    }
    return true;
  }

  updated(changedProperties) {
    if (changedProperties.has('debugMode'))
      this.debugMode = this.getAttribute('');
    this.debugMode &&
      console.log(
        'Just Updated. What changed? Glad you asked: ' +
          JSON.stringify(changedProperties)
      );
    this.lottiePlayer.load(this.animationFile);
    this._fireEvent('updated');
  }

  //Aux functions

  /**
   * @param {String} _eventName - The name of the custom event to be fired.
   * @param {Object} _eventDetails - The data stored in that event
   */
  _fireEvent(_eventName, _eventDetails = null) {
    if (_eventName && _eventDetails != null) {
      this.dispatchEvent(
        new CustomEvent(_eventName, {
          detail: _eventDetails,
        })
      );
    } else if (_eventName && _eventDetails == null) {
      this.dispatchEvent(new CustomEvent(_eventName));
    }
  }
}

LixLottieBase.styles = css`p { color: blue }

`;
LixLottieBase.properties = {
  mode: { type: String, reflect: true },
  height: { type: String, reflect: true, attribute: true },
  animationFile: { type: String, attribute: 'animationfile' },
  animationURL: { type: String },
  animation: { type: Object },
  debugMode: { type: Boolean, attribute: 'debug' },
};

customElements.define('lix-lottie', LixLottieBase);
