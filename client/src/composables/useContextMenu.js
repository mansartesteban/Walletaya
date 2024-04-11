const items = ref([]);
const position = ref({ x: 0, y: 0 });

const callbacks = {
  onOpen: [],
};

export default () => {
  const open = (e, itemsToShow) => {
    position.value.x = e.touches[0].screenX;
    position.value.y = e.touches[0].screenY;
    items.value = itemsToShow;
    callbacks.onOpen.forEach((cb) => cb());
  };

  const close = () => {
    // opened.value = false;
  };

  const onOpen = (callback) => {
    callbacks.onOpen.push(callback);
  };

  return {
    items,
    position,
    open,
    close,
    onOpen,
  };
};
