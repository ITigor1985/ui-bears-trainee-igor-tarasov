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
  data() {
    return {
      columnIndex: 0,
    };
  },
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
    ...mapMutations(["updateColumnList", "updateToggleLoder"]),

    async updateColumns(event, columns) {
      this.updateToggleLoder(true);

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
      this.updateToggleLoder(false);
    },

    async updateCards(event, targetColumn) {
      this.updateToggleLoder(true);
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
        this.columnIndex = this.columns.indexOf(column);
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
      console.log(this.columnsArray);
      for (let col of this.columnsArray) {
        if (this.columnsArray.indexOf(col) === this.columnIndex) {
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
      }
      await this.getCards();
      this.$forceUpdate();
      this.updateToggleLoder(false);
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
  position: relative;
  min-width: 300px;
  max-height: 85vh;
  margin: 10px;
  padding: 20px;
  padding-bottom: 40px;
  background: inherit;
  border-radius: 2%;
  box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.3);
}

.column-card::-webkit-scrollbar {
  width: 0 !important;
}
.column-card::before {
  content: "";
  background: inherit;
  box-shadow: inset 0 0 3000px rgba(255, 255, 255, 0.5);
  filter: blur(10px);
  margin: -20px;
}

.draggable-card {
  min-height: 5px;
  max-height: 65vh;
  overflow: hidden;
  overflow-y: scroll;
  padding-right: 10px;
}
/* .draggable-card::-webkit-scrollbar {
  width: 0 !important;
} */

.draggable-card::-webkit-scrollbar {
  width: 12px; /* ширина всей полосы прокрутки */
}

.draggable-card::-webkit-scrollbar-thumb {
  background-color: blue; /* цвет бегунка */
  border-radius: 20px; /* округлось бегунка */
  border: 3px solid rgba(172, 169, 163); /* отступ вокруг бегунка */
}

.ghost {
  opacity: 0;
}
</style>
