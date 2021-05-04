<template>
  <div class="shadow p-3 mb-5 bg-body rounded">
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(addNew)">
        <ValidationProvider
          v-slot="{ errors, classes }"
          v-for="(data, index) in formData"
          :key="index"
          :rules="data.rule"
          :name="data.name"
        >
          <div class="form-group mt-2">
            <label>{{ data.name }}</label>
            <input :type="data.type" class="form-control" v-model="data.model" />
            <span :class="classes" class="styleSpan">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>
        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-primary mt-3 mb-3">Add</button>
          <router-link class="btn btn-secondary mb-3 mt-3" to="/">back</router-link>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  name: 'Form',
  data() {
    return {
      text: '',
      hidden: true,
      newData: {
        name: '',
        birthday: '',
        address: '',
        telephone: ''
      },
      formData: [
        {
          model: '',
          name: 'name',
          type: 'text',
          rule: 'required|min:4'
        },
        {
          model: '',
          name: 'birthday',
          type: 'date',
          rule: 'required'
        },
        {
          model: '',
          name: 'address',
          type: 'text',
          rule: 'required'
        },
        {
          model: '',
          name: 'telephone',
          type: 'text',
          rule: 'required|numeric'
        }
      ]
    };
  },
  computed: {
    openForm() {
      return this.$store.getters.openForm;
    },
    editStudent() {
      return this.$store.getters.editStudent;
    }
  },

  methods: {
    transferObject() {
      const newObject = this.formData.reduce((obj, item) => {
        obj[item.name] = item.model;
        return obj;
      }, {});
      Object.keys(newObject).forEach(key => {
        return (this.newData[key] = newObject[key]);
      });
    },
    addNew() {
      this.transferObject();
      if (!this.newData.id) {
        this.$store.dispatch('ADD_STUDENT', { ...this.newData });
        this.clearForm();
        this.$refs.observer.reset();
        this.$router.push('/');
      } else {
        if (confirm('Are you sure to edit ? ')) {
          this.$store.dispatch('EDIT_STUDENT', { ...this.newData });
          this.clearForm();
          this.$router.push('/');
          this.$refs.observer.reset();
        }
      }
    },
    clearForm() {
      this.formData.forEach(item => {
        item.model = '';
      });
    }
  },
  watch: {
    editStudent(newValue) {
      this.formData.forEach(item => {
        item.model = newValue[item.name];
      });
      this.newData.id = newValue.id;
    },
    openForm(newValue) {
      this.hidden = newValue;
    }
  }
};
</script>

<style scoped>
.styleSpan {
  color: red;
  padding: 5px;
  margin-top: 5px;
  text-align: left;
}
</style>
