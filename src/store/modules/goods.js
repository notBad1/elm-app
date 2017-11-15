/**
 * Created by Administrator on 2017/11/8.
 */
// state 状态 说的简单一些就是变量，也就是所谓的状态
const state = {

};

// getters getters上简单来说就是存放一些公共函数供组件调用
// Getters 接受 state 作为其第一个参数，Getters 也可以接受其他 getters 作为第二个参数
const getters = {
};

// actions mutation 像事件注册，需要相应的触发条件。而 Action 就那个管理触发条件的。
// Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，
// 因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。
const actions = {
};

// mutations  mutations 上存放的一般就是我们要改变 state 的一些方法
const mutations = {
};

export default {
  state,
  getters,
  actions,
  mutations
};
