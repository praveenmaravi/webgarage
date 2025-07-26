// colorUtils.ts

/**
 * Convert HEX to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const cleanHex = hex.replace("#", "");
    const bigint = parseInt(cleanHex, 16);
  
    if (cleanHex.length === 3) {
      return {
        r: (bigint >> 8 & 0xf) * 17,
        g: (bigint >> 4 & 0xf) * 17,
        b: (bigint & 0xf) * 17
      };
    }
  
    if (cleanHex.length !== 6) return null;
  
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  }
  
  /**
   * Convert RGB to HEX
   */
  export function rgbToHex(r: number, g: number, b: number): string {
    return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
  }
  
  /**
   * Calculate luminance
   */
  export function luminance(r: number, g: number, b: number): number {
    const a = [r, g, b].map((v) => {
      const channel = v / 255;
      return channel <= 0.03928
        ? channel / 12.92
        : Math.pow((channel + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }
  
  /**
   * Check color contrast (WCAG AA compliant)
   */
  export function isContrastAccessible(hex1: string, hex2: string, ratio = 4.5): boolean {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    if (!rgb1 || !rgb2) return false;
  
    const lum1 = luminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = luminance(rgb2.r, rgb2.g, rgb2.b);
    const contrast =
      lum1 > lum2 ? (lum1 + 0.05) / (lum2 + 0.05) : (lum2 + 0.05) / (lum1 + 0.05);
  
    return contrast >= ratio;
  }
  
  /**
   * Generate a color theme (light/dark variation)
   */
  export function generateTheme(baseHex: string): { background: string; foreground: string } {
    const rgb = hexToRgb(baseHex);
    if (!rgb) return { background: "#ffffff", foreground: "#000000" };
  
    const isDark = luminance(rgb.r, rgb.g, rgb.b) < 0.5;
    return {
      background: baseHex,
      foreground: isDark ? "#ffffff" : "#000000",
    };
  }
  
  /**
   * Lighten or darken a HEX color
   */
  export function adjustBrightness(hex: string, amount: number): string {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
  
    const r = Math.min(255, Math.max(0, rgb.r + amount));
    const g = Math.min(255, Math.max(0, rgb.g + amount));
    const b = Math.min(255, Math.max(0, rgb.b + amount));
  
    return rgbToHex(r, g, b);
  }
  