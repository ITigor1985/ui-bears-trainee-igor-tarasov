import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/dev";

export default {
  state: {
    cards: [],
  },
  getters: {
    allCards(state) {
      return state.cards;
    },
  },
  actions: {
    async getCards({ commit }) {
      try {
        const res = await axios.get("/cards");
        commit(
          "updateCardsList",
          res.data.sort((a, b) => a.orderId - b.orderId)
        );
      } catch (error) {
        console.log("Failed to get cards.", error);
        commit("updateCardsList", []);
      }
    },

    async addCard({ commit }, { title, columnId, orderId }) {
      try {
        const res = await axios.post("/card", {
          title,
          column_id: columnId,
          orderId,
        });
        commit("addCard", res.data);
      } catch (error) {
        console.log("Failed to create a new card.", error);
      }
    },

    async removeCard({ commit }, card_id) {
      try {
        const res = await axios.delete(`/card/${card_id}`);
        commit("removeCard", card_id);
      } catch (error) {
        console.log("Failed to delete a card.", error);
      }
    },

    async editCard(context, { card_id, column_id, title, desc, orderId }) {
      try {
        const res = await axios.put(`/card/${card_id}`, {
          paramColumnId: column_id,
          paramTitle: title,
          paramDesc: desc,
          paramOrderId: orderId,
        });
      } catch (error) {
        console.log("Failed to edit card title.", error);
      }
    },
  },
  mutations: {
    updateCardsList(state, cards) {
      state.cards = cards;
    },
    addCard(state, newCard) {
      state.cards.push(newCard.Item);
    },
    removeCard(state, card_id) {
      state.cards.filter((card) => card.card_id !== card_id);
    },
  },
};
