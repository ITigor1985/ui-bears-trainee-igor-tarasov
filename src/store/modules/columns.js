import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/dev";

export default {
  state: {
    columns: [],
  },
  getters: {
    allColumns(state) {
      return state.columns;
    },
  },
  actions: {
    async getColumns({ commit }) {
      try {
        console.log("Hello");
        const res = await axios.get("/columns");
        commit("updateColumnList", res.data);
      } catch (error) {
        console.log("Failed to get columns.", error);
        commit("updateColumnList", []);
      }
    },

    async addColumn({ commit }, { title, orderId }) {
      try {
        console.log("Hello");
        const res = await axios.post("/column", {
          title,
          orderId,
        });
        commit("addColumn", res.data);
      } catch (error) {
        console.log("Failed to create a new column.", error);
      }
    },

    async removeColumn({ commit }, { column_id }) {
      try {
        const res = await axios.delete(`/column/${column_id}`);
        commit("removeColumn", column_id);
      } catch (error) {
        console.log("Failed to delete a column.", error);
      }
    },

    async updateColumn({ commit }, { column_id, createdAt, title, orderId }) {
      try {
        const res = await axios.put(`/column/${column_id}`, {
          title,
          orderId,
          createdAt,
        });
      } catch (error) {
        console.log("While updating failed to create a new column", error);
      }
    },
  },
  mutations: {
    updateColumnList(state, columns) {
      state.columns = columns;
    },
    addColumn(state, newColumn) {
      state.columns.push(newColumn);
    },
    removeColumn(state, column_id) {
      state.columns.filter((col) => col.column_id !== column_id);
    },
  },
};
