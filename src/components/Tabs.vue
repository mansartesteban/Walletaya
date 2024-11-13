<template>
  <!-- Tab headers container -->
  <div
    v-if="tabsContent"
    class="tab-headers overflow-x-auto overflow-y-clip scrollbar-none scroll-smooth snap-x snap-mandatory user-select-none bg-primary grid h-8 pb-1 sticky top-0"
  >
    <nav
      ref="tabHeaderContainer"
      class="tab-header-container flex items-center"
    >
      <!-- Tab headers -->
      <div
        class="tab-header h-full w-[clamp(100px,100%,150px)] flex items-center justify-center px-4 snap-start cursor-pointer"
        v-for="(tab, i) in tabsContent"
        @click="repositionTab(tab.props.anchor)"
      >
        <div class="overflow-clip whitespace-nowrap text-ellipsis py-1">
          {{ tab.props.title }}
        </div>
      </div>
    </nav>
    <!-- Tab active indicator -->
    <div
      ref="indicator"
      class="tab-header-active-indicator h-[2px] absolute top-[calc(100%-2px)] bg-white transition-all"
      :style="tabHeaderIndicatorStyle"
    ></div>
  </div>

  <template v-for="defaultContent in defaultContents">
    <component
      :is="defaultContent.is"
      v-bind="defaultContent.attrs"
    ></component>
  </template>

  <!-- Tab contents container -->
  <div
    ref="tabs"
    class="tabs-content-container scroll-smooth scrollbar-none overflow-x-auto snap-x snap-mandatory grid grid-flow-col auto-cols-[100%] h-[calc(100%-2rem)]"
  >
    <!-- Tab contents -->
    <Tab
      v-for="tab in tabsContent"
      v-bind="tab.props"
    >
      <component
        :is="tab.is"
        v-bind="tab.props"
      ></component>
    </Tab>
  </div>
</template>

<script setup>
import Tab from "@/components/Tab.vue";
import { useRoute, useRouter } from "vue-router";

const tabs = ref();
const indicator = ref();
const tabHeaderContainer = ref();
const slots = useSlots();
const route = useRoute();
const router = useRouter();
const activeIndex = ref(0);

/**
 * Retrieves the content of tabs by intercepting default slotcontent
 */
const tabsContent = computed(() =>
  slots
    .default()
    .filter((node) => node.type.name === "Tab")
    .map((tab) => ({
      is: tab.children?.default,
      attrs: tab.attrs,
      props: tab.props,
    })),
);

/**
 * Retrieve the dom element of the matching active tab
 */
const activeTabDom = computed(
  () => tabHeaderContainer.value?.children[activeIndex.value || 0],
);

const defaultContents = computed(() => {
  return slots
    .default()
    .filter((node) => node.type.name !== "Tab")
    .map((content) => ({
      is: content,
      attrs: content.attrs,
      props: content.props,
    }));
});

/**
 * The computed style (width and position) of the active tab indicator
 */
const tabHeaderIndicatorStyle = computed(() => ({
  width: `${activeTabDom.value?.offsetWidth}px`,
  transform: `translateX(${activeTabDom.value?.offsetLeft}px)`,
}));

/**
 *
 * Returns a well formatted anchor for links
 */
const getAnchor = (anchor) => {
  if (anchor[0] !== "#") {
    anchor = "#" + anchor;
  }
  return anchor;
};
const attachTabScroll = () => {
  tabs.value.addEventListener("scroll", () => {
    let localActiveIndex = Math.round(
      tabs.value.scrollLeft / tabs.value.clientWidth,
    );
    rematchIndex(tabsContent.value[localActiveIndex].props.anchor);
    repositionTabHeaders();
    router.push({
      name: route.name,
      hash: getAnchor(tabsContent.value[localActiveIndex].props.anchor),
    });
  });
};

/**
 * If the hash in the url matches a defined anchor in tabs, set the active index to this
 */
const rematchIndex = (anchor) => {
  let foundIndex = tabsContent.value.findIndex(
    (tab) => getAnchor(tab.props.anchor) === getAnchor(anchor),
  );
  if (foundIndex > -1) {
    activeIndex.value = foundIndex;
  }
};

const repositionTab = (anchor) => {
  let prevIndex = activeIndex.value;
  rematchIndex(anchor);
  rematchTabView(activeIndex.value - prevIndex);
  repositionTabHeaders();
};

let scrollHeaderTimeout = null;
const repositionTabHeaders = () => {
  // Like a debounce, reaffects the handler each time the function has not been executed
  clearTimeout(scrollHeaderTimeout);
  scrollHeaderTimeout = setTimeout(() => {
    let tabHeaders = document.querySelector(".tab-headers");

    // Search for active tabHeader
    let activeTab = document.querySelector(".tab-header-container")?.children[
      activeIndex.value || 0
    ];

    // If the activeTab go beyond the right of the screen
    if (activeTab.offsetLeft + activeTab.offsetWidth > tabs.value.clientWidth) {
      // Scroll by the distance needed to show it again on the left
      tabHeaders.scrollBy(
        activeTab.offsetLeft + activeTab.offsetWidth - tabs.value.clientWidth,
        0,
      );
    }

    // If the activeTab go beyond the left of the screen
    else if (activeTab.offsetLeft < tabHeaders.scrollLeft) {
      // Scroll by the distance needed to show it again on the right
      tabHeaders.scrollBy(activeTab.offsetLeft - tabHeaders.scrollLeft, 0);
    }

    // Finally clear the callback
    clearTimeout(scrollHeaderTimeout);
  }, 100);
};

const rematchTabView = (direction = 0) => {
  tabs.value.scrollBy(window.innerWidth * direction, 0);
};

onMounted(() => {
  attachTabScroll();
  repositionTab(route.hash);
});
</script>
