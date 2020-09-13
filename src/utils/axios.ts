import axios from "axios";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export const cancel = source.cancel

export default axios.create({
	baseURL: "https://api.ygktool.cn",
	// baseURL: 'http://localhost:444',
	timeout: 15000,
	cancelToken: source.token,
});
