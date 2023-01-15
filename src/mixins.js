import { LixLottieBase } from './lix-lottie-base';

const ScrollMixin = (superClass) =>
  class extends superClass {
    constructor() {
      super();
      console.log('Constructed Scroll Mixin Class');
      this.mode = 'scroll';
    }
  };
const HoverMixin = (superClass) =>
  class extends superClass {
    constructor() {
      super();

      this.mode = 'cursor';
    }
  };

export const ScrollingLixLottie = ScrollMixin(LixLottieBase);
export const HoverLixLottie = HoverMixin(LixLottieBase);
