<template>
  <div class="page">
    {{ formModal }}
    <h1 class="page__title">Панель Kanban</h1>
    <button
      class="page__btn"
      @click="$refs.popup.open()"
    >
      Создать задачу
    </button>

    <div class="board">
      <div
        class="board__column"
        v-for="column in board.columns"
        :key="column.id"
      >
        <div class="board__column-header">
          <div>{{ column.title }}</div>
          <div>{{ getCardLength(column.cards) }}</div>
        </div>
        <template v-if="getCardLength(column.cards)">
          <div
            class="board__column-card"
            v-for="card in column.cards"
            :key="card.id"
            @click="openCard(column.id, card.id)"
          >
            <p class="board__column-card__title">{{ card.title }}</p>
            <p class="board__column-card__descr">{{ card.description }}</p>
          </div>
        </template>
        <div v-else>Список пуст</div>
      </div>
    </div>

    <Popup ref="popup">
      <div class="header">
        <div class="title">Добавить задачу</div>
        <div
          class="close"
          @click="closeCard"
        ></div>
      </div>
      <div class="content">
        <div class="form-field">
          <div class="title">Тип задачи</div>
          <Combobox
            v-model="formModal.selectType"
            :options="types"
            :disabled="false"
            :flat-groups="true"
          />
        </div>
        <div class="form-field">
          <div class="title">Название задачи</div>
          <input
            type="text"
            v-model="formModal.title"
            placeholder="Введите название"
          />
        </div>
        <div class="form-field">
          <div class="title">Описание задачи</div>
          <textarea
            v-model="formModal.description"
            placeholder="Введите описание"
          ></textarea>
        </div>
        <div class="form-field">
          <div class="title">Исполнитель</div>
          <Combobox
            v-model="formModal.selectUser"
            :options="users"
            :disabled="false"
            :flat-groups="true"
          />
        </div>
      </div>
      <div class="buttons">
        <input
          type="button"
          class="primary"
          value="Сохранить"
          @click="saveCard"
        />
        <input
          type="button"
          class="ghost"
          value="Отмена"
          @click="closeCard"
        />
      </div>
    </Popup>
  </div>
</template>
<script>
import columns from '@/data/columns';
import types from '@/data/types';
import users from '@/data/users';
import { Board, Column } from '@/board/models';
export default {
  name: 'main',
  data() {
    return {
      columns: columns,
      types: types,
      users: users,
      board: new Board(),
      formModal: {
        id: Math.random(),
        title: '',
        description: '',
        selectType: null,
        selectUser: null,
      },
      isEditFormModal: false,
      columnId: null,
      cardId: null,
    };
  },

  methods: {
    initialColumns() {
      this.board.columns = this.columns.map((column) => {
        return new Column({ id: column.id, title: column.title });
      });
    },
    clearFormModal() {
      this.formModal.title = '';
      this.formModal.description = '';
      this.formModal.selectType = null;
      this.formModal.selectUser = null;
    },
    closeCard() {
      this.clearFormModal();
      this.$refs.popup.cancel();
    },
    openCard(columnId, cardId) {
      this.columnId = columnId;
      this.cardId = cardId;
      this.isEditFormModal = true;
      const findColumn = this.board.columns.find(
        (column) => column.id === columnId
      );
      const findCard = findColumn.cards.find((card) => card.id === cardId);
      this.formModal.title = findCard.title;
      this.formModal.description = findCard.description;
      this.formModal.selectType = findCard.selectType;
      this.formModal.selectUser = findCard.selectUser;
      this.$refs.popup.open();
    },

    saveCard() {
      if (this.isEditFormModal) {
      } else {
        const firstColumn = this.board.columns[0];
        firstColumn.cards = [
          ...this.board.columns[0].cards,
          { ...this.formModal },
        ];
      }

      this.clearFormModal();
      this.isEditFormModal = false;
      this.$refs.popup.accept();
    },
    getCardLength(cards) {
      return cards.length;
    },
  },
  mounted() {
    this.initialColumns();
  },
};
</script>

<style lang="scss">
.page {
  min-height: 100vh;
  padding: 20px;

  &__title {
    margin-top: 0;
    margin-bottom: 40px;
  }

  &__btn {
    margin-bottom: 20px;
  }
}

.board {
  display: flex;
  align-items: flex-start;
  gap: 10px;

  &__column {
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: 200px;
    padding: 5px;
    background: #ffffff;
    box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.05),
      0px 0px 0px rgba(40, 47, 61, 0.12);
    border: 1px solid rgba(16, 24, 40, 0.25);
    border-radius: var(--input-border-radius);

    &-header {
      display: flex;
      gap: 10px;

      div:last-child {
        margin-left: auto;
      }
    }
    &-card {
      display: flex;
      flex-direction: column;
      gap: 5px;
      padding: 5px;
      box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.05),
        0px 0px 0px rgba(40, 47, 61, 0.12);
      border: 1px solid rgba(16, 24, 40, 0.25);
      border-radius: var(--input-border-radius);

      &__title,
      &__descr {
        margin: 0;
      }

      &:hover {
        box-shadow: 0px 0px 16px rgba(28, 41, 61, 0.05),
          0px 4px 8px rgba(28, 41, 61, 0.06);
        cursor: pointer;
      }
    }
  }
}
</style>
