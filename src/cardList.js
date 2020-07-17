class CardList {
  constructor(container, arr) {
    this.container = container;
    this.arr = arr;
  }

  addCard(card) {
    this.container.appendChild(card);
  }

  render() {
   this.arr.forEach(card => {
      this.addCard(card.create());
     });
  }
}
export {CardList};
