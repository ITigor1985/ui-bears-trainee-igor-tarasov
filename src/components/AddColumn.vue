<template>
  <div>
    <div
      class="link-container"
      v-if="!showInputField"
      @click="showInputField = true"
    >
      <a href="#"><b-icon icon="plus"></b-icon>Add column</a>
    </div>
    <form v-if="showInputField" @submit.prevent="onSubmit">
      <b-input-group id="input-group">
        <b-form-input
          type="text"
          v-model="title"
          placeholder="Enter a column name..."
        ></b-form-input>
        <b-input-group-append>
          <b-button @click="onSubmit" variant="success">
            <b-icon icon="check2" />
          </b-button>
          <b-button @click="showInputField = false" variant="danger">
            <b-icon icon="x" />
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </form>
    <b-modal id="modal-err" v-model="modalErr" centered hide-header hide-footer>
      <div>You need to provide a title to create a new column.</div>
      <b-button
        type="submit"
        variant="success"
        @click="$bvModal.hide('modal-err')"
        >OK</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    columns: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      title: "",
      showInputField: false,
      modalErr: false,
    };
  },
  computed: mapGetters(["allColumns"]),
  methods: {
    ...mapActions(["getColumns", "addColumn"]),
    async onSubmit() {
      if (this.title.trim()) {
        this.$isLoading(true);
        await this.addColumn({
          title: this.title,
          orderId: this.columns.length,
        });
        this.title = "";
        this.showInputField = false;
        //await this.getColumns();

        this.$isLoading(false);
        this.$forceUpdate();
      } else {
        this.modalErr = true;
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 10px;
}

.link-container {
  width: 200px;
  margin: 10px;
  background-color: rgba(46, 47, 49, 0.993);
  padding: 7px;
  border-radius: 5px;
  cursor: pointer;
  opacity: 0.75;
}

.link-container:hover {
  opacity: 0.4;
}

a,
a:hover {
  text-decoration: none;
  color: white;
  width: 100%;
  height: auto;
}

#input-group {
  width: 300px;
  height: auto;
}
</style>
