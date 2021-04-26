import Vue from 'vue';
import Vuex from 'vuex';
import apis from '@/service/api';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    listStudent: [],
    editStudent: null
  },
  getters: {
    listStudent: state => state.listStudent,
    editStudent: state => state.editStudent
  },
  actions: {
    async getStudents({ commit }) {
      const result = await apis.getStudents();
      commit('getStudents', result.data);
    },
    async addStudent({ commit }, payload) {
      const result = await apis.addStudent(payload);
      commit('addStudent', result.data);
    },
    async deleteStudent({ commit }, payload) {
      const result = await apis.deleteStudent(payload);
      commit('deleteStudent', result.data);
    },
    async getStudentById({ commit }, payload) {
      const resutl = await apis.getStudentById(payload);
      commit('getStudentById', resutl.data);
    },
    async editStudent({ commit }, payload) {
      const result = await apis.editStudent(payload, payload.id);
      commit('editStudent', result.data);
    }
  },
  mutations: {
    getStudents(state, payload) {
      state.listStudent = [...payload];
    },
    addStudent(state, payload) {
      state.listStudent.push(payload);
    },
    deleteStudent(state, payload) {
      state.listStudent.splice(
        state.listStudent.findIndex(item => item.id === payload.id),
        1
      );
    },
    getStudentById(state, payload) {
      state.editStudent = { ...payload };
    },
    editStudent(state, payload) {
      state.listStudent = [...state.listStudent].map(item => {
        return item.id === payload.id ? payload : item;
      });
    }
  }
});
export default store;
