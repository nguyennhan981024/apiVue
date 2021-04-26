<template>
  <form @submit.prevent="addNew">
    <div class="form-group">
      <label>Name</label>
      <input type="text" class="form-control" v-model="newData.name" />
    </div>
    <div class="form-group">
      <label>Birthday</label>
      <input type="date" class="form-control" v-model="newData.birthday" />
    </div>
    <div class="form-group">
      <label>Address</label>
      <input type="text" class="form-control" v-model="newData.address" />
    </div>
    <div class="form-group">
      <label>Telephone</label>
      <input type="text" class="form-control" v-model="newData.telephone" />
    </div>
    <button type="submit" class="btn btn-primary">Add</button>
  </form>
</template>

<script>
export default {
  name: 'Form',
  data() {
    return {
      newData: {
        name: '',
        address: '',
        birthday: '',
        telephone: ''
      }
    };
  },
  computed: {
    editStudent() {
      return this.$store.getters.editStudent;
    }
  },
  methods: {
    addNew() {
      if (!this.newData.id) {
        this.$store.dispatch('addStudent', { ...this.newData });
        this.clearForm();
      } else {
        this.$store.dispatch('editStudent', { ...this.newData });
        this.clearForm();
      }
    },
    clearForm() {
      for (let key in this.newData) {
        this.newData[key] = '';
      }
    }
  },
  watch: {
    editStudent(newValue) {
      this.newData = { ...newValue };
    }
  }
};
</script>

<style scoped></style>
