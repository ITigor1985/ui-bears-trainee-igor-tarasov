<template>
  <div class="container">
    <draggable
      class="container"
      v-model="columnsArray"
      animation="50"
      draggable=".column-card"
      ghostClass="ghost"
      @change="updateColumns($event, columns)"
    >
      <div
        class="column-card"
        v-for="column of columnsArray"
        :key="column.column_id"
      >
        <Column :column="column" :columns="columns" />
        <draggable
          class="draggable-card"
          v-model="column.cardsArray"
          group="cards"
          ghostClass="ghost"
          chosenClass="chosen"
          animation="50"
          @change="updateCards($event, column)"
        >
          <div v-for="card of column.cardsArray" :key="card.card_id">
            <Card :card="card" :column="column" />
          </div>
        </draggable>
        <AddCard :column="column" />
        <hr />
      </div>
      <AddColumn :columns="columns" />
    </draggable>
  </div>
</template>

<script>
import AddCard from "@/components/AddCard";
import AddColumn from "@/components/AddColumn";
import Card from "@/components/Card";
import Column from "@/components/Column";
import { mapActions, mapMutations } from "vuex";
import draggable from "vuedraggable";

export default {
  props: {
    columns: {
      type: Array,
      required: true,
    },
  },
  computed: {
    columnsArray: {
      get() {
        return this.columns;
      },
      set(value) {
        this.updateColumnList(value);
      },
    },
  },
  components: {
    Column,
    Card,
    AddCard,
    AddColumn,
    draggable,
  },
  methods: {
    ...mapActions(["getColumns", "updateColumn", "getCards", "editCard"]),
    ...mapMutations(["updateColumnList"]),

    async updateColumns(event, columns) {
      this.$isLoading(true);

      for (let column of columns) {
        if (
          column.orderId === event.moved.newIndex ||
          column.orderId === event.moved.oldIndex
        ) {
          if (column.orderId === event.moved.newIndex) {
            await this.updateColumn({
              column_id: column.column_id,
              createdAt: column.createdAt,
              title: column.title,
              orderId: event.moved.oldIndex,
            });
          } else {
            await this.updateColumn({
              column_id: column.column_id,
              createdAt: column.createdAt,
              title: column.title,
              orderId: event.moved.newIndex,
            });
          }
        }
        this.$forceUpdate();
      }
      await this.getColumns();
      this.$isLoading(false);
    },

    async updateCards(event, targetColumn) {
      this.$isLoading(true);
      let card;
      let column;

      // check type of action
      // performed on a card and
      // update data of that card
      if (event.added) {
        card = event.added.element; //карта которую перетаскиваем
        column = targetColumn; // столбец в который перетаскиваем

        if (card.description === "") {
          await this.editCard({
            card_id: card.card_id,
            column_id: column.column_id,
            title: card.title,
            desc: "Description",
            orderId: column.cardsArray.indexOf(card.orderId),
          });
        } else {
          // this.$forceUpdate();
          await this.editCard({
            card_id: card.card_id,
            column_id: column.column_id,
            title: card.title,
            desc: card.description,
            orderId: column.cardsArray.indexOf(card.orderId),
          });
        }
      } else if (event.moved) {
        card = event.moved.element;
        column = targetColumn;

        if (card.description === "") {
          await this.editCard({
            card_id: card.card_id,
            column_id: column.column_id,
            title: card.title,
            desc: "Description",
            orderId: column.cardsArray.indexOf(card.orderId),
          });
        } else {
          //this.$forceUpdate();
          await this.editCard({
            card_id: card.card_id,
            column_id: column.column_id,
            title: card.title,
            desc: card.description,
            orderId: column.cardsArray.indexOf(card.orderId),
          });
        }
      }

      // make sure that all orderId
      // of each of the cards corresponds
      // to cards' positiong in the array
      for (let col of this.columnsArray) {
        for (let card of col.cardsArray) {
          try {
            if (card.description === "") {
              await this.editCard({
                card_id: card.card_id,
                column_id: col.column_id,
                title: card.title,
                desc: "Description",
                orderId: col.cardsArray.indexOf(card),
              });
            } else {
              // this.$forceUpdate();
              await this.editCard({
                card_id: card.card_id,
                column_id: col.column_id,
                title: card.title,
                desc: card.description,
                orderId: col.cardsArray.indexOf(card),
              });
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
      await this.getCards();
      this.$forceUpdate();
      this.$isLoading(false);
    },
  },
};
</script>

<style scoped>
.container {
  margin: 0;
  padding: 0;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.column-card {
  max-width: 300px;
  width: 100%;
  height: auto;
  margin: 10px;
  padding: 20px;
  background: inherit;
  border-radius: 2%;
  box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.3);
}
.column-card::before {
  content: "";
  background: inherit;
  box-shadow: inset 0 0 3000px rgba(255, 255, 255, 0.5);
  filter: blur(10px);
  margin: -20px;
}

.draggable-card {
  min-height: 25px;
}

.ghost {
  opacity: 0;
}
</style>
