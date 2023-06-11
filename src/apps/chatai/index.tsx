import { useState, useEffect, useRef } from "react";
import ClipboardJS from "clipboard";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuIcon from "@mui/icons-material/Menu";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Grow from "@mui/material/Grow";
import IconButton from "@mui/material/IconButton";
import axios from "@/utils/axios";
import useInput from "@/utils/Hooks/useInput";
import ChatList from "@/components/Chat";

const PRESETS = [
	{
		title: "求职信",
		prompt: "Please write an job cover for [Your job].",
	},
	{
		title: "产品idea",
		prompt: "Please give me an idea of a SaaS service which is less competitve and easy to start.",
	},
];

export default function Chat() {
	const [history, setHistory] = useState<
		{
			text: string;
			type: string;
			date: Date;
		}[]
	>([]);
	const [input, setInput] = useInput<String>("");
	const [loading, setLoading] = useState<Boolean>(false);
	const [open, setOpen] = useState(false);
	const anchorRef = useRef<HTMLButtonElement>(null);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event: Event | React.SyntheticEvent) => {
		if (
			anchorRef.current &&
			anchorRef.current.contains(event.target as HTMLElement)
		) {
			return;
		}

		setOpen(false);
	};

	function handleListKeyDown(event: React.KeyboardEvent) {
		if (event.key === "Tab") {
			event.preventDefault();
			setOpen(false);
		} else if (event.key === "Escape") {
			setOpen(false);
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = useRef(open);
	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current!.focus();
		}

		prevOpen.current = open;
	}, [open]);

	const handleSend = () => {
		setHistory((prevHistory) => [
			...prevHistory,
			{
				type: "human",
				text: input,
				date: new Date(),
			},
		]);
		setInput("");
		setLoading(true);
		axios
			.post("/api/apps/openai", {
				packedData: {
					model: "text-davinci-003",
					prompt: input,
					temperature: 0.5,
					max_tokens: 200,
					top_p: 1,
					n: 1,
					stream: false,
					logprobs: null,
					// stop: ["\u2022"],
				},
			})
			.then((res) => {
				let timeStemp = new Date();
				setHistory((prevHistory) => [
					...prevHistory,
					{
						type: "bot",
						text: res.data.choices[0].text,
						date: timeStemp,
					},
				]);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	// useEffect(() => {
	// 	var clipboard = new ClipboardJS(".copy");
	// 	clipboard.on("success", (e) => {
	// 		window.snackbar({ message: "已复制" });
	// 		e.clearSelection();
	// 	});
	// 	return () => clipboard && clipboard.destroy();
	// }, []);

	return (
		<Box
			sx={{
				width: "100%",
				// height: "calc(100vh - 80px)",
				height : '100%',
				position: "relative",
				overflow: "hidden",
			}}
		>
			<ChatList loading={loading} history={history} />
			<Box
				sx={{
					bottom: 10,
					left: 0,
					right: 0,
					position: "absolute",
					paddingX: 2,
					display: "flex",
					justifyContent: "center",
				}}
			>
				<Paper
					component="form"
					sx={{
						p: "6px 4px",
						maxWidth: "1000px",
						display: "flex",
						alignItems: "center",
						width: "100%",
					}}
				>
					<IconButton
						ref={anchorRef}
						id="composition-button"
						aria-controls={open ? "composition-menu" : undefined}
						aria-expanded={open ? "true" : undefined}
						aria-haspopup="true"
						onClick={handleToggle}
						sx={{ p: "10px" }}
						aria-label="menu"
					>
						<MenuIcon />
					</IconButton>
					<Popper
						open={open}
						anchorEl={anchorRef.current}
						role={undefined}
						placement="bottom-start"
						transition
						disablePortal
					>
						{({ TransitionProps, placement }) => (
							<Grow
								{...TransitionProps}
								style={{
									transformOrigin:
										placement === "bottom-start"
											? "left top"
											: "left bottom",
								}}
							>
								<Paper>
									<ClickAwayListener
										onClickAway={handleClose}
									>
										<MenuList
											autoFocusItem={open}
											id="composition-menu"
											aria-labelledby="composition-button"
											onKeyDown={handleListKeyDown}
										>
											{PRESETS.map((preset) => {
												return (
													<MenuItem
														key={preset.title}
														onClick={(e) => {
															setInput(
																preset.prompt
															);
															handleClose(e);
														}}
													>
														{preset.title}
													</MenuItem>
												);
											})}
										</MenuList>
									</ClickAwayListener>
								</Paper>
							</Grow>
						)}
					</Popper>
					<InputBase
						sx={{
							ml: 1,
							mr: 1,
							flex: 1,
							background: (theme) =>
								theme.palette.secondary[theme.palette.mode],
							borderRadius: "5px",
							maxHeight: "500px",
							overflowY: "scroll",
							pl: 1,
						}}
						multiline
						placeholder="Say anything you want..."
						autoComplete="off"
						aria-label="Type what you want to ask here"
						value={input}
						onChange={setInput}
						inputProps={{ "aria-label": "Say something" }}
					/>
					<IconButton
						sx={{
							backgroundColor: (theme) =>
								theme.palette.primary.main,
						}}
						size="small"
						disabled={input === ""}
						onClick={handleSend}
					>
						<ArrowUpwardIcon />
					</IconButton>
				</Paper>
			</Box>
		</Box>
	);
}
