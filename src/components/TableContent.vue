<template>
  <tr>
    <td style="word-wrap: break-word">{{ student.name }}</td>
    <td style="word-wrap: break-word;">{{ student.address }}</td>
    <td>{{ formatDate }}</td>
    <td>{{ student.telephone }}</td>
    <td>
      <button class="btn btn-warning" @click="editItem(student.id)">
        Edit
      </button>
    </td>
    <td>
      <button class="btn btn-danger" @click="deleteItem(student.id)">
        Delete
      </button>
    </td>
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
        this.$store.dispatch('DELETE_STUDENT', id);
      }
    },
    editItem(id) {
      this.$store.dispatch('GET_STUDENT_BY_ID', id);
      this.$router.push('/form');
    }
  }
};
</script>

<style scoped></style>
