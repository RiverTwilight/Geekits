import React from 'react';
import { 
  Grid, 
  Card, 
  CardMedia, 
  IconButton,
  Box 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ImageGalleryProps {
  assets: string[];
  onDelete: (index: number) => void;
}

export function ImageGallery({ assets, onDelete }: ImageGalleryProps) {
  if (!assets.length) return null;

  return (
    <Grid container spacing={2}>
      {assets.map((src, index) => (
        <Grid item xs={4} sm={3} key={index}>
          <Card>
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height="120"
                image={src}
                alt={`Frame ${index + 1}`}
              />
              <IconButton
                size="small"
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  bgcolor: 'rgba(0, 0, 0, 0.27)',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.4)',
                  },
                }}
                onClick={() => onDelete(index)}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
} 
