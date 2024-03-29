<template>
  <!-- Tab headers container -->
  <div v-if="tabsContent" class="tab-headers scroll-snap-x">
    <nav class="tab-header-container flex align-items-center">
      <!-- Tab headers -->
      <a
        class="tab-header"
        v-for="(tab, i) in tabsContent"
        :href="tab.props.anchor"
      >
        <div>{{ tab.props.title }}</div>
      </a>
    </nav>
    <!-- Tab active indicator -->
    <div
      ref="indicator"
      class="tab-header-active-indicator"
      :style="indicatorStyle"
    ></div>
  </div>

  <!-- Tab contents container -->
  <div ref="tabs" class="tabs-content-container scroll-snap-x">
    <!-- Tab contents -->
    <Tab :anchor="tab.props.anchor" v-for="tab in tabsContent">
      <component :is="tab.is" v-bind="tab.attrs"></component>
    </Tab>
  </div>
</template>

<script setup>
import { onMounted, useSlots, watch } from "vue";
import Tab from "@/components/Tab.vue";
import { useRoute, useRouter } from "vue-router";

const slots = useSlots();
const indicator = ref();
const tabs = ref();
const route = useRoute();
const router = useRouter();

/**
 * Retrieves the content of tabs by intercepting default slotcontent
 */
const tabsContent = computed(() =>
  slots
    .default()
    .filter((node) => node.type.name === "Tab")
    .map((tab) => ({
      is: tab.children.default,
      attrs: tab.attrs,
      props: tab.props,
    }))
);

const activeIndex = computed(() =>
  tabsContent.value.findIndex((tab) => tab.props.anchor === route.hash)
);
const activeTab = computed(() => {
  tabsContent.value.find((tab) => tab.props.anchor === route.hash);
});
const activeTabDom = computed(
  () =>
    document.querySelector(".tab-header-container")?.children[
      activeIndex.value || 0
    ]
);
const indicatorStyle = computed(() => ({
  width: `${activeTabDom.value?.offsetWidth}px`,
  transform: `translateX(${activeTabDom.value?.offsetLeft}px`,
}));

const repositionTabsHeader = () => {
  //   // Search for active tabHeader
  //   let activeTab = document.querySelector(".tab-header-container")?.children[
  //     activeIndex.value || 0
  //   ];
  //   // If the activeTab go beyond the right of the screen
  //   if (activeTab.offsetLeft + activeTab.offsetWidth > tabs.value.clientWidth) {
  //     // Scroll by the distance needed to show it again on the left
  //     tabHeaders.scrollBy(
  //       activeTab.offsetLeft + activeTab.offsetWidth - tabs.value.clientWidth,
  //       0
  //     );
  //   }
  //   // If the activeTab go beyond the left of the screen
  //   else if (activeTab.offsetLeft < tabHeaders.scrollLeft) {
  //     // Scroll by the distance needed to show it again on the right
  //     tabHeaders.scrollBy(activeTab.offsetLeft - tabHeaders.scrollLeft, 0);
  //   }
  // let scrollHeaderTimeout = null;
  // Listen for scroll event on tab contents container
  // tabs.value.addEventListener("scroll", (e) => {
  //   let indextoActivate = Math.round(
  //     tabs.value.scrollLeft / tabs.value.clientWidth
  //   );
  // let tabHeaders = document.querySelector(".tab-headers");
  // Like a debounce, reaffects the handler each time the function has not been executed
  // clearTimeout(scrollHeaderTimeout);
  // scrollHeaderTimeout = setTimeout(() => {
  //   // Finally clear the callback
  //   clearTimeout(scrollHeaderTimeout);
  // }, 100);
  // });
};

const repositionTabsContent = () => {};

// const tmp = () => {
//   let tabHeaders = document.querySelector(".tab-headers");

//   // Search for active tabHeader
//   let activeTab = document.querySelector(".tab-header-container")?.children[
//     activeIndex.value || 0
//   ];

//   // console.log("tabheaders", tabHeaders, activeTab);

//   // If the activeTab go beyond the right of the screen
//   if (activeTab.offsetLeft + activeTab.offsetWidth > tabs.value.clientWidth) {
//     // Scroll by the distance needed to show it again on the left
//     tabHeaders.scrollBy(
//       activeTab.offsetLeft + activeTab.offsetWidth - tabs.value.clientWidth,
//       0
//     );
//   }

//   // If the activeTab go beyond the left of the screen
//   else if (activeTab.offsetLeft < tabHeaders.scrollLeft) {
//     // Scroll by the distance needed to show it again on the right
//     tabHeaders.scrollBy(activeTab.offsetLeft - tabHeaders.scrollLeft, 0);
//   }
// };

// watch(activeIndex, repositionIndicator);
watch(
  () => route.hash,
  () => {
    repositionTabsHeader();
    repositionTabsContent();
  }
);
onMounted(() => {
  repositionTabsHeader();
  repositionTabsContent();
  // router.push(tabsContent.value[activeIndex].props.anchor);
});
</script>
