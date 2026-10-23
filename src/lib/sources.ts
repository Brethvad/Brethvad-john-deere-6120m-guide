import { MANUAL_BASE } from "@/content/sources";
import type { Source } from "@/content/types";

export function sourceUrl(src: Pick<Source, "file" | "url">) {
  return src.url ?? MANUAL_BASE + encodeURI(src.file);
}
