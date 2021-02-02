import Logined from "./dashboard/";
import { getUserInfo } from "../../utils/Services/UserInfo";

/**
 * 用户页面中间件
 * @author 江村暮
 */
const User = () => {
	if (!getUserInfo()) window.location.href = "/";
	window.updateTitle("我的账户");
	window.destoryRightDrawer && window.destoryRightDrawer();
	return <Logined />;
};

export default User;
