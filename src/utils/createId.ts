export function createId() {
  return Math.ceil(Math.random() * 99999990).toString(36);
}
