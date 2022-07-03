/**
 * @author rivertwilight
 */
export default (appData, link: any) => {
	for (let i in appData) {
		if (appData[i].link == link) return appData[i];
	}
};
