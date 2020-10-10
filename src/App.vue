<template>
    <div id="app">
        <v-nav></v-nav>
        <router-view />
        {{$scripts.zObject.isEmpty({a: 1})}}
    </div>
</template>

<script>
import vNav from '@/components/base/nav';
export default {
    components: { vNav }
};
</script>

<style lang="scss">
</style>
