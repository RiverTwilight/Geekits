export default (theme, style="solid", width="3px"): { theme: any; style?: "solid" | "dashed" } =>
	({
		light: `${width} ${style} #e0e0e0`,
		dark: `${width} ${style} rgba(255, 255, 255, 0.23)`,
	}[theme.palette.mode]);
