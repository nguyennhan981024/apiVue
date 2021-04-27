<template>
  <div class="shadow p-3 mb-5 bg-body rounded">
    <button class="btn btn-primary" @click="hidden =!hidden">{{changeText()}}</button>
    <form @submit.prevent="addNew" v-show="hidden">
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
      <button type="submit" class="btn btn-primary mt-3 mb-3">Add</button>
    </form>
  </div>

</template>

<script>
export default {
  name: 'Form',
  data() {
    return {
      text : '',
      hidden: true,
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
    },
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
    },
    changeText() {
      if (this.hidden) {
        return 'Close form'
      } else {
        this.clearForm()
        return 'Open form'
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
