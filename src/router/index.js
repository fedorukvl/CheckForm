import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const router =new VueRouter({
    mode: 'history',

    routes:[
        {
            path:'/', //В идеале, стартовым путем бы была домашняя страница, но т.к. по ТЗ этот момент не предусмотрен, будем отталкиваться от нее :)
            name:'appeal',
            component: ()=> import('../components/AppealForm.vue'),
        },
        {
            path:'/success',
            name:'success',
            component: ()=> import('../components/pages/Success.vue'),
        },
        {
            path: '*',
            component: ()=> import('../components/pages/Error.vue'),
        }
    ],
})
