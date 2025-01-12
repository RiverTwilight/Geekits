import React, { useEffect, useRef, useState } from "react";
import {
	Box,
	Button,
	IconButton,
	Slider,
	Card,
	Stack,
	Typography,
} from "@mui/material";
import {
	ChevronLeft,
	ChevronRight,
	ArrowDropUp,
	ArrowDropDown,
	Lens,
	ColorLens as ColorLensIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Custom styled components
const Canvas = styled("canvas")({
	maxWidth: "100%",
	height: "auto",
});

const CursorOverlay = styled("div")({
	position: "absolute",
	height: "20px",
	width: "20px",
	transform: "translate(-50%, -50%)",
	pointerEvents: "none",
	"&::before": {
		content: '""',
		position: "absolute",
		top: "50%",
		left: "50%",
		width: "2px",
		height: "20px",
		background: "#000",
		transform: "translate(-50%, -50%)",
	},
	"&::after": {
		content: '""',
		position: "absolute",
		top: "50%",
		left: "50%",
		width: "20px",
		height: "2px",
		background: "#000",
		transform: "translate(-50%, -50%)",
	},
});

interface ColorState {
	r: number;
	g: number;
	b: number;
	a: number;
}

const ColorPicker = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [color, setColor] = useState<ColorState>({
		r: 255,
		g: 255,
		b: 255,
		a: 1,
	});
	const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
	const [showColorLens, setShowColorLens] = useState(false);
	const [canvasOffset, setCanvasOffset] = useState({ left: 0, top: 0 });

	useEffect(() => {
		if (canvasRef.current) {
			const canvas = canvasRef.current;
			setCtx(canvas.getContext("2d"));
			updateCanvasOffset();
		}

		const handleKeyDown = (e: KeyboardEvent) => {
			const moveAmount = 1;
			switch (e.key) {
				case "ArrowLeft":
					e.preventDefault();
					movePosition(-moveAmount, 0);
					break;
				case "ArrowRight":
					e.preventDefault();
					movePosition(moveAmount, 0);
					break;
				case "ArrowUp":
					e.preventDefault();
					movePosition(0, -moveAmount);
					break;
				case "ArrowDown":
					e.preventDefault();
					movePosition(0, moveAmount);
					break;
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("resize", updateCanvasOffset);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("resize", updateCanvasOffset);
		};
	}, []);

	const updateCanvasOffset = () => {
		if (canvasRef.current) {
			const rect = canvasRef.current.getBoundingClientRect();
			setCanvasOffset({ left: rect.left, top: rect.top });
		}
	};

	const movePosition = (dx: number, dy: number) => {
		setPosition((prev) => {
			const newPos = { x: prev.x + dx, y: prev.y + dy };
			getColorAtPosition(newPos.x, newPos.y);
			return newPos;
		});
	};

	const getColorAtPosition = (x: number, y: number) => {
		if (ctx) {
			const pixels = ctx.getImageData(x, y, 1, 1).data;
			setColor({
				r: pixels[0],
				g: pixels[1],
				b: pixels[2],
				a: pixels[3] / 255,
			});
		}
	};

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file && canvasRef.current) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const img = new Image();
				img.onload = () => {
					if (canvasRef.current) {
						canvasRef.current.width = img.width;
						canvasRef.current.height = img.height;
						const newCtx = canvasRef.current.getContext("2d");
						newCtx?.drawImage(img, 0, 0);
						setCtx(newCtx);
						updateCanvasOffset();
					}
				};
				img.src = e.target?.result as string;
			};
			reader.readAsDataURL(file);
		}
	};

	const handleCanvasClick = (e: React.MouseEvent) => {
		const x = e.pageX - canvasOffset.left;
		const y = e.pageY - canvasOffset.top;
		setPosition({ x, y });
		getColorAtPosition(x, y);
	};

	const rgbaString = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
	const hexString = `#${color.r.toString(16).padStart(2, "0")}${color.g
		.toString(16)
		.padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;

	return (
		<Box sx={{ position: "relative", width: "100%", height: "100%" }}>
			<CursorOverlay style={{ left: position.x, top: position.y }} />

			<Canvas ref={canvasRef} onClick={handleCanvasClick} />

			<Card
				sx={{ position: "fixed", bottom: 0, left: 0, right: 0, p: 2 }}
			>
				<Stack spacing={2}>
					<Button variant="contained" component="label">
						Upload Image
						<input
							type="file"
							hidden
							accept="image/*"
							onChange={handleImageUpload}
						/>
					</Button>

					<Stack direction="row" spacing={1} alignItems="center">
						<Button onClick={() => movePosition(-1, 0)}>
							<ChevronLeft />
						</Button>
						<Button onClick={() => movePosition(0, -1)}>
							<ArrowDropUp />
						</Button>
						<Button onClick={() => movePosition(0, 1)}>
							<ArrowDropDown />
						</Button>
						<Button onClick={() => movePosition(1, 0)}>
							<ChevronRight />
						</Button>

						<IconButton sx={{ color: rgbaString }}>
							<Lens />
						</IconButton>

						<Button
							onClick={() =>
								navigator.clipboard.writeText(rgbaString)
							}
						>
							{rgbaString}
						</Button>

						<Button
							onClick={() =>
								navigator.clipboard.writeText(hexString)
							}
						>
							{hexString}
						</Button>

						<IconButton
							onClick={() => setShowColorLens(!showColorLens)}
						>
							<ColorLensIcon />
						</IconButton>
					</Stack>

					{showColorLens && (
						<Box sx={{ px: 2 }}>
							{(["r", "g", "b", "a"] as const).map((channel) => (
								<Box key={channel}>
									<Typography gutterBottom>
										{channel.toUpperCase()}:{" "}
										{color[channel]}
									</Typography>
									<Slider
										value={
											channel === "a"
												? color[channel] * 255
												: color[channel]
										}
										min={0}
										max={255}
										onChange={(_, value) => {
											setColor((prev) => ({
												...prev,
												[channel]:
													channel === "a"
														? (value as number) /
														  255
														: value,
											}));
										}}
									/>
								</Box>
							))}
						</Box>
					)}
				</Stack>
			</Card>
		</Box>
	);
};

export default ColorPicker;
