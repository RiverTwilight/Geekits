import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack
} from '@mui/material';
import { GifConfig } from '../types';

const defaultForm = [
  { name: 'Height (empty for auto)', value: '' },
  { name: 'Width (empty for auto)', value: '' },
  { name: 'Quality (lower is better)', value: '10' },
  { name: 'Delay between frames (seconds)', value: '1' },
];

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (config: GifConfig) => void;
}

export function SettingsDialog({ open, onClose, onSave }: SettingsDialogProps) {
  const [form, setForm] = useState(defaultForm);

  const handleChange = (index: number, value: string) => {
    setForm(prev => 
      prev.map((field, i) => 
        i === index ? { ...field, value } : field
      )
    );
  };

  const handleSave = () => {
    const config: GifConfig = {
      height: form[0].value === '' ? null : Number(form[0].value),
      width: form[1].value === '' ? null : Number(form[1].value),
      quality: Number(form[2].value),
      delay: Number(form[3].value),
    };
    onSave(config);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {form.map((field, index) => (
            <TextField
              key={field.name}
              label={field.name}
              type="number"
              value={field.value}
              onChange={(e) => handleChange(index, e.target.value)}
              fullWidth
            />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
} 
