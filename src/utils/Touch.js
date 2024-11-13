import { ref, unref, onMounted } from "vue";

const longTouchTimer = 800;
const doubleTapTimer = 300;

/**
 * Helper composable to attach sugar mobile events on dom elements
 *
 * @onTouch Triggered when the screen is touched
 * @onLongTouch Triggered when the screen is touched at least {longTouchTimer} ms
 * @onDoubleTap Triggered when the screen is touched two times in a row spaced by at most {doubleTapTimer} ms
 * @onDragStart Triggered when the longTouch is triggered to enter drag mode
 * @onDragEnd Triggered when the drag mode is enabled and the digit is released
 * @onDrag Triggered when the drag mode is enabled and thje digit is moving
 * @onTap Triggered when the screen is touched and the digit is released
 */

export default (element) => {
  const isDragging = ref(false);
  const isTouching = ref(false);

  let callbacks = {
    onTap: [],
    onTouch: [],
    onDoubleTap: [],
    onDrag: [],
    onDragStart: [],
    onDragEnd: [],
    onLongTouch: [],
  };

  let longTouchTrigger = null;
  let touchReleaseTrigger = null;

  const mount = () => {
    element = unref(element);

    if (!(element instanceof HTMLElement)) {
      throw "Unable to apply useTouch() composable on a non-dom element";
    }

    // When screen is touched
    element.ontouchstart = (e) => {
      e.preventDefault();
      // Always trigger touch event
      trigger(callbacks.onTouch, e);

      isTouching.value = true;

      // If the screen has already been touched, triggers the doubleTap event
      if (touchReleaseTrigger) {
        trigger(callbacks.onDoubleTap, e);
        touchReleaseTrigger = null;
      }

      // Prepares a function to be called when {longTouchTimer}ms has passed to trigger longTouch and dragStart events
      longTouchTrigger = setTimeout(() => {
        trigger(callbacks.onLongTouch, e);
        trigger(callbacks.onDragStart, e);

        // Enabling drag mode
        isDragging.value = true;
      }, longTouchTimer);
    };

    // When user move his digit
    element.ontouchmove = (e) => {
      e.preventDefault();
      // If drag mode is enable trigger the drag event
      if (isDragging.value) {
        trigger(callbacks.onDrag, e);
        // Resets the touching state and clear the longTouch trigger so the touch and longTouch events are not triggered
        clearTimeout(longTouchTrigger);
      }
    };

    // When the user release his digit
    element.ontouchend = (e) => {
      e.preventDefault();
      // If drag mode is enable, triggers the dragEnd event
      if (isDragging.value) {
        trigger(callbacks.onDragEnd, e);
      }

      // If the drag mode has not been triggered and the digit is still touching, triggers the tap event
      if (!isDragging.value && isTouching.value) {
        trigger(callbacks.onTap, e);

        // Prepares a trigger which clears himself within a delay of {doubleTapTimer}ms, if a second touch is made within this delay, triggers the doubleTap event
        touchReleaseTrigger = setTimeout(
          () => (touchReleaseTrigger = null),
          doubleTapTimer,
        );
      }

      // Resets the helper variables on release
      isTouching.value = false;
      isDragging.value = false;
      clearTimeout(longTouchTrigger);
    };
  };

  /**
   * Trigger an array of callbacks
   * @param {Array} callbacks Callbacks to be called
   * @param {*} event The DOM event which triggers the callback
   * @param  {...any} params Additionnal parameters
   */
  const trigger = (callbacks = [], event = null, ...params) => {
    callbacks.forEach(({ callback, options }) => {
      callback(event, ...params);
      if (options?.vibrate && unref(options.vibrate)) {
        window.navigator.vibrate(
          typeof options.vibrate === "boolean" ? [30] : options.vibrate,
        );
      }
    });
  };

  /**
   * Register a callback to call when the touch event is trigger
   */
  const onTouch = (callback, options) => {
    if (typeof callback === "function") {
      callbacks.onTouch.push({ callback, options });
    }
    return this;
  };

  /**
   * Register a callback to call when the dragStart event is trigger
   */
  const onDragStart = (callback, options) => {
    if (typeof callback === "function") {
      callbacks.onDragStart.push({ callback, options });
    }
    return this;
  };

  /**
   * Register a callback to call when the drag event is trigger
   */
  const onDrag = (callback, options) => {
    if (typeof callback === "function") {
      callbacks.onDrag.push({ callback, options });
    }
    return this;
  };

  /**
   * Register a callback to call when the dragEnd event is trigger
   */
  const onDragEnd = (callback, options) => {
    if (typeof callback === "function") {
      callbacks.onDragEnd.push({ callback, options });
    }
    return this;
  };

  /**
   * Register a callback to call when the doubleTap event is trigger
   */
  const onDoubleTap = (callback, options) => {
    if (typeof callback === "function") {
      callbacks.onDoubleTap.push({ callback, options });
    }
    return this;
  };

  /**
   * Register a callback to call when the longTouch event is trigger
   */
  const onLongTouch = (callback, options) => {
    if (typeof callback === "function") {
      callbacks.onLongTouch.push({ callback, options });
    }
    return this;
  };

  /**
   * Register a callback to call when the tap event is trigger
   */
  const onTap = (callback, options) => {
    if (typeof callback === "function") {
      callbacks.onTap.push({ callback, options });
    }
    return this;
  };

  return {
    isDragging,
    isTouching,
    mount,
    events: {
      touch: onTouch,
      longTouch: onLongTouch,
      doubleTap: onDoubleTap,
      dragStart: onDragStart,
      dragEnd: onDragEnd,
      drag: onDrag,
      tap: onTap,
    },
  };
};

// // - TODO onSwipeUp + speed/acceleration + fingerCount
// // - TODO onSwipeDown + speed/acceleration + fingerCount
// // - TODO onSwipeLeft + speed/acceleration + fingerCount
// // - TODO onSwipeRight + speed/acceleration + fingerCount
// // - TODO onPinch (zoom) + speed/acceleration
// // - TODO onStretch (unzoom) + speed/acceleration
