import boardAPI from './api.js';
import DropZone from './dropzone.js';
export default class Item {
  constructor(id, content) {
    const bottomDropZone = DropZone.createDropZone();

    this.elements = {};
    this.elements.root = Item.createRoot();
    this.elements.input = this.elements.root.querySelector('.input');
    this.elements.editbtn = this.elements.root.querySelector('.editbtn');
    this.elements.deletebtn = this.elements.root.querySelector('.deletebtn');

    this.elements.root.dataset.id = id;
    this.elements.input.textContent = content;
    this.content = content;
    this.elements.root.appendChild(bottomDropZone);

    const onBlur = () => {
      const newContent = this.elements.input.textContent.trim();

      if (newContent == this.content) {
        return;
      }

      this.content = newContent;
      boardAPI.updateItem(id, {
        content: this.content,
      });
    };
    this.elements.editbtn.addEventListener('click', () => {
      this.elements.input.focus();
    });
    this.elements.input.addEventListener('blur', onBlur);
    this.elements.deletebtn.addEventListener('click', () => {
      boardAPI.deleteItem(id);
      this.elements.input.removeEventListener('blue', onBlur);
      this.elements.root.parentElement.removeChild(this.elements.root);
    });

    this.elements.root.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', id);
    });

    this.elements.input.addEventListener('drop', (e) => {
      e.preventDefault();
    });
  }

  static createRoot() {
    const range = document.createRange();

    range.selectNode(document.body);

    return range.createContextualFragment(`
    
  <div class="item" draggable="true">
    <div class="input" contenteditable="true"></div>
    <div class="twobtn">
      <button class="tbtn editbtn" )>
        <ion-icon name="create"></ion-icon>
      </button>
      <button class="tbtn deletebtn">
        <ion-icon name="trash-bin"></ion-icon>
      </button>
    </div>
  </div>

    `).children[0];
  }
}

{
  /* <div>
  <div class="item" draggable="true">
    <div class="input" contenteditable="true"></div>
    <div class="twobtn">
      <button class="tbtn editbtn" )>
        <ion-icon name="create"></ion-icon>
      </button>
      <button class="tbtn deletebtn">
        <ion-icon name="trash-bin"></ion-icon>
      </button>
    </div>
  </div>
</div> */
}

{
  /* <div class="item" draggable="true">
            <div class="input" contenteditable="true"></div>
            <div class="twobtn">
              <button class="tbtn editbtn" )>
                <ion-icon name="create"></ion-icon>
              </button>
              <button class="tbtn deletebtn">
                <ion-icon name="trash-bin"></ion-icon>
              </button>
            </div>
            </div> */
}
