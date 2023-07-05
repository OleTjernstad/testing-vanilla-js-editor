import { acceptedTextElements } from "./acceptedElements";

export function getBlockType(localName: string | undefined) {
  if (acceptedTextElements.includes(localName ?? "p")) {
    return "text";
  }
}
