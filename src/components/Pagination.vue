<template>
  <div class="d-flex justify-content-between">
    <div>
      <select class="form-select" v-model="selected" @change="changePerPage(selected)">
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
    <div>
      <nav>
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: prevEvent }">
            <a
              @click="handlePage(currentPage - 1)"
              class="page-link font-weight-bold"
            >Previous</a
            >
          </li>
          <li class="page-item d-flex">
            <a
              v-for="(page, index) in totalPage"
              :key="index"
              @click="handlePage(index + 1)"
              class="page-link"
            >{{ index + 1 }}</a
            >
          </li>
          <li class="page-item" :class="{ disabled: nextEvent }">
            <a
              @click="handlePage(currentPage + 1)"
              class="page-link font-weight-bold"
            >Next</a
            >
          </li>
        </ul>
      </nav>
    </div>
    <div></div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      selected: '3'
    }
  },
  props: {
    listStudent: Array,
    totalPage: Number,
    currentPage: Number
  },
  computed: {
    prevEvent() {
      return this.currentPage === 1;
    },
    nextEvent() {
      return this.currentPage === this.totalPage;
    }
  },
  methods: {
    handlePage(index) {
      this.$emit("handlePage", index);
    },
    changePerPage(index){
      this.$emit("changePerPage",parseInt(index));
    }
  }
};
</script>

<style scoped>
a {
  cursor: pointer;
}
</style>
