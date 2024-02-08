export class Board {
  constructor({ id = 1, columns = [] } = {}) {
    this.id = id;
    this.columns = columns;
  }
}

export class Column {
  constructor({ id = null, title = null, cards = [] } = {}) {
    this.id = id;
    this.title = title;
    this.cards = cards;
  }
}

export class Card {
  constructor({
    id = null,
    title = null,
    description = null,
    createdAt = new Date(),
  } = {}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
  }
}
