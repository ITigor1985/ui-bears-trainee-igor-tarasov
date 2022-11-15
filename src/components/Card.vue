<template>
  <div>
    <div class="card-title">
      <h5 class="card-box" @click="modalShow = !modalShow">{{ card.title }}</h5>
      <b-button @click="deleteCard" class="icon-button"
        ><b-icon icon="trash" class="icon"></b-icon
      ></b-button>
    </div>

    <b-modal
      id="modal-win"
      v-model="modalShow"
      centered
      hide-header
      hide-footer
    >
      <b-form @submit.prevent="edit">
        <b-form-group label="Card Title">
          <b-form-input v-model.trim="cardTitle" />
        </b-form-group>
        <b-form-group label="Card Description">
          <b-form-input v-model.trim="cardDesc" />
        </b-form-group>
        <b-button
          type="submit"
          variant="success"
          @click="$bvModal.hide('modal-win')"
          >OK</b-button
        >
      </b-form>
    </b-modal>

    <b-modal id="modal-err" v-model="modalErr" centered hide-header hide-footer>
      <div>Please fill in both of the fields when editing a card.</div>
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
import { mapActions } from "vuex";
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
    column: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      modalShow: false,
      modalErr: false,
      cardTitle: this.card.title,
      cardDesc: this.card.description,
    };
  },
  methods: {
    ...mapActions(["getCards", "removeCard", "editCard"]),
    async deleteCard() {
      this.$isLoading(true);
      await this.removeCard(this.card.card_id);
      const cardsArray = this.column.cardsArray;
      for (let card of cardsArray) {
        if (card.orderId !== cardsArray.indexOf(card)) {
          await this.editCard({
            card_id: card.card_id,
            column_id: card.column_id,
            title: card.title,
            desc: card.description,
            orderId: cardsArray.indexOf(card),
          });
        }
      }

      await this.getCards();
      this.$isLoading(false);
    },
    async edit() {
      if (this.cardTitle && this.cardDesc) {
        this.$isLoading(true);
        await this.editCard({
          card_id: this.card.card_id,
          column_id: this.card.column_id,
          title: this.cardTitle,
          desc: this.cardDesc,
          orderId: this.card.orderId,
        });

        await this.getCards();
        this.$isLoading(false);
      } else {
        this.modalErr = true;
        this.cardTitle = this.card.title;
        this.cardDesc = this.card.description;
      }
    },
  },
};
</script>

<style scoped>
.card-title {
  width: 100%;
  height: 100%;
  background: rgb(255, 255, 255);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 1px 1px 5px 0px rgb(230, 217, 45);
}

.card-title:hover {
  opacity: 0.7;
}

.card-box {
  white-space: nowrap;
  overflow: hidden;

  padding-top: 3px;
}

.icon-button {
  background: rgb(255, 255, 255);
  color: black;
  border: none;
  border-width: 0px;
}

.icon-button:hover {
  background-color: rgb(216, 183, 139);
  border-color: rgb(216, 183, 139);
}

.icon:hover {
  background-color: rgb(216, 183, 139);
  border-color: rgb(216, 183, 139);
  opacity: 0.75;
}
</style>
