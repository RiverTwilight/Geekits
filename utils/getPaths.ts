import glob from "glob";

export default (locale, processId: (id: string) => string, path: string) => {
	//get all .md files in the posts dir
	const blogs = glob.sync(path, {
		stat: true,
	});

	//remove path and extension to leave filename only
	const blogSlugs = blogs.map((file) =>
		file.split("/")[2].replace(/ /g, "-").slice(0, -3).trim()
	);
	// create paths with `slug` param
	// const paths = blogSlugs.map(slug => `/blog/${encodeURI(slug)}`)
	const paths = blogSlugs.map((slug: string) => {
		return {
			params: {
				id: processId(slug),
			},
			locale,
		};
	});

	// console.log(paths)

	return paths;
};
