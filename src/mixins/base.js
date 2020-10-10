export default {
    computed: {
        // 当前语言环境路由前缀
        routePathPrefix() {
            const me = this;
            return me.$const.config.IS_USE_I18N ? `/${me.$i18n.locale}` : '';
        }
    }
}