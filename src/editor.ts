export function setupEditor(element: HTMLButtonElement) {
  element.addEventListener("focusin", (e) => console.log(e));
}

export function pasteHtmlAtCaret(_html: string) {
  // if (window.getSelection) {
  //   let sel = window.getSelection();
  //   let range;
  //   // if (sel?.rangeCount) {
  //   //   range = sel.getRangeAt(0).cloneRange();
  //   //   range.surroundContents(span);
  //   //   sel.removeAllRanges();
  //   //   sel.addRange(range);
  //   //   // span.innerText = 'wrapped'
  //   // }
  //   console.log(sel);
  //   if (sel?.getRangeAt && sel.rangeCount) {
  //     range = sel.getRangeAt(0);
  //     // range.deleteContents();
  //     const el = document.createElement("strong");
  //     const frag = range.createContextualFragment("");
  //     let node;
  //     let lastNode;
  //     while ((node = el.firstChild)) {
  //       lastNode = frag.appendChild(node);
  //     }
  //     range.surroundContents(el);
  //     // range.insertNode(frag);
  //     // Preserve the selection
  //     // if (lastNode) {
  //     range = range.cloneRange();
  //     range.setStartAfter(el);
  //     range.collapse(true);
  //     sel.removeAllRanges();
  //     sel.addRange(range);
  //     // }
  //   }
  // }
}
