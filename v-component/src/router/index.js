import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import picInput from '@/components/pic-input/index'
import emoji from '@/components/emoji/'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/picInput',
            name: 'picInput',
            component: picInput
        },
        {
            path: '/emoji',
            name: 'emoji',
            component: emoji
        }
    ]
})