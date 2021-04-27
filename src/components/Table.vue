<template>
  <div class="shadow p-3 mb-5 bg-body rounded">
    <table class="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Address</th>
        <th scope="col">Birthday</th>
        <th scope="col">Telephone</th>
        <th scope="col"></th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <TableContent v-for="(student, index) in listStudent" :key="index" :student="student" :number="index" />
      </tbody>
    </table>
  </div>

</template>

<script>
import { mapGetters } from 'vuex';
import TableContent from '@/components/TableContent';
export default {
  name: 'Table',
  components: { TableContent },
  computed: {
    ...mapGetters(['listStudent'])
  }
};
</script>

<style scoped></style>
