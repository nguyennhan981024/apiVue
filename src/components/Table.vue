<template>
  <div class="shadow p-3 mb-5 bg-body rounded">
    <router-link class="btn btn-success" to="/form"> form </router-link>

    <Search />
    <button class="btn btn-danger" @click="deleteAll" v-show="hidden">Delete All</button>
    <table :class="[tableClass]" style="table-layout: fixed; width: 100%;position: relative;">
      <thead>
        <tr>
          <th></th>
          <th v-for="title in titles" :key="title.id" scope="col">{{ title.text }}</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <div class="spinner-border text-success" v-if="loadMore" role="status">
          <span class="sr-only"></span>
        </div>
        <TableContent v-for="(student, index) in studentList" :key="index" :student="student" :number="index" :titles="titles" />
      </tbody>
    </table>
    <Pagination
      :listStudent="studentList"
      @handlePage="handlePage"
      :totalPage="totalPage"
      :currentPage="currentPage"
      @changePerPage="changePerPage"
      class="d-flex justify-content-center mt-5"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TableContent from '@/components/TableContent';
import Pagination from '@/components/Pagination';
import Search from '@/components/Search';
export default {
  name: 'Table',
  components: { Search, Pagination, TableContent },
  data() {
    return {
      hidden: false,
      paginate: {
        page: 1,
        perPage: 4,
        offset: 0
      },
      studentList: [],
      tableClass: 'table',
      currentPage: 1,
      searchValue: [],
      titles: [
        { id: 1, text: 'name', value: 'name' },
        { id: 2, text: 'address', value: 'address' },
        { id: 3, text: 'birthday', value: 'birthday' },
        { id: 4, text: 'telephone', value: 'telephone' }
      ]
    };
  },
  computed: {
    ...mapGetters(['listStudent', 'keyWord', 'selectedItem']),

    totalPage() {
      return Math.ceil(this.listStudent.length / this.paginate.perPage);
    },
    loadMore() {
      return this.$store.getters.loadMore;
    }
  },
  methods: {
    handlePage(index) {
      this.paginate.page = index;
      this.paginate.offset = (this.paginate.page - 1) * this.paginate.perPage;
      this.studentList = this.listStudent.slice(this.paginate.offset, this.paginate.offset + this.paginate.perPage);
      this.currentPage = this.paginate.page;
    },
    handleResize() {
      this.tableClass = window.matchMedia('(max-width: 600px)').matches ? 'table-responsive' : 'table';
    },
    changePerPage(index) {
      this.paginate.perPage = index;
      this.handlePage(this.paginate.page);
    },
    deleteAll() {
      this.$store.dispatch('DELETE_MULTI_STUDENTS', this.selectedItem);
    }
  },
  watch: {
    listStudent(newValue) {
      this.studentList = newValue.slice(this.paginate.offset, this.paginate.offset + this.paginate.perPage);
    },
    searchValue(newValue) {
      this.studentList = [...newValue];
    },
    keyWord(newValue) {
      this.searchValue = [...this.listStudent].filter(item => {
        for (let key in item) {
          if (
            item[key]
              .toString()
              .toLowerCase()
              .includes(newValue.toLowerCase())
          ) {
            return item;
          }
        }
      });
    },
    selectedItem(newValue) {
      newValue.length ? (this.hidden = true) : (this.hidden = false);
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  mounted() {
    this.$store.dispatch('GET_STUDENTS');
    this.loading = false;
  }
};
</script>

<style scoped>
.spinner-border {
  position: absolute;
  left: 50%;
}
</style>
