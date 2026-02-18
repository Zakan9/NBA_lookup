import React, { useState, useEffect } from 'react';
import {
  Typography,
  Container,
  Grid2 as Grid,
  Pagination,
  Box,
  Skeleton,
  Alert,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import PlayerCard from '@/components/PlayerCard/PlayerCard';
import { fetchPlayers } from '@/api/playersApi';
import { PlayersResponse } from '@/types/nba';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const PLAYERS_PER_PAGE = 6;

const Home: React.FC = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<PlayersResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [pageInput, setPageInput] = useState('');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const loadPlayers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchPlayers(page, PLAYERS_PER_PAGE, debouncedSearch);
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load players'));
      } finally {
        setIsLoading(false);
      }
    };

    loadPlayers();
  }, [page, debouncedSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  const handlePageInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const parsed = parseInt(pageInput, 10);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= (data?.meta.total_pages ?? 1)) {
        setPage(parsed);
        setPageInput('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ mb: 4 }}>
        <SportsBasketballIcon sx={{ fontSize: 48, color: 'primary.main' }} />
        <Box>
          <Typography variant="h3" component="h1" fontWeight="bold">
            NBA Players
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Browse and discover NBA players
          </Typography>
        </Box>
      </Stack>
      {/* Search Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by first name..."
          size="small"
          sx={{ width: { xs: '100%', sm: 400 } }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: search && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearch('')}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      {/* Error State */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Failed to load players. Please try again later.
        </Alert>
      )}

      {/* Loading State */}
      {isLoading && (
        <Grid container spacing={3}>
          {Array.from({ length: PLAYERS_PER_PAGE }).map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Skeleton variant="rectangular" height={280} sx={{ borderRadius: 1 }} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Players Grid */}
      {!isLoading && data && (
        <>
          <Grid container spacing={3}>
            {data.data.map((player) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={player._id}>
                <PlayerCard player={player} />
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {data.meta.total_pages > 1 && (
            <Box
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 4, flexWrap: 'wrap' }}
            >
              <Pagination
                count={data.meta.total_pages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Go to page:
                </Typography>
                <TextField
                  size="small"
                  value={pageInput}
                  onChange={handlePageInputChange}
                  onKeyDown={handlePageInputSubmit}
                  placeholder={`1–${data.meta.total_pages}`}
                  sx={{ width: 80 }}
                  inputProps={{ min: 1, max: data.meta.total_pages }}
                />
              </Box>
            </Box>
          )}

          {/* Results Info */}
          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 2 }}>
            Showing {(page - 1) * PLAYERS_PER_PAGE + 1} - {Math.min(page * PLAYERS_PER_PAGE, data.meta.total_count)} of{' '}
            {data.meta.total_count} players
          </Typography>
        </>
      )}
    </Container>
  );
};

export default Home;
