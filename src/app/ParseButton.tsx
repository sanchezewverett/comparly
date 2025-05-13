'use client';

import React from 'react';
import { parseFeedFile } from '@/parser/parser';
import { Button } from '@mui/material';

const ParseButton = () => {
    return (
        <Button onClick={() => parseFeedFile('../../merchantExample.txt')}>Parse</Button>
    );
};

export default ParseButton;