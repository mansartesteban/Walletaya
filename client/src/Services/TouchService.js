const onDragStart = (callback) => {

}

// Could be used as standalone (element is drag regardless of start/end) or with start/end
const onDrag = (callback) => {

}

const onDragEnd = (callback) => {

}

const onDoubleTap = (callback) => {

}

const onLongTouch = (callback) => {

}

// onMultiTouch ?

export const useTouch = (element) => {
  return {
    onLongTouch,
    onDoubleTap,
    onDragStart,
    onDragEnd,
    onDrag,
  }
}

useTouch(widget).onDoubleTap((e) => {

})