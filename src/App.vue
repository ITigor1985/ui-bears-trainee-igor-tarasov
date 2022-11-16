<template>
  <div id="app">
    <header>
      <h1>myTrello</h1>
    </header>
    <div class="app-body">
      <ColumnList :columns="allData" />
    </div>
  </div>
</template>

<script>
import ColumnList from "@/components/ColumnList";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  data() {
    return {
      data: [],
    };
  },
  computed: {
    ...mapGetters(["allColumns", "allCards"]),
    allData() {
      this.data = [];
      const columns = this.allColumns;
      const cards = this.allCards;
      columns.forEach((column, index) => {
        this.data.push(column);
        this.data[index].cardsArray = [];
        cards.forEach((card) => {
          if (column.column_id === card.column_id) {
            this.data[index].cardsArray.push(card);
          }
        });
      });
      this.data.sort((a, b) => (a.orderId > b.orderId ? 1 : -1));

      return this.data;
    },
  },
  async created() {
    this.$isLoading(true);
    await this.getColumns();
    await this.getCards();
    this.$isLoading(false);
  },
  components: {
    ColumnList,
  },
  methods: mapActions(["getColumns", "getCards"]),
};
</script>

<style>
::-webkit-scrollbar {
  display: none;
}

#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url(https://i.pinimg.com/originals/75/2e/f8/752ef8714e688eda9528172227d06480.jpg);
  background-attachment: fixed;
  background-size: cover;
  width: 1000cm;
  min-height: 100vh;
}

header {
  background: #f79720;
  /* background: -webkit-linear-gradient(top, #2040f7, #ffd200);
  background: -moz-linear-gradient(top, #2040f7, #ffd200);
  background: linear-gradient(to bottom, #2040f7, #ffd200); */
  background-color: aliceblue;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 1;
}

.app-body {
  margin-top: 60px;
}
</style>
