import matter from "gray-matter";

export default function getAllPosts(
	pocessRes: {
		/**文档内容处理函数 */
		markdownBody?: (content: string) => string;
		id?: (id: string) => string;
	} = {},
	/**Node的require函数，请以./src/utils为主目录计算相对路径，如'path' */
	requireFunc: any,
	/**是否排序 */
	sort: boolean = false
) {
	//get posts & context from folder
	const posts = ((context) => {
		const keys = context.keys();
		const values = keys.map(context);
		const data = keys.map((key, index) => {
			// Create slug from filename
			const slug = key
				.replace(/^.*[\\\/]/, "")
				.split(".")
				.slice(0, -1)
				.join(".");
			const value = values[index];
			// Parse yaml metadata & markdownbody in document
			const document = matter(value.default);
			return {
				id: pocessRes.hasOwnProperty("id") ? pocessRes.id(slug) : slug,
				defaultTitle: slug,
				frontmatter: document.data,
				markdownBody: pocessRes.hasOwnProperty("markdownBody")
					? pocessRes.markdownBody(document.content)
					: document.content,
				slug: slug,
				locale: key.split("/")[1],
			};
		});
		return data;
	})(requireFunc);

	const sortedPosts = sort
		? posts
				.sort((a, b) => {
					let dayA = a.frontmatter.date.split("/")[2],
						dayB = b.frontmatter.date.split("/")[2];
					return dayB - dayA;
				})
				.sort((a, b) => {
					let monthA = a.frontmatter.date.split("/")[1],
						monthB = b.frontmatter.date.split("/")[1];
					return monthB - monthA;
				})
				.sort((a, b) => {
					let yearA = a.frontmatter.date.split("/")[0],
						yearB = b.frontmatter.date.split("/")[0];
					return yearB - yearA;
				})
		: posts;

	return sortedPosts;
}
