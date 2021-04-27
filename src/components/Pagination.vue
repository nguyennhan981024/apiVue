<template>
  <nav aria-label="...">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: prevEvent }">
        <a
          @click="handlePage(currentPage-1)"

          class="page-link font-weight-bold"
        >Previous</a
        >
      </li>
      <li class="page-item d-flex">
        <a
          v-for="(page, index) in totalPage"
          :key="index"
          @click="handlePage(index+1)"
          class="page-link"
        >{{ index + 1 }}</a
        >
      </li>
      <li class="page-item" :class="{ disabled: nextEvent }">
        <a
          @click="handlePage(currentPage+1)"
          class="page-link font-weight-bold"
        >Next</a
        >
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  props : {
    listStudent : Array,
    totalPage : Number,
    currentPage : Number,
  },
  computed: {
    prevEvent() {
      return this.totalPage > 1 && this.currentPage === 1;
    },
    nextEvent() {
      return this.totalPage > 1 && this.currentPage === this.totalPage;
    },
  },
  methods:{
    handlePage(index){
      let page = index || 1;
      let perPage = 3;
      let offset = (page - 1) * perPage;
      let paginate = {
        page : page,
        perPage : perPage,
        offset : offset
      }
      this.$emit('handlePage',paginate);
    }
  }
};
</script>

<style></style>
