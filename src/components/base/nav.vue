<template>
    <div class="nav-component-container clearfix">
        <div class="nav-container">
            <template v-for="(nav, index) in navList">
                <div class="nav-item" :key="`nav-${index}`">
                    一级：<router-link :to="handleNavPath(nav)" :title="handleNavPath(nav)">{{nav.title}}</router-link>
                    <ul class="nav-item-second">
                        <li>二级：</li>
                        <li v-for="(navChild, navIndex) in nav.children" :key="navIndex">
                            <router-link :to="handleNavPath(nav, navIndex)">{{navChild.title}}</router-link>
                        </li>
                    </ul>
                </div>
            </template>
        </div>
        <div class="lang-in-nav">
            <v-lang></v-lang>
        </div>
    </div>
</template>

<script>
import mBase from '@/mixins/base';
import vLang from '@/components/base/lang';
export default {
    mixins: [mBase],
    components: { vLang },
    computed: {
        // 导航数据
        navList() {
            let list = [
                {
                    title: '新闻',
                    category: 'news',
                    children: [
                        {
                            title: '最新',
                            category: 'test',
                        }
                    ],
                },
                {
                    title: '关于',
                    category: 'about',
                    children: [
                        {
                            title: '联系我们',
                            category: 'contact',
                        }
                    ]
                }
            ]
            return list;
        }
    },
    methods: {
        // 处理导航路由
        handleNavPath(nav, index = '', params = []) {
            const me = this;
            let path = me.routePathPrefix;
            let firstPath = nav.category;
            if (!firstPath) {
                return;
            }
            path += `/${firstPath}`;
            let secondPath = 'index';
            if (index !== '' && 'children' in nav) {
                if (nav.children.length - 1 >= index) {
                    secondPath = nav.children[index].category;

                }
            }
            if (!secondPath) {
                return;
            }
            path += `/${secondPath}`;
            let pathParams = '';
            if (params.length > 0) {
                pathParams = `-${params.join('-')}`;
                path += `${pathParams}`;
            }
            return path;
        },
        // 获取路由参数
        getRouteParams(keyname) {
            const me = this;
            if (!keyname) {
                return;
            }
            let routeParams = JSON.parse(JSON.stringify(me.$route.params));
            if(!(keyname in routeParams)) {
                return;
            }
            if (!routeParams[keyname].includes('-')) {
                return;
            }
            let params = routeParams[keyname].split('-');
            params = params.filter((t, i) => {
                return i > 0;
            });
            return params;
        }
    }
};
</script>

<style lang="scss">
.nav-component-container{
    font-size: 16px;
    line-height: 1.5;
    border-bottom: 1px solid red;
    .nav-item{
        float: left;
        margin-right: 30px;
        .nav-item-second{
            li {
                float: left;
            }
        }
    }
    .lang-in-nav{
        float: left;
    }
}
@media screen and (max-width: $mediaScreenMaxWidth) {
    .nav-component-container{
        width: px2rem(375);
        font-size: px2rem(32);
    }
}
</style>
