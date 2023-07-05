import { Content, TextLevel } from "./types";

import { getBlockType } from "./utils/getBlockType";

export function parseContent(elements: Element[]) {
  const newContent: Content = elements.map((el) => {
    const key = el.getAttribute("data-key") ?? "";
    const innerHtml = el.innerHTML ?? "";

    const type = getBlockType(el.localName);
    if (type === "text") {
      return {
        key,
        type,
        data: {
          level: (el.localName as TextLevel) ?? "p",
          text: innerHtml,
        },
      };
    }
    return {
      key,
      type: "text",
      data: {
        level: "p",
        text: "unknown",
      },
    };
  });
  return newContent;
}
