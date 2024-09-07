import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export interface CountCardProps {
  sx?: SxProps;
  text: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;
}

export function CountCard({text, value, icon, iconBg }: CountCardProps): React.JSX.Element {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack spacing={3}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                {text}
              </Typography>
              <Typography variant="h4">{value}</Typography>
            </Stack>
            <Avatar sx={{ backgroundColor: iconBg, height: '56px', width: '56px' }}>
              {icon}
            </Avatar>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
