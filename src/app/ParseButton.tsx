'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { parseFeedFile } from '@/parser/parser';

const ParseButton = () => {
    return (
        <Button onClick={() => parseFeedFile('../../merchantExample.txt', 'fakeId')}>Parse</Button>
    );
};

export default ParseButton;