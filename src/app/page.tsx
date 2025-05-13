import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Stack } from '@mui/material';
import { grey } from '@mui/material/colors';

export default function Home() {

    const arr = [1, 2, 3, 4, 5, 6, 7]

    return (
        <Stack
            spacing={3}
            paddingInline={5}
            paddingBlock={2}
            direction='row'
            useFlexGap
            sx={{ flexWrap: 'wrap', backgroundColor: grey[50] }}
        >

            {arr.map((_, index) => (
                <Card sx={{ maxWidth: 345 }} key={index}>
                    <CardMedia
                        component='img'
                        height='194'
                        src='https://images.unsplash.com/photo-1599340695274-f8a2f344174d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        alt='Paella dish'
                    />
                    <CardContent>
                        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                            This impressive paella is a perfect party dish and a fun meal to cook
                            together with your guests. Add 1 cup of along with the mussels,
                            if you like.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label='add to favorites'>
                            <FavoriteIcon/>
                        </IconButton>
                        <IconButton aria-label='share'>
                            <ShareIcon/>
                        </IconButton>

                    </CardActions>
                </Card>
            ))}
        </Stack>
    );
}
