import { createId } from "../utils/createId";
import { setCursor } from "../utils/setCursor";

export function createNewParagraph() {
  const key = createId();
  const el = document.createElement("p");

  el.dataset.key = key;
  const sel = window.getSelection();

  let activeElement = sel?.anchorNode;
  if (activeElement instanceof Node) {
    activeElement = activeElement?.parentElement;
  }
  // find next to editor div parent
  let levels = 0;
  while (activeElement?.parentElement?.id !== "tu-editor") {
    // prevent looping if tu editor is not found
    if (levels > 10) break;
    activeElement = activeElement?.parentElement;
    levels++;
  }

  if (activeElement instanceof HTMLElement) {
    activeElement.insertAdjacentElement("afterend", el);

    setCursor(sel, el, "<br> ");
  }
}
