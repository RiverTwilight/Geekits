import React, { useState } from "react";
import FilePicker from "@/components/FilePicker";
import OutlinedCard from "@/components/OutlinedCard";
import { Box, Button, Typography, IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import FileField from "@/components/FileField";

const applyMagicFilter = (img: HTMLImageElement): string => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx?.drawImage(img, 0, 0);
    if (ctx) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        // Simple magic filter: color shift (fun effect)
        for (let i = 0; i < data.length; i += 4) {
            // Swap R and B, boost G
            const r = data[i];
            data[i] = data[i + 2]; // B -> R
            data[i + 2] = r;       // R -> B
            data[i + 1] = Math.min(255, data[i + 1] * 1.2); // G boost
        }
        ctx.putImageData(imageData, 0, 0);
    }
    return canvas.toDataURL();
};

const ImageFilterApp: React.FC = () => {
    const [original, setOriginal] = useState<string | null>(null);
    const [filtered, setFiltered] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFileUpload = (_: any, file?: File | null) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            setOriginal(e.target?.result as string);
            setFiltered(null);
        };
        reader.readAsDataURL(file);
    };

    const handleApplyFilter = () => {
        if (!original) return;
        setLoading(true);
        const img = new window.Image();
        img.onload = () => {
            const filteredData = applyMagicFilter(img);
            setFiltered(filteredData);
            setLoading(false);
        };
        img.src = original;
    };

    const handleDownload = () => {
        if (!filtered) return;
        const a = document.createElement("a");
        a.href = filtered;
        a.download = "filtered-image.png";
        a.click();
    };

    return (
        <Box sx={{ maxWidth: 600, margin: "0 auto", p: 2 }}>
            <OutlinedCard padding={2}>
                <Typography variant="h5" align="center" gutterBottom>
                    Image Filter
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                    <FileField>
                        <FilePicker
                            fileType="image/*"
                            handleFileUpload={handleFileUpload}
                            enableDrag
                            title="Upload Image"
                        />
                    </FileField>
                </Box>
                {original && (
                    <Box sx={{ textAlign: "center", mb: 2 }}>
                        <Typography variant="subtitle1">Original Image</Typography>
                        <img
                            src={original}
                            alt="Original"
                            style={{ maxWidth: "100%", maxHeight: 300, borderRadius: 8, marginBottom: 8 }}
                        />
                    </Box>
                )}
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleApplyFilter}
                        disabled={!original || loading}
                    >
                        {loading ? "Applying..." : "Apply Magic Filter"}
                    </Button>
                </Box>
                {filtered && (
                    <Box sx={{ textAlign: "center", mb: 2 }}>
                        <Typography variant="subtitle1">Filtered Image</Typography>
                        <img
                            src={filtered}
                            alt="Filtered"
                            style={{ maxWidth: "100%", maxHeight: 300, borderRadius: 8, marginBottom: 8 }}
                        />
                        <Box>
                            <IconButton onClick={handleDownload} color="primary">
                                <DownloadIcon />
                            </IconButton>
                        </Box>
                    </Box>
                )}
            </OutlinedCard>
        </Box>
    );
};

export default ImageFilterApp; 
