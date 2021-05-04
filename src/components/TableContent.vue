<template>
  <tr>
    <td><input class="form-check-input" type="checkbox" :value="student.id" v-model="selectedItem" /></td>
    <td style="word-wrap: break-word" v-for="title in titles" :key="title.id">{{ student[title.value] }}</td>
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
  data() {
    return {
      content: {}
    };
  },
  props: {
    student: {
      type: Object,
      default: () => {
        return null;
      }
    },
    titles: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    formatDate() {
      return new Date(this.student.birthday).toDateString();
    },
    selectedItem: {
      get: function() {
        return this.$store.state.selectedItem;
      },
      set: function(newValue) {
        return this.$store.dispatch('GET_SELECTED_STUDENT', newValue);
      }
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
