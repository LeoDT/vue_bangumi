import Vue from 'vue';
import Router from 'vue-router';

import App from './components/App.vue';
import Bangumi from './components/Bangumi.vue';

Vue.use(Router);

var router = new Router();

router.map({
    '/': {
        component: Bangumi
    },
    '/:season': {
        name: 'bangumi',
        component: Bangumi
    }
});

Vue.config.debug = true;

router.start(App, '#app');
