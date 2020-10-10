import Vue from 'vue';
import VueRouter from 'vue-router';
import i18n from '@/i18n';
import CONST from '@/constants/config';

Vue.use(VueRouter);

const routes = [
    {
        path: CONST.IS_USE_I18N ? '/:lang' : '/',
        component: () => import('@/views/index.vue'),
        children: [
            {
                path: '',
                redirect: 'home'
            },
            {
                path: 'home',
                component: () => import('@/views/Home.vue')
            },
            {
                path: 'about',
                redirect: 'index',
                component: () => import('@/views/index.vue'),
                children: [
                    {
                        path: 'index',
                        component: () => import('@/views/about/index.vue'),
                    },
                    {
                        path: 'contact',
                        component: () => import('@/views/about/contact.vue'),
                    }
                ]
            },
            {
                path: ':category',
                redirect: 'index',
                component: () => import('@/views/index.vue'),
                children: [
                    {
                        path: 'index',
                        component: () => import('@/views/category/index.vue'),
                    },
                    {
                        path: ':secondCategory',
                        component: () => import('@/views/category/index.vue'),
                    }
                ]
            }
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

if (CONST.IS_USE_I18N) {
    router.beforeEach((to, from, next) => {
        if (to.params.lang && i18n.availableLocales.includes(to.params.lang)) {
            if (to.params.lang !== from.params.lang) {
                i18n.locale = to.params.lang;
            }
            next();
        } else {
            next(`/${i18n.locale || CONST.DEFAULT_LOCALE}`);
        }
    });
}

export default router;
