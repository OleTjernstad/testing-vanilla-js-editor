export function setCursor(
  sel: Selection | null,
  el: HTMLElement,
  innerHTML: string
) {
  // Set cursor in the new element
  const range = document.createRange();
  range.setStart(el, 0);
  range.collapse(true);
  sel?.removeAllRanges();
  sel?.addRange(range);
  el.innerHTML = innerHTML;
}
