import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';
import attendances from './modules/attendance';
import dorm from './modules/dorm';
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        app,
        user,
        attendances,
        dorm
    }
});

export default store;
