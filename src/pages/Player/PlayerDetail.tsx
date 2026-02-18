import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid2 as Grid,
  Chip,
  Button,
  Skeleton,
  Stack,
  Divider,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SchoolIcon from '@mui/icons-material/School';
import PublicIcon from '@mui/icons-material/Public';
import { fetchPlayer } from '@/api/playersApi';
import { Player } from '@/types/nba';

const getPositionColor = (position: string) => {
  switch (position) {
    case 'G':
      return '#4CAF50';
    case 'F':
      return '#2196F3';
    case 'C':
      return '#FF9800';
    case 'G-F':
      return '#af02ff';
    case 'F-G':
      return '#af02ff';
    case 'F-C':
      return '#f7e116';
    case 'C-F':
      return '#f7e116';
    default:
      return '#9E9E9E';
  }
};

const getPositionFullName = (position: string) => {
  switch (position) {
    case 'G':
      return 'Guard';
    case 'F':
      return 'Forward';
    case 'C':
      return 'Center';
    case 'G-F':
      return 'Guard-Forward';
    case 'F-G':
      return 'Guard-Forward';
    case 'F-C':
      return 'Forward-Center';
    case 'C-F':
      return 'Forward-Center';
    default:
      return position;
  }
};

const PlayerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [player, setPlayer] = useState<Player | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadPlayer = async () => {
      if (!id) return;

      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchPlayer(id);
        setPlayer(response.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load player'));
      } finally {
        setIsLoading(false);
      }
    };

    loadPlayer();
  }, [id]);

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Skeleton variant="rectangular" height={60} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={400} />
      </Container>
    );
  }

  if (error || !player) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mb: 2 }}>
          Back to Players
        </Button>
        <Alert severity="error">Player not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mb: 3 }}>
        Back to Players
      </Button>

      <Paper elevation={3} sx={{ overflow: 'hidden' }}>
        {/* Header */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${getPositionColor(player.position?.join('-') ?? '')}33 0%, ${getPositionColor(player.position?.join('-') ?? '')}66 100%)`,
            p: 4,
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  backgroundColor: 'background.paper',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 4,
                  mx: 'auto',
                }}
              >
                <Typography variant="h1" fontWeight="bold" color="primary">
                  #{player.jersey_number}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                {player.first_name} {player.last_name}
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip
                  icon={<SportsBasketballIcon />}
                  label={getPositionFullName(player.position?.join('-') ?? '')}
                  sx={{
                    backgroundColor: getPositionColor(player.position?.join('-') ?? ''),
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    py: 2,
                  }}
                />
                <Chip
                  label={player.team?.abbreviation}
                  variant="outlined"
                  sx={{ fontWeight: 'bold', fontSize: '1rem', py: 2 }}
                />
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Content */}
        <Box sx={{ p: 4 }}>
          {/* Team Info */}
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Team Information
          </Typography>
          <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  Team
                </Typography>
                <Typography variant="h6">{player.team?.full_name}</Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Conference
                </Typography>
                <Typography variant="h6">{player.team?.conference}</Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Division
                </Typography>
                <Typography variant="h6">{player.team?.division}</Typography>
              </Grid>
            </Grid>
          </Paper>

          <Divider sx={{ my: 3 }} />

          {/* Physical Stats */}
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Physical Stats
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Height
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {player.height ? `${player.height} cm` : 'N/A'}
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Weight
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {player.weight ? `${player.weight} kg` : 'N/A'}
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Position
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {player.position?.join('-') ?? ''}
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Jersey
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  #{player.jersey_number}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Background */}
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Background
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <SchoolIcon color="action" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    College
                  </Typography>
                  <Typography variant="body1">{player.college || 'N/A'}</Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <PublicIcon color="action" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Country
                  </Typography>
                  <Typography variant="body1">{player.country}</Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Draft Info */}
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Draft Information
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 4 }}>
              <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', backgroundColor: 'action.hover' }}>
                <Typography variant="body2" color="text.secondary">
                  Year
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {player.draft_year}
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', backgroundColor: 'action.hover' }}>
                <Typography variant="body2" color="text.secondary">
                  Round
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {player.draft_round}
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', backgroundColor: 'action.hover' }}>
                <Typography variant="body2" color="text.secondary">
                  Pick
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  #{player.draft_number}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default PlayerDetail;
