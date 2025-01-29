import type { MetadataRoute } from "next";
import siteConfig from "./site.config";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: siteConfig.name,
		short_name: siteConfig.name,
		description: siteConfig.description,
		start_url: "/",
		display: "standalone",
		background_color: "#ededf4",
		theme_color: "#1d2023",
		icons: [
			{
				src: "/logo/v3/android-icon-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/logo/v3/apple-icon-57x57.png",
				sizes: "57x57",
				type: "image/png",
			},
			{
				src: "/logo/v3/apple-icon-60x60.png",
				sizes: "60x60",
				type: "image/png",
			},
			{
				src: "/logo/v3/apple-icon-72x72.png",
				sizes: "72x72",
				type: "image/png",
			},
			{
				src: "/logo/v3/apple-icon-76x76.png",
				sizes: "76x76",
				type: "image/png",
			},
			{
				src: "/logo/v3/apple-icon-114x114.png",
				sizes: "114x114",
				type: "image/png",
			},
			{
				src: "/logo/v3/apple-icon-120x120.png",
				sizes: "120x120",
				type: "image/png",
			},
			{
				src: "/logo/v3/apple-icon-144x144.png",
				sizes: "144x144",
				type: "image/png",
			},
			{
				src: "/logo/v3/apple-icon-152x152.png",
				sizes: "152x152",
				type: "image/png",
			},
			{
				src: "/logo/v3/apple-icon-180x180.png",
				sizes: "180x180",
				type: "image/png",
			},
			{
				src: "/logo/v3/favicon-32x32.png",
				sizes: "32x32",
				type: "image/png",
			},
			{
				src: "/logo/v3/favicon-96x96.png",
				sizes: "96x96",
				type: "image/png",
			},
			{
				src: "/logo/v3/favicon-16x16.png",
				sizes: "16x16",
				type: "image/png",
			},
		],
	};
}
