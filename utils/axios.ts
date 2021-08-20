import axios from "axios";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export const cancel = source.cancel

export default axios.create({
	// baseURL: 'http://localhost:444',
	// baseURL: "https://api.ygktool.cn",
	baseURL: "https://ygk-api.yunser.com",
	timeout: 15000,
	cancelToken: source.token,
});
