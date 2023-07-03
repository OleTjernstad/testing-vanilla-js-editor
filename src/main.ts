import "./style.css";

import { Content, TextLevel } from "./types";

// setupEditor(document.querySelector<HTMLButtonElement>("#tu-editor")!);

// const button = document.querySelector<HTMLButtonElement>("#paste");

// button?.addEventListener("click", () =>
//   pasteHtmlAtCaret("<strong>Inserted</strong>")
// );

const acceptedElements = ["h1", "h2", "h3", "h4", "h5", "h6", "p"];

export class TuEditor {
  private editorEl: HTMLDivElement;

  private onChange: (content: Content) => void;

  constructor(onChange: (content: Content) => void) {
    this.editorEl = document.querySelector("#tu-editor")!;
    this.editorEl.contentEditable = "true";
    this.editorEl.role = "textbox";
    this.onChange = onChange;
    this.editorEl.addEventListener("keydown", this.listenerEditor);
    this.editorEl.addEventListener("input", console.log);
    this.editorEl.addEventListener("blur", () => this._parseContent());
  }

  /**
   * 
 In most browsers, you need the Range and Selection objects. You specify each of the selection boundaries as a node and an offset within that node. For example, to set the caret to the fifth character of the second line of text, you'd do the following:

function setCaret() {
    var el = document.getElementById("editable")
    var range = document.createRange()
    var sel = window.getSelection()
    
    range.setStart(el.childNodes[2], 5)
    range.collapse(true)
    
    sel.removeAllRanges()
    sel.addRange(range)
}
   */

  private listenerEditor(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const key = createId();
      const el = document.createElement("p");
      el.innerHTML = "<br />";
      el.dataset.key = key;
      window
        .getSelection()
        ?.anchorNode?.parentElement?.insertAdjacentElement("afterend", el);
    }
  }

  private _parseContent() {
    const elements = Array.from(this.editorEl.children);
    console.log(elements);

    const newContent: Content = [];

    for (const el of elements) {
      const key = el.getAttribute("data-key") ?? "";
      const innerHtml = el.innerHTML ?? "";

      const type = this.getBlockType(el.localName);
      if (type === "text") {
        newContent.push({
          key,
          type,
          data: {
            level: (el.localName as TextLevel) ?? "p",
            text: innerHtml,
          },
        });
      }
    }
    this.onChange(newContent);
  }

  private getBlockType(localName: string | undefined) {
    if (acceptedElements.includes(localName ?? "p")) {
      return "text";
    }
  }

  public setContent(content: Content) {
    for (const block of content) {
      if (block.type === "text") {
        this._initElement(
          block.data?.level ?? "p",
          block?.data?.text ?? "",
          block.key
        );
      }
    }
  }

  private _initElement(element: string, innerHTML: string, key: string) {
    const el = document.createElement(element);
    el.innerHTML = innerHTML;
    el.dataset.key = key;
    this.editorEl.appendChild(el);
  }

  public execCommand(e: Event, command: "bold" | "italic") {
    e.preventDefault();
    document.execCommand(command);
    console.log(e);
  }
}

const editor = new TuEditor(console.log);

editor.setContent([
  { key: "start", data: { text: "Tittel", level: "h1" }, type: "text" },
  {
    key: "ljhkqn56-eor4",
    data: { level: "p", text: "dsdss\nsdoknsbjnlsjrnl" },
    type: "text",
  },
  {
    key: "ljhlofvj-aonf",
    data: { level: "p", text: "sdfbsg <b>lkwner</b> jkfmnslkj" },
    type: "text",
  },
  {
    key: "ljhloml0-jmc8",
    data: {
      level: "p",
      text: "fvvfsfsfsfsfgbdhøjsbf oubhsfvub oaueb ueby isuefbvsi ufvbhs diufhb qeui sefv",
    },
    type: "text",
  },
]);

const button = document.querySelector<HTMLButtonElement>("#paste");

button?.addEventListener("click", (e) => editor.execCommand(e, "bold"));

export function createId() {
  const appendix = Math.ceil(Math.random() * 1000000).toString(36);

  const time = new Date().getTime();

  return time.toString(36) + "-" + appendix;
}
