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
      return  this.currentPage === 1;
    },
    nextEvent() {
      return this.currentPage === this.totalPage;
    },
  },
  methods:{
    handlePage(index){
      this.$emit('handlePage',index);
    }
  }
};
</script>

<style></style>
