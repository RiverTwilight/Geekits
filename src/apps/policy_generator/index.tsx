import * as React from "react";
import { Input, Button } from "mdui-in-react";
import Form from "../../components/Form";
import useInput from "../../utils/Hooks/useInput";
import PG from "./generator";
import { saveFile } from "../../utils/fileSaver";
// import marked from "marked";
// TODO 完善隐私政策生成器
// REBUILD markdown
const PGI = new PG();

const BasicInfo = ({ display }: { display: boolean }) => {
	const FORM_CONFIG = [
		{
			id: "firmName",
			header: "公司名称",
		},
		{
			id: "shortName",
			header: "公司简称",
		},
		{
			id: "websiteName",
			header: "网站名称",
		},
		{
			id: "url",
			header: "网站地址",
		},
	];
	const handleInput = ({ key, event }: { key: string; event: any }) => {
		PGI.setConfig(key, event.value);
	};
	return (
		<div
			style={{
				display: display ? "block" : "none",
			}}
		>
			<Form config={FORM_CONFIG} onValueChange={handleInput} />
		</div>
	);
};

const AdditionalInfo = ({ display }: { display: boolean }) => {
	const [firmName, setFirmName] = useInput("");
	const [shortName, setShortName] = useInput("");
	const [websiteName, setWebsiteName] = useInput("");
	const [url, setUrl] = useInput("");
	return (
		<div
			style={{
				display: display ? "block" : "none",
			}}
		>
			<Input header="公司名称" onInput={setFirmName} value={firmName} />
			<Input header="公司简称" onInput={setShortName} value={shortName} />
			<Input
				header="网站名称"
				onInput={setWebsiteName}
				value={websiteName}
			/>
			<Input header="网站地址" onInput={setUrl} value={url} />
		</div>
	);
};

const Result = () => {
	const exportAsMd = () => {
		saveFile({
			filename: "隐私政策-云极客工具.md",
			type: "md",
			file: new Blob([PGI.generator()], { type: "text/markdown" }),
		});
	};
	const exportAsHTML = () => {
		// saveFile({
		// 	filename: "隐私政策-云极客工具.html",
		// 	type: "html",
		// 	file: new Blob([marked(PGI.generator())], {
		// 		type: "text/markdown",
		// 	}),
		// });
	};
	return (
		<div style={{}}>
			<h3>完毕</h3>
			<Button
				onClick={exportAsMd}
				raised
				icon="file_download"
				title="导出Markdown"
			/>
			<Button
				raised
				onClick={exportAsHTML}
				icon="file_download"
				title="导出HTML"
			/>
			<div className="mdui-divider" />
			{/* <div
				style={{
					maxHeight: "250px",
					overflow: "scroll",
				}}
				dangerouslySetInnerHTML={{
					__html: marked(PGI.generator()),
				}}
			></div> */}
		</div>
	);
};

const PolicyType = ({ display }: { display: boolean }) => {
	const [type, setType] = React.useState(0);
	const TypeCrad = ({
		title,
		description,
		index,
	}: {
		title: string;
		description: string;
		index: number;
	}) => (
		<React.Fragment>
			<div
				key={title}
				className={`${
					type === index && "mdui-shadow-10"
				} mdui-card mdui-hoverable`}
				onClick={() => {
					setType(index);
				}}
			>
				<div className="mdui-card-primary">
					<div className="mdui-card-primary-title">
						{type === index && "✔"}
						{title}
					</div>
					<div className="mdui-card-primary-subtitle">
						{description}
					</div>
				</div>
			</div>
			<br></br>
		</React.Fragment>
	);
	return (
		<div
			style={{
				display: display ? "block" : "none",
			}}
		>
			<h3>选择你要生成的类型</h3>
			<p>欢迎使用服务协议生成器</p>
			{[
				// TODO 服务协议生成器
				{
					title: "隐私协议",
					description:
						"我们的隐私政策生成器可以帮助您确保您的业务符合法律规定。我们在这里帮助您保护您的业务，您自己和您的客户",
				},
			].map((type, i) => (
				<TypeCrad key={type.title} {...type} index={i} />
			))}
		</div>
	);
};

export default () => {
	const [step, setStep] = React.useState(0);
	const TOTAL_STEP = 2;
	const nextStep = () => {
		setStep(step + 1);
	};
	const preStep = () => {
		setStep(step - 1);
	};
	return (
		<>
			<div className="mdui-progress">
				<div
					className="mdui-progress-determinate"
					style={{
						width: `${(step / TOTAL_STEP) * 100}%`,
					}}
				></div>
			</div>
			<div className="mdui-typo">
				<PolicyType display={step === 0} />
				<BasicInfo display={step === 1} />
				{step === 2 && <Result />}
			</div>

			<br></br>
			{step !== 0 && (
				<Button
					onClick={preStep}
					className="mdui-float-left"
					raised
					title="上一步"
				/>
			)}
			<Button
				disabled={TOTAL_STEP === step}
				raised
				primary
				onClick={nextStep}
				title="下一步"
				className="mdui-float-right"
			/>
		</>
	);
};
