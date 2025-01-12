import React, { useState, useEffect } from "react";
import {
	Routes,
	Route,
	Link,
} from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import { marked } from "marked";
import {
	TextField,
	Button,
	List,
	ListItem,
	ListItemText,
	Divider,
	IconButton,
	Tab,
	Tabs,
	Box,
	Typography,
	Fab,
} from "@mui/material";
import {
	Add as AddIcon,
	Delete as DeleteIcon,
	Check as CheckIcon,
	DeleteSweep as DeleteSweepIcon,
} from "@mui/icons-material";
import MdEditor from "../../components/MdEditor";

interface Note {
	title?: string;
	content: string;
	tags?: string;
	date?: string;
}

const MarkdownPreview: React.FC<{ md: string }> = ({ md }) => {
	return (
		<Box
			className="markdown-body"
			dangerouslySetInnerHTML={{ __html: marked(md) }}
		/>
	);
};

const useNotes = () => {
	const [notes, setNotes] = useState<Note[]>(() => {
		const saved = localStorage.getItem("note");
		return saved ? JSON.parse(saved) : [];
	});

	const updateStorage = (updatedNotes: Note[]) => {
		localStorage.setItem("note", JSON.stringify(updatedNotes));
		setNotes(updatedNotes);
	};

	const addNote = (newNote: Note) => {
		updateStorage([...notes, newNote]);
	};

	const updateNote = (index: number, newNote: Note) => {
		const updated = [...notes];
		updated[index] = newNote;
		updateStorage(updated);
	};

	const deleteNote = (index: number) => {
		const updated = notes.filter((_, i) => i !== index);
		updateStorage(updated);
	};

	return { notes, addNote, updateNote, deleteNote };
};

const Edit: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { notes, updateNote } = useNotes();
	const [tab, setTab] = useState(0);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const noteId = params.get("id");
		if (noteId && notes[parseInt(noteId)]) {
			const note = notes[parseInt(noteId)];
			setTitle(note.title || "");
			setContent(note.content);
		}
	}, [location.search, notes]);

	const handleSave = () => {
		const params = new URLSearchParams(location.search);
		const noteId = parseInt(params.get("id") || "0");
		const newNote: Note = {
			title,
			content,
			tags: "a b c",
			date: new Date().toLocaleString(),
		};
		updateNote(noteId, newNote);
	};

	return (
		<Box sx={{ p: 2 }}>
			<TextField
				fullWidth
				label="Title (optional)"
				value={title}
				onChange={(e) => {
					setTitle(e.target.value);
					handleSave();
				}}
				sx={{ mb: 2 }}
			/>

			<Tabs
				value={tab}
				onChange={(_, newValue) => setTab(newValue)}
				sx={{ mb: 2 }}
			>
				<Tab label="Edit" />
				<Tab label="Preview" />
			</Tabs>

			<Box hidden={tab !== 0}>
				<MdEditor
					live={true}
					content={content}
					cb={(newText: string) => {
						setContent(newText);
						handleSave();
					}}
				/>
			</Box>

			<Box hidden={tab !== 1}>
				<MarkdownPreview md={content} />
			</Box>

			<Button
				variant="contained"
				onClick={() => navigate("/app/notepad")}
				sx={{ mt: 2 }}
			>
				Back
			</Button>
		</Box>
	);
};

const NotesList: React.FC<{
	notes: Note[];
	editMode: boolean;
	onDelete: (index: number) => void;
}> = ({ notes, editMode, onDelete }) => {
	const navigate = useNavigate();

	return (
		<List>
			{notes.map(
				(note, i) =>
					note.content && (
						<React.Fragment key={i}>
							<ListItem
								button={!editMode}
								onClick={() =>
									!editMode &&
									navigate(`/app/notepad/edit?id=${i}`)
								}
								secondaryAction={
									editMode && (
										<IconButton
											edge="end"
											onClick={() => onDelete(i)}
										>
											<DeleteIcon color="error" />
										</IconButton>
									)
								}
							>
								<ListItemText
									primary={note.title}
									secondary={
										<>
											<Typography variant="body2" noWrap>
												{note.content}
											</Typography>
											<Typography
												variant="caption"
												color="textSecondary"
											>
												{note.date}
											</Typography>
										</>
									}
								/>
							</ListItem>
							<Divider />
						</React.Fragment>
					)
			)}
		</List>
	);
};

const Home: React.FC = () => {
	const [editMode, setEditMode] = useState(false);
	const { notes, addNote, deleteNote } = useNotes();
	const navigate = useNavigate();

	return (
		<Box sx={{ p: 2 }}>
			{!notes.length && (
				<Typography align="center" color="textSecondary">
					Click the + button to add a note
				</Typography>
			)}

			{!!notes.length && (
				<Button
					variant="contained"
					startIcon={editMode ? <CheckIcon /> : <DeleteSweepIcon />}
					onClick={() => setEditMode(!editMode)}
					sx={{ mb: 2 }}
				>
					{editMode ? "Done" : "Edit"}
				</Button>
			)}

			<NotesList
				notes={notes}
				editMode={editMode}
				onDelete={deleteNote}
			/>

			<Fab
				color="primary"
				sx={{ position: "fixed", bottom: 16, right: 16 }}
				onClick={() => {
					addNote({ content: "" });
					navigate(`/app/notepad/edit?id=${notes.length}`);
				}}
			>
				<AddIcon />
			</Fab>
		</Box>
	);
};

const Note: React.FC = () => (
	<Routes>
		<Route path="/app/notepad" element={<Home />} />
		<Route path="/app/notepad/edit" element={<Edit />} />
	</Routes>
);

export default Note;
