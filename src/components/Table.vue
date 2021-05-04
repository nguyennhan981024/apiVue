<template>
  <div class="shadow p-3 mb-5 bg-body rounded">
    <router-link class="btn btn-success" to="/form"> form </router-link>

    <Search />
    <table :class="[tableClass]" style="table-layout: fixed; width: 100%;">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Address</th>
          <th scope="col">Birthday</th>
          <th scope="col">Telephone</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <TableContent v-for="(student, index) in studentList" :key="index" :student="student" :number="index" />
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
      paginate: {
        page: 1,
        perPage: 4,
        offset: 0
      },
      studentList: [],
      tableClass: 'table',
      currentPage: 1,
      searchValue: []
    };
  },
  computed: {
    ...mapGetters(['listStudent', 'keyWord']),

    totalPage() {
      return Math.ceil(this.listStudent.length / this.paginate.perPage);
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
  }
};
</script>

<style scoped></style>
