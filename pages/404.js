import Link from "next/link";
import Button from "@material-ui/core/Button";

export default function Custom404() {
	return (
		<div className="center-with-flex">
			<img alt="404" height="200" width="200" src="/icons/404.svg"></img>
			<h2>电波无法到达哦</h2>
			<p>
				是不是地址拼错了？是/app不是/apps哦<br></br>
				想要的工具不见了？返回首页找找吧！<br></br>
			</p>
			<Link href="/">
				<Button variant="outlined">返回首页</Button>
			</Link>
		</div>
	);
}
