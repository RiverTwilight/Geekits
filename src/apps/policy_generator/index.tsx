import * as React from "react";
import { Input, Button } from "mdui-in-react";
import useInput from "../../utils/Hooks/useInput";
import PG from "./generator";
// TODO 隐私政策生成器

const PGI = new PG();

const BasicInfo = ({ display }: { display: boolean }) => {
	const [firmName, setFirmName] = useInput("");
	const [shortName, setShortName] = useInput("");
	return (
		<div
			style={{
				display: display ? "block" : "none",
			}}
		>
			<Input header="公司名称" onInput={setFirmName} value={firmName} />
			<Input header="公司简称" onInput={setShortName} value={shortName} />
		</div>
	);
};

const PolicyType = ({ display }: { display: boolean }) => {
	const [type, setType] = React.useState(0);
	return (
		<div
			style={{
				display: display ? "block" : "none",
			}}
		>
			<h3>你要生成的类型</h3>
			<p>欢迎使用服务协议生成器</p>
			<div className="mdui-card mdui-hoverable">
				<div className="mdui-card-primary">
					<div className="mdui-card-primary-title">Title</div>
					<div className="mdui-card-primary-subtitle">Subtitle</div>
				</div>
			</div>
		</div>
	);
};

export default () => {
	const [step, setStep] = React.useState(0);
	const TOTAL_STEP = 10;
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
						width: `${(step / 10) * 100}%`,
					}}
				></div>
			</div>
			<div className="mdui-typo">
				<PolicyType display={step === 0} />
				<BasicInfo display={step === 1} />
				<BasicInfo display={step === 2} />
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
