import React from "react";
import Logined from "./dashboard/";
import { useHistory } from "react-router-dom";
import { getUserInfo } from "../../utils/Services/UserInfo";
let history = useHistory();

export default () => {
	window.globalRef.title.innerText = "我的账户";
	if (!getUserInfo())
		history.push("/user/login");

	return <Logined />;
};
