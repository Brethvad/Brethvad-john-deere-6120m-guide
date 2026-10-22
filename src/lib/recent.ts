import { load, save } from "./storage";

const KEY = "recent-pages";

export function recordVisit(path: string, title: string) {
  if (!title || path === "/") return;
  const list = load<{ path: string; title: string }[]>(KEY, []).filter((x) => x.path !== path);
  list.unshift({ path, title });
  save(KEY, list.slice(0, 6));
}

export function recentPages() {
  return load<{ path: string; title: string }[]>(KEY, []);
}
