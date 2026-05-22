export interface EngineConfig {
  name: string;
  cx: string;
  placeholder: string;
  theme: {
    textColor: string;
    gradientFrom: string;
    gradientTo: string;
    accentBorder: string;
    accentBg: string;
    radialGlow: string;
  };
}

export const ENGINES_MAP: Record<string, EngineConfig> = {
  software: {
    name: "Zither Software",
    cx: "e05ec25e76bc046f5",
    placeholder: "Search for software...",
    theme: {
      textColor: "text-cyan-200",
      gradientFrom: "from-neutral-200",
      gradientTo: "to-cyan-400",
      accentBorder: "hover:border-cyan-300/25",
      accentBg: "bg-cyan-300/10",
      radialGlow: "rgba(34,211,238,0.12)",
    }
  },
  games: {
    name: "Zither Games",
    cx: "a1c68bdb263434c9b",
    placeholder: "Search for retro & modern games...",
    theme: {
      textColor: "text-emerald-300",
      gradientFrom: "from-neutral-200",
      gradientTo: "to-emerald-400",
      accentBorder: "hover:border-emerald-300/25",
      accentBg: "bg-emerald-300/10",
      radialGlow: "rgba(52,211,153,0.12)",
    }
  }
};

export const DEFAULT_ENGINE = ENGINES_MAP.software;