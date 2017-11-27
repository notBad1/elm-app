/**
 * Created by Administrator on 2017/11/8.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import Seller from './modules/seller';
import Goods from './modules/goods';
import Ratings from './modules/ratings';
import Cart from './modules/cart';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Seller,
    Goods,
    Ratings,
    Cart
  }
});
