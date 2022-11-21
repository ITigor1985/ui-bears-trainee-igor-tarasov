<template>
  <div id="app">
    <div class="wrapper">
      <header>
        <h1 class="header">myTrello</h1>
        <div id="mountain">
          <svg
            class="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shape-rendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              ></path>
            </defs>
            <g class="parallax">
              <use
                xlink:href="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(236, 217, 86, 1)"
              ></use>
              <use
                xlink:href="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(51,102,153,1)"
              ></use>
            </g>
          </svg>
        </div>
      </header>
      <div class="app-body">
        <ColumnList :columns="allData" />
      </div>
      <MyLoader v-if="this.getLoader"></MyLoader>
    </div>
  </div>
</template>

<script>
import ColumnList from "@/components/ColumnList";
import MyLoader from "@/components/MyLoader.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "App",
  data() {
    return {
      data: [],
      toggleLoder: false,
    };
  },
  computed: {
    ...mapGetters(["allColumns", "allCards", "getLoader"]),

    allData() {
      this.data = [];
      const columns = this.allColumns;
      const cards = this.allCards;
      columns.forEach((column, index) => {
        this.data.push(column);
        this.data[index].cardsArray = [];
        cards.forEach((card) => {
          if (column.column_id === card.column_id) {
            if (card.description === "Description") {
              card.description = "";
              this.data[index].cardsArray.push(card);
            } else {
              this.data[index].cardsArray.push(card);
            }
          }
        });
      });
      this.data.sort((a, b) => (a.orderId > b.orderId ? 1 : -1));
      return this.data;
    },
  },
  async created() {
    this.updateToggleLoder(true);
    await this.getColumns();
    await this.getCards();
    this.updateToggleLoder(false);
  },
  components: {
    ColumnList,
    MyLoader,
  },
  methods: {
    ...mapActions(["getColumns", "getCards"]),
    ...mapMutations(["updateToggleLoder"]),
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#mountain {
  display: block;
  position: fixed;
  overflow: hidden;
  width: 100%;
  position: relative;
  bottom: 0;
}

.waves {
  position: fixed;
  width: 100%;
  height: 60px;
  top: 0;
  left: 0;
  margin-bottom: -7px; /*Fix for safari gap*/
  min-height: 60px;
  max-height: 60px;
  z-index: 1;
}

/* Animation */
@-webkit-keyframes move-forever {
  0% {
    transform: translateX(-90px) translateY(0) translateZ(0);
  }

  100% {
    transform: translateX(85px) translateY(0) translateZ(0);
  }
}

@keyframes move-forever {
  0% {
    transform: translateX(-90px) translateY(0) translateZ(0);
  }
  100% {
    transform: translateX(85px) translateY(0) translateZ(0);
  }
}

.parallax > use {
  -webkit-animation: move-forever 25s ease infinite;
  animation: move-forever 25s ease infinite;
}

.parallax > use:nth-child(1) {
  -webkit-animation-delay: -2s;
  -webkit-animation-duration: 7s;
  animation-delay: -2s;
  animation-duration: 7s;
}

.parallax > use:nth-child(2) {
  -webkit-animation-delay: -2s;
  -webkit-animation-duration: 10s;
  animation-delay: -2s;
  animation-duration: 10s;
}

/* ::-webkit-scrollbar {
  display: none;
} */

.wrapper {
  background-image: url(https://i.pinimg.com/originals/75/2e/f8/752ef8714e688eda9528172227d06480.jpg);
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  min-width: 100cm;
  min-height: 100%;
  position: absolute;
}

#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  /* background: -webkit-linear-gradient(top, #2040f7, #ffd200);
  background: -moz-linear-gradient(top, #2040f7, #ffd200);
  background: linear-gradient(to bottom, #2040f7, #ffd200); */
  background-color: #ffffff;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  color: #f5f8f6;
  z-index: 1;
  display: flex;
  justify-content: center;
  text-align: center;
}
.header {
  position: fixed;
  display: block;
  right: 50%;

  z-index: 1000;
  justify-content: center;
  text-align: center;
}
</style>
