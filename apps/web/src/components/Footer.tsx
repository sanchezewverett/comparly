'use client';

import React from 'react';
import { grey } from '@mui/material/colors';
import { Divider, Link, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import EmailIcon from '@mui/icons-material/Email';
import { useMediaQuery, useTheme } from '@mui/system';
import HiddenButton from '@/components/HiddenButton';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { GENERAL_QUESTION_URL, LICENSE_QUESTION_URL } from '@/constant';
import BusinessIcon from '@mui/icons-material/Business';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SignpostIcon from '@mui/icons-material/Signpost';

const Footer = () => {
  const theme = useTheme();
  const isUpMedium = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Stack direction="row" justifyContent="center" sx={{ borderTop: `2px solid ${grey[300]}` }}>
      <Stack
        component="footer"
        paddingInline={3}
        paddingBlock={3}
        spacing={2}
        flexGrow={1}
        maxWidth="xl"
        divider={<Divider orientation="horizontal" />}
      >
        <Stack direction={isUpMedium ? 'row' : 'column'} spacing={4}>
          <Stack flexBasis="35%" spacing={2}>
            <Typography fontSize={18} fontWeight={600}>
              Comparly
            </Typography>
            <Typography variant="body2">
              Nie jesteśmy najtańsi na rynku… bo niczego nie sprzedajemy.
              <br /> Ale pokażemy Ci, kto jest!
            </Typography>
          </Stack>
          <Stack flexBasis="35%" spacing={2}>
            <Typography fontSize={18} fontWeight={600}>
              Info
            </Typography>
            <Stack direction="column" alignItems="start" spacing={2}>
              <Link component="button" variant="body2" color="textPrimary" underline="hover">
                Home
              </Link>
              <Link
                href={LICENSE_QUESTION_URL}
                target="_blank"
                variant="body2"
                color="textPrimary"
                underline="hover"
              >
                Dodaj swój sklep
              </Link>
              <Link component="button" variant="body2" color="textPrimary" underline="hover">
                O nas
              </Link>
              <Link
                target="_blank"
                href={GENERAL_QUESTION_URL}
                variant="body2"
                color="textPrimary"
                underline="hover"
              >
                Masz pytanie - napisz tutaj
              </Link>
            </Stack>
          </Stack>
          <Stack flexBasis="30%" spacing={2}>
            <Typography fontSize={18} fontWeight={600}>
              Movement Agency
            </Typography>
            <Stack direction="column" alignItems="start" spacing={2}>
              <Stack direction="row" spacing={1}>
                <EmailIcon fontSize="small" />
                <HiddenButton value="comparly@themovement.agency" showText="Pokaż email" />
              </Stack>
              <Stack direction="row" spacing={1}>
                <LocalPhoneIcon fontSize="small" />
                <HiddenButton value="+48 660 870 296" showText="Pokaż numer" />
              </Stack>
              <Stack direction="row" spacing={1}>
                <BusinessIcon fontSize="small" />
                <Typography variant="body2">Movement Digital</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <SignpostIcon fontSize="small" />
                <Typography variant="body2">ul. Radosna 33</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <LocationCityIcon fontSize="small" />
                <Typography variant="body2">16-002, Nowe Aleksandrowo</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Typography variant="subtitle2" alignSelf="start">
          © 2025 Comparly by Movement.
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Footer;
