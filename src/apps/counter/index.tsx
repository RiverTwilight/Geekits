import React, { useState } from "react";
import {
	Box,
	Button,
	Container,
	TextField,
	Typography,
	Select,
	MenuItem,
	Grid,
	Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled components
const ScoreDisplay = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(3),
	textAlign: "center",
	fontSize: "2rem",
	fontWeight: "bold",
	marginBottom: theme.spacing(2),
}));

const ButtonGroup = ({
	max,
	onClick,
}: {
	max: number;
	onClick: (i: number) => void;
}) => {
	return (
		<Grid container spacing={1}>
			{Array(Number(max))
				.fill(null)
				.map((_, i) => (
					<Grid item xs={4} key={i}>
						<Button
							variant="contained"
							fullWidth
							onClick={() => onClick(i)}
						>
							+{i + 1}
						</Button>
					</Grid>
				))}
		</Grid>
	);
};

interface HistoryState {
	side: "A" | "B" | null;
	value: number;
	used: boolean;
}

const Counter = () => {
	const [teamA, setTeamA] = useState({
		name: "Team A",
		score: 0,
	});
	const [teamB, setTeamB] = useState({
		name: "Team B",
		score: 0,
	});
	const [max, setMax] = useState(3);
	const [history, setHistory] = useState<HistoryState>({
		side: null,
		value: 0,
		used: false,
	});

	const handleUndo = () => {
		if (history.side === "A") {
			setTeamA((prev) => ({ ...prev, score: history.value }));
		} else if (history.side === "B") {
			setTeamB((prev) => ({ ...prev, score: history.value }));
		}
		setHistory((prev) => ({ ...prev, used: true }));
	};

	const handleScoreChange = (team: "A" | "B", increment: number) => {
		if (team === "A") {
			setHistory({ side: "A", value: teamA.score, used: false });
			setTeamA((prev) => ({ ...prev, score: prev.score + increment }));
		} else {
			setHistory({ side: "B", value: teamB.score, used: false });
			setTeamB((prev) => ({ ...prev, score: prev.score + increment }));
		}
	};

	return (
		<Container maxWidth="md">
			<Grid
				container
				spacing={3}
				justifyContent="center"
				alignItems="center"
			>
				{/* Team A */}
				<Grid item xs={12} md={5}>
					<TextField
						fullWidth
						label="Team A Name"
						value={teamA.name}
						onChange={(e) =>
							setTeamA((prev) => ({
								...prev,
								name: e.target.value,
							}))
						}
						margin="normal"
					/>
					<ScoreDisplay elevation={3}>{teamA.score}</ScoreDisplay>
					<ButtonGroup
						max={max}
						onClick={(i) => handleScoreChange("A", i + 1)}
					/>
				</Grid>

				{/* VS */}
				<Grid item xs={12} md={2}>
					<Typography variant="h4" align="center">
						VS
					</Typography>
				</Grid>

				{/* Team B */}
				<Grid item xs={12} md={5}>
					<TextField
						fullWidth
						label="Team B Name"
						value={teamB.name}
						onChange={(e) =>
							setTeamB((prev) => ({
								...prev,
								name: e.target.value,
							}))
						}
						margin="normal"
					/>
					<ScoreDisplay elevation={3}>{teamB.score}</ScoreDisplay>
					<ButtonGroup
						max={max}
						onClick={(i) => handleScoreChange("B", i + 1)}
					/>
				</Grid>

				{/* Controls */}
				<Grid item xs={12}>
					<Box display="flex" justifyContent="center" gap={2} mb={2}>
						<Button
							variant="contained"
							onClick={() => {
								const tempScore = teamA.score;
								const tempName = teamA.name;
								setTeamA({
									name: teamB.name,
									score: teamB.score,
								});
								setTeamB({ name: tempName, score: tempScore });
							}}
						>
							Swap
						</Button>
						<Button
							variant="contained"
							onClick={() => {
								setTeamA((prev) => ({ ...prev, score: 0 }));
								setTeamB((prev) => ({ ...prev, score: 0 }));
							}}
						>
							Reset
						</Button>
						<Button
							variant="contained"
							disabled={history.used}
							onClick={handleUndo}
						>
							Undo
						</Button>
					</Box>

					<Box display="flex" justifyContent="center">
						<Select
							value={max}
							onChange={(e) => setMax(Number(e.target.value))}
							size="small"
						>
							<MenuItem value={3}>Basketball Mode</MenuItem>
							<MenuItem value={1}>Football Mode</MenuItem>
							<MenuItem value={1}>Table Tennis Mode</MenuItem>
						</Select>
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Counter;
