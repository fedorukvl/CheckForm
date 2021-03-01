import Vue from 'vue';
import VueRouter from 'vue-router';
import AppealForm from '../components/AppealForm.vue';
import Success from '../components/pages/Success.vue';
import Error from '../components/pages/Error.vue';
Vue.use(VueRouter);

export const router =new VueRouter({
    mode: 'history',

    routes:[
        {
            path:'/', //В идеале, стартовым путем бы была домашняя страница, но т.к. по ТЗ этот момент не предусмотрен, будем отталкиваться от нее :)
            name:'appeal',
            component: AppealForm,
        },
        {
            path:'/success',
            name:'success',
            component: Success,
        },
        {
            path: '*',
            component: Error,
        }
    ],
})
