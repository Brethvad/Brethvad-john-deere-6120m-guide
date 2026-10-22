// Kept separate from TractorScene so text pages never load three.js.
export type ViewPreset = "standard" | "foran" | "bak" | "venstre" | "hoyre" | "ovenfra" | "forerhus";

export function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
}
