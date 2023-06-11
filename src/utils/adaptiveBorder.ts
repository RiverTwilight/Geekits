export default (theme, style="solid"): { theme: any; style?: "solid" | "dashed" } =>
	({
		light: `3px ${style} #e0e0e0`,
		dark: `3px ${style} rgba(255, 255, 255, 0.23)`,
	}[theme.palette.mode]);
