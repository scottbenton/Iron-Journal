import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Typography } from '@mui/material';
import { exportGameState } from '../../../../../api-calls/exportGameState';

const ExportGameState: React.FC<{ open: boolean; onClose: () => void; campaignId: string; characterId: string }> = ({ open, onClose, campaignId, characterId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const gameState = await exportGameState(campaignId, characterId);
      const blob = new Blob([JSON.stringify(gameState)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'game-state.json';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to export game state.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Export Game State</DialogTitle>
      <DialogContent>
        {error && <Typography color="error">{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleExport} color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Export'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExportGameState;
