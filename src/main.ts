import "./style.css";

import { TuEditor } from "./editor";

const editor = new TuEditor();
editor.init(console.log);

editor.setContent([
  { key: "start", data: { text: "Tittel", level: "h1" }, type: "text" },
  {
    key: "ljhkqn56-eor4",
    data: { level: "p", text: "dsdss<br>sdoknsbjnlsjrnl" },
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
