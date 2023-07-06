import { createId } from "../utils/createId";
import { insertAfterElement } from "../utils/insertAfterElement";
import { setCursor } from "../utils/setCursor";

export function createNewParagraph() {
  const key = createId();
  const el = document.createElement("p");

  el.dataset.key = key;
  const sel = window.getSelection();

  insertAfterElement(sel, el);
  setCursor(sel, el, "<br> ");
}
