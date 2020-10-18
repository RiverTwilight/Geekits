import * as React from "react";
import { Input, Button } from "mdui-in-react";
import useInput from "../../utils/Hooks/useInput";
import PG from "./generator";
import marked from "marked";
// TODO 隐私政策生成器

const PGI = new PG();

const BasicInfo = ({ display }: { display: boolean }) => {
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

const Result = ({ display }: { display: boolean }) => {
	return (
		<div
			style={{
				display: display ? "block" : "none",
			}}
		>
			<h3>完毕</h3>
			<div
				dangerouslySetInnerHTML={{
					__html: marked(PGI.generator()),
				}}
			></div>
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
					type === index && "mdui-shadow-12"
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
			<h3>你要生成的类型</h3>
			<p>欢迎使用服务协议生成器</p>
			{[
				{
					title: "隐私协议",
					description:
						"我们的隐私政策生成器可以帮助您确保您的业务符合法律规定。我们在这里帮助您保护您的业务，您自己和您的客户",
				},
			].map((type, i) => (
				<TypeCrad {...type} index={i} />
			))}
		</div>
	);
};

export default () => {
	const [step, setStep] = React.useState(0);
	const TOTAL_STEP = 3;
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
				<BasicInfo display={step === 2} />
				<Result display={step === 3} />
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
