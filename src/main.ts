import "./style.css";

import { Content } from "./types";
import { parseContent } from "./parseContent";

export class TuEditor {
  private editorEl?: HTMLDivElement;

  private onChange?: (content: Content) => void;

  public init(onChange: (content: Content) => void) {
    this.editorEl = document.querySelector("#tu-editor")!;
    this.editorEl.contentEditable = "true";
    this.editorEl.role = "textbox";
    this.onChange = onChange;
    this.editorEl.addEventListener("keydown", (e) => this.listenerEditor(e));
    this.editorEl.addEventListener("input", console.log);
    this.editorEl.addEventListener("blur", () => this._onBlurListener());
  }

  private listenerEditor(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
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

        // Set cursor in the new element
        const range = document.createRange();
        range.setStart(el, 0);
        range.collapse(true);
        sel?.removeAllRanges();
        sel?.addRange(range);
        el.innerHTML = "<br> ";
      }
    }
  }

  private _onBlurListener() {
    if (this.editorEl?.children) {
      const elements = Array.from(this.editorEl?.children);
      const newContent = parseContent(elements);

      if (this.onChange) this.onChange(newContent);
    }
  }

  public setContent(content: Content) {
    console.log({ content });
    if (content.length === 0) {
      const key = createId();

      this._initElement("p", "<br>", key);

      return;
    }

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
    const sel = window.getSelection();
    el.dataset.key = key;
    this.editorEl?.appendChild(el);

    // Set cursor in the new element
    const range = document.createRange();
    range.setStart(el, 0);
    range.collapse(true);
    sel?.removeAllRanges();
    sel?.addRange(range);
    el.innerHTML = innerHTML;
  }

  public execCommand(e: Event, command: "bold" | "italic") {
    e.preventDefault();
    document.execCommand(command);
    console.log(e);
  }
}

const editor = new TuEditor();
editor.init(console.log);

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
  return Math.ceil(Math.random() * 99999990).toString(36);
}
