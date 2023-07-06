export function insertAfterElement(sel: Selection | null, el: HTMLElement) {
  let activeElement = sel?.anchorNode;

  // check if node is text content and not the element itself
  if (sel?.anchorOffset && sel?.anchorOffset > 0) {
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
  }
}
