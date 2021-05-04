<template>
  <nav class="navbar">
    <form class="d-flex justify-content-center container">
      <div class="col-9">
        <input class="form-control" type="search" placeholder="Search" aria-label="Search" v-model="search" />
      </div>
      <div class="">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </div>
    </form>
  </nav>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      search: ''
    };
  },
  watch: {
    search(newValue) {
      this.$store.dispatch('SEARCH_STUDENT', newValue);
    }
  }
};
</script>

<style scoped></style>
