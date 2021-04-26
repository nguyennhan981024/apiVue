<template>
  <tr>
    <th scope="row">{{ number + 1 }}</th>
    <td>{{ student.name }}</td>
    <td>{{ student.address }}</td>
    <td>{{ formatDate }}</td>
    <td>{{ student.telephone }}</td>
    <td><button class="btn btn-warning" @click="editItem(student.id)">Edit</button></td>
    <td><button class="btn btn-danger" @click="deleteItem(student.id)">Delete</button></td>
  </tr>
</template>

<script>
export default {
  name: 'TableContent',
  props: {
    student: {
      type: Object,
      default: () => {
        return null;
      }
    },
    number: {
      type: Number,
      default: 0
    }
  },
  computed: {
    formatDate() {
      return new Date(this.student.birthday).toDateString();
    }
  },
  methods: {
    deleteItem(id) {
      if (confirm('Are you sure to delete ?')) {
        this.$store.dispatch('deleteStudent', id);
      }
    },
    editItem(id) {
      this.$store.dispatch('getStudentById', id);
    }
  }
};
</script>

<style scoped></style>
