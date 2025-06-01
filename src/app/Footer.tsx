import React from 'react';
import { grey } from '@mui/material/colors';
import { Divider, Link, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import EmailIcon from '@mui/icons-material/Email';
import MapIcon from '@mui/icons-material/Map';

const Footer = () => {
    return (
        <Stack
            direction='row'
            justifyContent='center'
            sx={{ borderTop: `2px solid ${grey[300]}` }}
        >
            <Stack
                component='footer'
                paddingInline={4}
                paddingBlock={3}
                spacing={2}
                flexGrow={1}
                maxWidth='xl'
                divider={<Divider orientation='horizontal'/>}
            >
                <Stack
                    direction='row'
                    spacing={15}
                >
                    <Stack
                        flexBasis='35%'
                        spacing={2}
                    >
                        <Typography fontSize={18} fontWeight={600}>
                            Comparly
                        </Typography>
                        <Typography variant='body2'>
                            Nie jesteśmy najtańsi na rynku… bo niczego nie sprzedajemy. Ale pokażemy Ci, kto jest!
                        </Typography>
                    </Stack>
                    <Stack
                        flexBasis='35%'
                        spacing={2}
                    >
                        <Typography fontSize={18} fontWeight={600}>
                            Info
                        </Typography>
                        <Stack
                            direction='column'
                            alignItems='start'
                            spacing={2}
                        >
                            <Link
                                component='button'
                                variant='body2'
                                color='textPrimary'
                                underline='hover'>
                                Home
                            </Link>
                            <Link
                                component='button'
                                variant='body2'
                                color='textPrimary'
                                underline='hover'>
                                Dodaj swój sklep
                            </Link>
                            <Link
                                component='button'
                                variant='body2'
                                color='textPrimary'
                                underline='hover'>
                                O nas
                            </Link>
                        </Stack>
                    </Stack>
                    <Stack
                        flexBasis='30%'
                        spacing={2}
                    >
                        <Typography fontSize={18} fontWeight={600}>
                            Movement Agency
                        </Typography>
                        <Stack
                            direction='column'
                            alignItems='start'
                            spacing={2}
                        >
                            <Stack
                                direction='row'
                                spacing={1}
                            >
                                <EmailIcon fontSize='small'/>
                                <Typography variant='body2'>
                                    contact@movementagency.io
                                </Typography>
                            </Stack>
                            <Stack
                                direction='row'
                                spacing={1}
                            >
                                <MapIcon fontSize='small'/>
                                <Typography variant='body2'>
                                    Warsaw, Poland
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
                <Typography variant='subtitle2' alignSelf='start'>
                    © 2025 Comparly by Movement.
                </Typography>
            </Stack>
        </Stack>

    );
};

export default Footer;