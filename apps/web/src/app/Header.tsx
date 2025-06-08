import React from 'react';
import { Button, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'
import AppLogo from '@/components/AppLogo';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

const Header = () => {
    return (
        <Stack
            component='header'
            bgcolor='white'
            paddingInline={5}
            paddingBlock={2}
            boxShadow={1}
            flexDirection='row'
            alignItems='center'
            justifyContent='center'
            position='sticky'
            top='0'
        >
            <AppLogo/>
            <Stack
                direction='row'
                justifyContent='flex-end'
                spacing={2}
                maxWidth='lg'
                width='100%'
            >
                <TextField
                    label='Wyszukaj produkt'
                    size='small'
                    variant='outlined'
                    sx={{ width: '40%' }}
                    slotProps={{ input: { endAdornment: <SearchIcon/> } }}/>
                <Button startIcon={<AddBusinessIcon/>} variant='contained'>Dodaj swój sklep</Button>
            </Stack>
        </Stack>
    );
};

export default Header;