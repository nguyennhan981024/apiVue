<template>
  <div class="container" style="position: relative">
    <h1 class="text-center text-success">Student List</h1>
    <Form />
    <Table />
  </div>
</template>

<script>
import Table from '@/components/Table';
import Form from '@/components/Form';
export default {
  name: 'App',
  components: { Form, Table },
  created() {
    this.$store.dispatch('getStudents');
  }
};
</script>

<style></style>
