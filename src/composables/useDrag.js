export default (element) => {
  const offset = ref({
    x: 0,
    y: 0,
  });
  const transform = ref({
    x: "0px",
    y: "0px",
  });

  const originalTransform = {
    x: 0,
    y: 0,
  };

  const moving = ref(false);

  onMounted(() => {
    element = unref(element);

    if (!(element instanceof HTMLElement)) {
      throw "Unable to apply useTouch() composable on a non-dom element";
    }
  });

  const startDrag = (e) => {
    moving.value = true;
    offset.value.x = e.changedTouches[0].clientX;
    offset.value.y = e.changedTouches[0].clientY;
    originalTransform.x = parseInt(
      transform.value.x.substr(0, transform.value.x.length - 2),
    );
    originalTransform.y = parseInt(
      transform.value.y.substr(0, transform.value.y.length - 2),
    );
  };

  const drag = (e) => {
    transform.value.x = [
      originalTransform.x + e.changedTouches[0].clientX - offset.value.x,
      "px",
    ].join("");
    transform.value.y = [
      originalTransform.y + e.changedTouches[0].clientY - offset.value.y,
      "px",
    ].join("");
    element.style.transform = `translate(${transform.value.x}, ${transform.value.y})`;
  };

  const stopDrag = (e) => {
    moving.value = false;
  };

  return {
    moving,
    transform,
    startDrag,
    stopDrag,
    drag,
  };
};
