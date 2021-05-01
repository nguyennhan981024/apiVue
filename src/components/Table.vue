<template>
  <div class="shadow p-3 mb-5 bg-body rounded">
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
        <TableContent
          v-for="(student, index) in studentList"
          :key="index"
          :student="student"
          :number="index"
        />
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
import { mapGetters } from "vuex";
import TableContent from "@/components/TableContent";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      paginate:{
        page: 1,
        perPage: 3,
        offset: 0,
      },
      studentList: [],
      tableClass: "table",
      currentPage: 1,
    };
  },

  name: "Table",
  components: { Pagination, TableContent },
  computed: {
    ...mapGetters(["listStudent"]),
    totalPage() {
      return Math.ceil(this.listStudent.length / this.paginate.perPage);
    }
  },
  methods: {
    handlePage(index) {
      this.paginate.page = index;
      this.paginate.offset = (this.paginate.page - 1) * this.paginate.perPage;
      this.studentList = this.listStudent.slice(
        this.paginate.offset,
        this.paginate.offset + this.paginate.perPage
      );
      this.currentPage = this.paginate.page;
    },
    handleResize() {
      this.tableClass = window.matchMedia("(max-width: 600px)").matches
        ? "table-responsive"
        : "table";
    },
    changePerPage(index) {
      this.paginate.perPage = index;
      this.handlePage(this.paginate.page);
    }
  },
  watch: {
    listStudent(newValue) {
      this.studentList = newValue.slice(
        this.paginate.offset,
        this.paginate.offset + this.paginate.perPage
      );
    }
  },

  mounted() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>

<style scoped></style>
