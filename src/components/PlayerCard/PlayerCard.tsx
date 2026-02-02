import React from 'react';
import { Card, CardContent, CardActionArea, Typography, Box, Chip, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Player } from '@/types/nba';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

interface PlayerCardProps {
  player: Player;
}

const getPositionColor = (position: string) => {
  switch (position) {
    case 'G':
      return '#4CAF50';
    case 'F':
      return '#2196F3';
    case 'C':
      return '#FF9800';
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
    case 'F-C':
      return 'Forward-Center';
    default:
      return position;
  }
};

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/player/${player.id}`);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea onClick={handleClick} sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            background: `linear-gradient(135deg, ${getPositionColor(player.position)}22 0%, ${getPositionColor(player.position)}44 100%)`,
            p: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: 'background.paper',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 2,
            }}
          >
            <Typography variant="h3" fontWeight="bold" color="primary">
              #{player.jersey_number}
            </Typography>
          </Box>
          <Chip
            label={player.team.abbreviation}
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              fontWeight: 'bold',
            }}
          />
        </Box>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
            {player.first_name} {player.last_name}
          </Typography>

          <Stack direction="row" spacing={1} mb={2}>
            <Chip
              icon={<SportsBasketballIcon sx={{ fontSize: 16 }} />}
              label={getPositionFullName(player.position)}
              size="small"
              sx={{
                backgroundColor: getPositionColor(player.position),
                color: 'white',
                fontWeight: 500,
              }}
            />
          </Stack>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            {player.team.full_name}
          </Typography>

          <Stack direction="row" spacing={2} mt={2}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Height
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {player.height}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Weight
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {player.weight} lbs
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Country
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {player.country}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PlayerCard;
