<template>
  <div class="shadow p-3 mb-5 bg-body rounded">
    <button class="btn btn-primary" @click="hidden =!hidden">{{changeText()}}</button>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }" >
      <form @submit.prevent="handleSubmit(addNew)" v-if="!hidden">
        <div class="form-group mt-2">
          <label>Name</label>
          <ValidationProvider v-slot = "{errors,classes}" rules="required|min:4" name="name">
            <input  type="text" class="form-control" v-model="newData.name" />
            <span :class="classes" class="styleSpan">{{ errors[0] }}</span>
          </ValidationProvider>

        </div>
        <ValidationProvider v-slot = "{errors,classes}" rules="required" name="birthday">
        <div class="form-group mt-2">
          <label>Birthday</label>
          <input type="date" class="form-control" v-model="newData.birthday" />
          <span :class="classes" class="styleSpan">{{ errors[0] }}</span>
        </div>
        </ValidationProvider>
        <ValidationProvider v-slot = "{errors,classes}" rules="required" name="address">
        <div class="form-group mt-2">
          <label>Address</label>
          <input type="text" class="form-control" v-model="newData.address" />
          <span :class="classes" class="styleSpan">{{ errors[0] }}</span>
        </div>
        </ValidationProvider>
        <ValidationProvider v-slot = "{errors,classes}" rules="required|numeric" name="telephone">
          <div class="form-group mt-2">
            <label>Telephone</label>
            <input type="text" class="form-control" v-model="newData.telephone" />
            <span :class="classes" class="styleSpan">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <button type="submit" class="btn btn-primary mt-3 mb-3">Add</button>
      </form>
    </ValidationObserver>

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
        return 'Open form'
      } else {
        this.clearForm()
        return 'Close form'
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

<style scoped>
.styleSpan{
  color: red;
  padding: 5px;
  margin-top: 5px;
  text-align: left;
}
</style>
