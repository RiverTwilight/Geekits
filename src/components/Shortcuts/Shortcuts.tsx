import React, { useState, useEffect } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import OutlinedCard from "../OutlinedCard";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CreateIcon from "@mui/icons-material/Create";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";

function Shortcuts() {
	const [shortcuts, setShortcuts] = useState([]);
	const [newShortcutLabel, setNewShortcutLabel] = useState("");
	const [newShortcutLink, setNewShortcutLink] = useState("");
	const [showForm, setShowForm] = useState<boolean>(false);

	useEffect(() => {
		let cachedShortcuts = localStorage.getItem("shortcuts");
		if (cachedShortcuts) {
			setShortcuts(JSON.parse(cachedShortcuts));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
	}, [shortcuts]);

	const handleAddShortcut = () => {
		if (newShortcutLabel !== "" && newShortcutLink !== "") {
			setShortcuts((prevShortcuts) => [
				...prevShortcuts,
				{ label: newShortcutLabel, link: newShortcutLink },
			]);
			setNewShortcutLabel("");
			setNewShortcutLink("");
		}
	};

	const handleRemoveShortcut = (shortcut) => {
		setShortcuts((prevShortcuts) =>
			prevShortcuts.filter((sc) => sc !== shortcut)
		);
	};

	const switchShowForm = () => {
		setShowForm(!showForm);
	};

	return (
		<OutlinedCard>
			<Box padding={2}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography variant="button">捷径</Typography>
					<IconButton onClick={switchShowForm}>
						{showForm ? <CheckCircleOutlineIcon /> : <CreateIcon />}
					</IconButton>
				</Box>
				{showForm && (
					<>
						<TextField
							value={newShortcutLabel}
							onChange={(e) =>
								setNewShortcutLabel(e.target.value)
							}
							placeholder="Shortcut Label"
						/>
						<br />
						<br />
						<TextField
							value={newShortcutLink}
							onChange={(e) => setNewShortcutLink(e.target.value)}
							placeholder="Shortcut Link"
						/>
						<br />
						<br />
						<Button variant="outlined" onClick={handleAddShortcut}>
							Confirm
						</Button>
					</>
				)}
				<Divider />
				<List sx={{ minHeight: "100px" }}>
					{shortcuts.map((shortcut) => (
						<ListItem
							secondaryAction={
								showForm && (
									<IconButton
										onClick={() =>
											handleRemoveShortcut(shortcut)
										}
									>
										<RemoveCircleOutlineIcon />
									</IconButton>
								)
							}
							key={shortcut.label}
						>
							<Link legacyBehavior href={shortcut.link}>
								<ListItemText primary={shortcut.label} />
							</Link>
						</ListItem>
					))}
				</List>
			</Box>
		</OutlinedCard>
	);
}

export default Shortcuts;
