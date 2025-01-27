import React, { useState } from 'react';
import { exportGameState } from 'src/api-calls/exportGameState';

const ExportGameState: React.FC<{ campaignId: string; characterId: string }> = ({ campaignId, characterId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    setLoading(true);
    setError(null);
    try {
      const gameState = await exportGameState(campaignId, characterId);
      const blob = new Blob([gameState], { type: 'application/json' });
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
    <div>
      <button onClick={handleExport} disabled={loading}>
        {loading ? 'Exporting...' : 'Export Game State'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ExportGameState;
