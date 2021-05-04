import Vue from 'vue';
import Vuex from 'vuex';
import apis from '@/service/api';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    listStudent: [],
    editStudent: null,
    openForm: true,
    keyWord: '',
    loadMore: true,
    selectedItem: []
  },
  getters: {
    listStudent: state => state.listStudent,
    editStudent: state => state.editStudent,
    openForm: state => state.openForm,
    formData: state => state.formData,
    keyWord: state => state.keyWord,
    loadMore: state => state.loadMore,
    selectedItem: state => state.selectedItem
  },
  actions: {
    async GET_STUDENTS({ commit }) {
      const result = await apis.getStudents();
      commit('SET_STUDENTS', result.data);
      this.state.loadMore = false;
    },
    async ADD_STUDENT({ commit }, payload) {
      const result = await apis.addStudent(payload);
      commit('ADD_STUDENT', result.data);
    },
    async DELETE_STUDENT({ commit }, payload) {
      const result = await apis.deleteStudent(payload);
      commit('DELETE_STUDENT', result.data);
    },
    async GET_STUDENT_BY_ID({ commit }, payload) {
      const result = await apis.getStudentById(payload);
      commit('GET_STUDENT_BY_ID', result.data);
    },
    async EDIT_STUDENT({ commit }, payload) {
      const result = await apis.editStudent(payload, payload.id);
      commit('EDIT_STUDENT', result.data);
    },
    SEARCH_STUDENT({ commit }, payload) {
      commit('SEARCH_STUDENT', payload);
    },
    GET_SELECTED_STUDENT({ commit }, payload) {
      console.log(payload);
      commit('GET_SELECTED_STUDENTS', payload);
    },
    async DELETE_MULTI_STUDENTS({ commit }, payload) {
      for (let id in payload) {
        const result = await apis.deleteStudent(id);
        commit('DELETE_MULTI_STUDENTS', result.data);
      }
    }
  },
  mutations: {
    openForm(state, payload) {
      state.openForm = payload;
    },
    SET_STUDENTS(state, payload) {
      state.listStudent = [...payload];
    },
    ADD_STUDENT(state, payload) {
      state.listStudent.push(payload);
    },
    DELETE_STUDENT(state, payload) {
      state.listStudent.splice(
        state.listStudent.findIndex(item => item.id === payload.id),
        1
      );
    },
    GET_STUDENT_BY_ID(state, payload) {
      state.editStudent = { ...payload };
    },
    EDIT_STUDENT(state, payload) {
      state.listStudent = [...state.listStudent].map(item => {
        return item.id === payload.id ? payload : item;
      });
    },
    SEARCH_STUDENT(state, payload) {
      state.keyWord = payload;
    },
    GET_SELECTED_STUDENTS(state, payload) {
      state.selectedItem = [...payload];
    },
    DELETE_MULTI_STUDENTS(state, payload) {
      [...payload].forEach(item => {
        state.listStudent.splice(
          state.listStudent.findIndex(i => i.id === item),
          1
        );
      });
    }
  }
});
export default store;
