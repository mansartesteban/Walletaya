class Widget {
  #title = ref("Widget");
  #icon = ref("window");

  #visible = ref(false);
  #position = ref({
    x: "12.5%",
    y: "12.5%",
  });

  #minimized = ref(false);
  #maximized = ref(true);
  #closed = ref(true);

  constructor(options = {}) {
    this.title = options.title || this.#title;
    this.icon = options.icon || this.#icon;
  }

  get title() {
    return this.#title.value;
  }

  set title(value) {
    // emit titleChanged(value)
    this.#title.value = value;
    return this;
  }

  get icon() {
    return this.#icon.value;
  }

  set icon(value) {
    // emit iconChanged(value)
    this.#icon.value = value;
    return this;
  }

  get visible() {
    return this.#visible.value;
  }

  set visible(value) {
    // emit visibilitchanged(value)
    this.#visible.value = value;
    return this;
  }

  get position() {
    return this.#position.value;
  }

  set position(value) {
    // emit positionChanged(value)
    this.#position.value = value;
    return this;
  }

  get minimized() {
    return this.#minimized.value;
  }

  set minimized(value) {
    // emit minimized
    this.#minimized.value = value;
    return this;
  }

  get maximized() {
    return this.#maximized.value;
  }

  set maximized(value) {
    // emit maximized
    this.#maximized.value = value;
    return this;
  }

  get closed() {
    return this.#closed.value;
  }

  set closed(value) {
    // emit closed
    this.#closed.value = value;
    return this;
  }

  open() {
    this.visible = true;
    this.closed = this.visible;
  }

  close() {
    this.visible = false;
    this.closed = !this.visible;
  }

  toggle() {
    this.visible = !this.visible;
    this.closed = !this.visible;
  }
}

class WidgetService {
  Calculator = new Widget({
    title: "Calculatrice",
    icon: "calculator",
  });
}

export default new WidgetService();

export { Widget, WidgetService };
