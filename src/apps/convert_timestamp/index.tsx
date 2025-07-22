import React, { useState } from "react";
import Box from "@mui/material/Box";
import OutlinedCard from "@/components/OutlinedCard";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const unixToHuman = (timestamp: string) => {
  const ts = Number(timestamp);
  if (isNaN(ts)) return "Invalid timestamp";
  try {
    const date = new Date(ts * 1000);
    return date.toLocaleString();
  } catch {
    return "Invalid timestamp";
  }
};

const humanToUnix = (dateStr: string) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "Invalid date/time";
  return Math.floor(date.getTime() / 1000).toString();
};

const ConvertTimestamp: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleConvert = () => {
    if (tab === 0) {
      setResult(unixToHuman(input));
    } else {
      setResult(humanToUnix(input));
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 500, mx: "auto" }}>
      <OutlinedCard>
        <Tabs
          value={tab}
          onChange={(_, v) => {
            setTab(v);
            setInput("");
            setResult("");
          }}
          variant="fullWidth"
        >
          <Tab label="UNIX → Human" />
          <Tab label="Human → UNIX" />
        </Tabs>
        <Box sx={{ mt: 3, px: 2, pb: 2 }}>
          <TextField
            fullWidth
            label={tab === 0 ? "UNIX Timestamp (seconds)" : "Date/Time (e.g. 2024-06-01 12:00:00)"}
            value={input}
            onChange={e => setInput(e.target.value)}
            margin="normal"
            placeholder={tab === 0 ? "1719830400" : "2024-06-01 12:00:00"}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleConvert}
          >
            Convert
          </Button>
          {result && (
            <Typography sx={{ mt: 3 }} variant="h6" align="center">
              {result}
            </Typography>
          )}
        </Box>
      </OutlinedCard>
    </Box>
  );
};

export default ConvertTimestamp; 
