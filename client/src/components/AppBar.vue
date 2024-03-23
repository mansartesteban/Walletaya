<template>
    <div class="appbar flex align-items-center justify-content-space-between px-md">
        <div class="flex align-items-center gap-md">
            <img src="/assets/icons/dollars.png" width="48" height="48">
            <div class="page-title">{{ route.meta.title }}</div>
        </div>
        <Avatar letters="EM"></Avatar>
    </div>
</template>

<script setup>
import Avatar from "@/components/Avatar.vue"
import { useRoute } from "vue-router"

const route = useRoute()
</script>

<style scoped>
.appbar {
    height: 64px;
    background: var(--primary);
    position: relative;
}

.appbar::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    height: var(--md);
    background: linear-gradient(180deg, var(--primary) 0%, rgba(0, 0, 0, 0) 100%);
}
</style>