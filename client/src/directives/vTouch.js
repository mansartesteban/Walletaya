import Touch from "../utils/Touch";

export default (app) => {
  app.directive("touch", {
    mounted(el) {
      let touchable = el.touchableDirective;
      if (!touchable) {
        touchable = Touch(el);
        touchable.mount();
        el.touchableDirective = touchable;
      }

      Object.keys(touchable.events).forEach((event) => {
        event = new Event(event);
        touchable.events[event.type](() => {
          el.dispatchEvent(event);
        });
      });
    },
  });
};
