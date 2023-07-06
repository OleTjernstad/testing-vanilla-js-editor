import { Content } from "./types";
import { createId } from "./utils/createId";
import { createNewParagraph } from "./element/paragraph";
import { parseContent } from "./parseContent";
import { setCursor } from "./utils/setCursor";

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
      createNewParagraph();
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

    setCursor(sel, el, innerHTML);
  }

  public execCommand(e: Event, command: "bold" | "italic") {
    e.preventDefault();
    document.execCommand(command);
    console.log(e);
  }
}
