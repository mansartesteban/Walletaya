<template>
  <div
    class="[&:not(.absolute):not(.fixed)]:relative border border-white/20 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:min-h-full before:w-full before:h-full before:backdrop-blur before:rounded-2xl before:z-[-1] before:bg-glass"
  >
    <slot></slot>
  </div>
</template>
