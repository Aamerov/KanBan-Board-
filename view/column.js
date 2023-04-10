import boardAPI from './api.js';
import DropZone from './dropzone.js';
import Item from './item.js';

export default class Column {
  constructor(id, title) {
    const topDropZone = DropZone.createDropZone();
    this.elements = {};
    this.elements.root = Column.createRoot();
    this.elements.title = this.elements.root.querySelector('.column-title');
    this.elements.items = this.elements.root.querySelector('.items');

    this.elements.addItem = this.elements.root.querySelector('.add-item');

    this.elements.root.dataset.id = id;
    this.elements.title.textContent = title;
    this.elements.items.appendChild(topDropZone);

    this.elements.addItem.addEventListener('click', () => {
      const newItem = boardAPI.insertItem(id, '');
      this.renderItem(newItem);
    });

    boardAPI.getItems(id).forEach((item) => {
      this.renderItem(item);
    });
  }
  static createRoot() {
    const range = document.createRange();

    range.selectNode(document.body);

    return range.createContextualFragment(`
    <div class="column">
        <div class="column-title"></div>
        <div class="items"></div>
        <button class="add-item" type="button">+ Add</button>
      </div>
    `).children[0];
  }

  renderItem(data) {
    const item = new Item(data.id, data.content);
    console.log(data);
    this.elements.items.appendChild(item.elements.root);
  }
}
