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
        touchable.events[event.type]((e) => {
          event.view = e.view;
          event.detail = e.detail;
          event.ctrlKey = e.ctrlKey;
          event.altKey = e.altKey;
          event.shiftKey = e.shiftKey;
          event.metaKey = e.metaKey;
          event.touches = e.touches;
          event.targetTouches = e.targetTouches;
          event.changedTouches = e.changedTouches;
          event.scale = e.scale;
          event.rotation = e.rotation;
          el.dispatchEvent(event);
        });
      });
    },
  });
};
