<template>
  <!-- Tab headers container -->
  <div v-if="tabsContent" class="tab-headers scroll-snap-x">
    <nav ref="tabHeaderContainer" class="tab-header-container flex align-items-center">
      <!-- Tab headers -->
      <a class="tab-header" v-for="(tab, i) in tabsContent" :href="getAnchor(tab.props.anchor)">
        <div>{{ tab.props.title }}</div>
      </a>
    </nav>
    <!-- Tab active indicator -->
    <div ref="indicator" class="tab-header-active-indicator" :style="tabHeaderIndicatorStyle"></div>
  </div>

  <!-- Tab contents container -->
  <div ref="tabs" class="tabs-content-container scroll-snap-x">
    <!-- Tab contents -->
    <Tab v-for="tab in tabsContent" v-bind="tab.props">
      <component :is="tab.is" v-bind="tab.attrs"></component>
    </Tab>
  </div>
</template>

<script setup>
import { onMounted, useSlots, watch } from "vue"
import Tab from "@/components/Tab.vue"
import { useRoute } from "vue-router"

const tabs = ref()
const indicator = ref()
const tabHeaderContainer = ref()
const slots = useSlots()
const route = useRoute()
const activeIndex = ref(0)

/**
 * Retrieves the content of tabs by intercepting default slotcontent
 */
const tabsContent = computed(() =>
  slots
    .default()
    .filter((node) => node.type.name === "Tab")
    .map((tab) =>({
        is: tab.children.default,
        attrs: tab.attrs,
        props: tab.props
      }
    ))
  
)

/**
 * Retrieve the dom element of the matching active tab
 */
const activeTabDom = computed(
  () => tabHeaderContainer.value?.children[activeIndex.value || 0]
)

/**
 * The computed style (width and position) of the active tab indicator
 */
const tabHeaderIndicatorStyle = computed(() => ({
  width: `${activeTabDom.value?.offsetWidth}px`,
  transform: `translateX(${activeTabDom.value?.offsetLeft}px)`,
}))

/**
 * 
 * Returns a well formatted anchor for links  
 */
const getAnchor = (anchor) => {
  if (anchor[0] !== "#") {
    anchor = "#" + anchor
  }
  return anchor
}

/**
 * If the hash in the url matches a defined anchor in tabs, set the active index to this
 */
const rematchIndex = () => {
  let foundIndex = tabsContent.value.findIndex(
    (tab) => tab.props.anchor === route.hash
  )
  if (foundIndex > -1) {
    activeIndex.value = foundIndex
  }
}

/**
 * Scrolls into the tabHeader container to match the active section
 * Scrolls into the tabContent container to match the active section
 */
const repositionTabs = () => {
  let scrollHeaderTimeout = null

  tabs.value.scrollBy(window.innerWidth * activeIndex.value, 0)
  // Listen for scroll event on tab contents container
  tabs.value.addEventListener("scroll", (e) => {
    activeIndex.value = Math.round(
      tabs.value.scrollLeft / tabs.value.clientWidth
    )

    let tabHeaders = document.querySelector(".tab-headers")

    // Like a debounce, reaffects the handler each time the function has not been executed
    clearTimeout(scrollHeaderTimeout)
    scrollHeaderTimeout = setTimeout(() => {
      // Search for active tabHeader
      let activeTab = document.querySelector(".tab-header-container")?.children[
        activeIndex.value || 0
      ]

      // If the activeTab go beyond the right of the screen
      if (
        activeTab.offsetLeft + activeTab.offsetWidth >
        tabs.value.clientWidth
      ) {
        // Scroll by the distance needed to show it again on the left
        tabHeaders.scrollBy(
          activeTab.offsetLeft + activeTab.offsetWidth - tabs.value.clientWidth,
          0
        )
      }

      // If the activeTab go beyond the left of the screen
      else if (activeTab.offsetLeft < tabHeaders.scrollLeft) {
        // Scroll by the distance needed to show it again on the right
        tabHeaders.scrollBy(activeTab.offsetLeft - tabHeaders.scrollLeft, 0)
      }

      // Finally clear the callback
      clearTimeout(scrollHeaderTimeout)
    }, 100)
  })
}

watch(() => route.hash, rematchIndex)
onMounted(() => {
  rematchIndex()
  repositionTabs()
})
</script>
