import React, { useState } from 'react';
import Typography from '@mui/material/Typography';


const EmailButton = () => {
    const [showEmail, setShowEmail] = useState(false);

    return (
        <>
            {showEmail ?
                <Typography variant='body2'>
                    contact@movementagency.io
                </Typography>
                : <Typography
                    sx={{ cursor: 'pointer' }}
                    variant='body2'
                    onClick={() => setShowEmail(true)}
                >
                    Pokaż email
                </Typography>}
        </>
    );
};

export default EmailButton;