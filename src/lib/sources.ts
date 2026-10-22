import { MANUAL_BASE } from "@/content/sources";

export function sourceUrl(file: string) {
  return MANUAL_BASE + encodeURI(file);
}
