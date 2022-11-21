<template>
  <div class="column__wrapper">
    <div class="column-title">
      <form class="column-form" @submit.prevent="editColumnTitle">
        <input class="input-field" type="text" v-model.trim="newTitle" />
      </form>
      <b-button @click="deleteColumn" id="icon-button"
        ><b-icon icon="trash" id="icon"></b-icon
      ></b-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  props: {
    column: {
      type: Object,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      newTitle: this.column.title,
    };
  },
  methods: {
    ...mapActions([
      "getColumns",
      "removeColumn",
      "updateColumn",
      "addColumn",
      "removeCard",
    ]),
    ...mapMutations(["updateToggleLoder"]),
    async deleteColumn() {
      this.updateToggleLoder(true);

      if (this.column.cardsArray.length >= 1) {
        for (let card of this.column.cardsArray) {
          await this.removeCard(card.card_id);
        }
      }

      const count = this.columns.indexOf(this.column);

      await this.removeColumn({
        column_id: this.column.column_id,
        orderId: this.column.orderId,
      });

      for (let i = 0; i < this.columns.length; i++) {
        if (i > count) {
          await this.updateColumn({
            column_id: this.columns[i].column_id,
            createdAt: this.columns[i].createdAt,
            title: this.columns[i].title,
            orderId: i - 1,
          });
        }
      }

      await this.getColumns();
      this.updateToggleLoder(false);
    },
    async editColumnTitle() {
      this.updateToggleLoder(true);
      await this.updateColumn({
        column_id: this.column.column_id,
        createdAt: this.column.createdAt,
        title: this.newTitle,
        orderId: this.column.orderId,
      });
      document.activeElement.blur();
      // await this.getColumns();
      //this.$forceUpdate();
      this.updateToggleLoder(false);
    },
  },
};
</script>

<style>
.column-form {
  width: 230px;
  height: auto;
}

.column-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 5px 5px 0px;
}

.input-field {
  font-weight: bold;
  padding-left: 5px;
  border: none;
  height: 36px;
  background: inherit;
  margin-right: 2px;
  color: rgb(255, 255, 255);
  transition: color 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    background 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  width: 220px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.input-field:focus {
  background: rgb(255, 255, 255);
  border: 1px solid rgb(255, 255, 255);
  color: black;
}

#icon-button {
  color: black;
  background-color: rgb(255, 255, 255);
  border-color: rgb(216, 183, 139);
}

#icon-button:hover {
  background-color: rgb(216, 183, 139);
  border-color: rgb(216, 183, 139);
}

#icon:hover {
  background-color: rgb(216, 183, 139);
  border-color: rgb(216, 183, 139);
  color: white;
  opacity: 0.55;
}
</style>
