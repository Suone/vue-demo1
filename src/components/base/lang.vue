<template>
    <div class="lang-container">
        <template v-for="(lang, index) in $i18n.availableLocales">
            <a :href="switchLang(lang)" :key="`lang-${index}`">{{ lang }}</a> |
        </template>
    </div>
</template>

<script>
export default {
    methods: {
        // 切换语言
        switchLang(val) {
            const me = this;
            let routePathInfo = JSON.parse(JSON.stringify(me.$route.path));
            let routeQueryInfo = window.location.search;
            if (me.$route.params.lang && val !== me.$route.params.lang) {
                let routePathList = routePathInfo.split('/');
                if (routePathList.length > 1) {
                    routePathList[1] = val;
                }
                routePathInfo = routePathList.join('/');
            }
            return routePathInfo + routeQueryInfo;
        }
    }
};
</script>

<style lang="scss">

</style>