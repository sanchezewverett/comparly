import React, { FC, useState } from 'react';
import Typography from '@mui/material/Typography';

type Props = {
  value: string;
  showText: string;
};

const HiddenButton: FC<Props> = ({ value, showText }) => {
  const [showEmail, setShowEmail] = useState(false);

  return (
    <>
      {showEmail ? (
        <Typography variant="body2">{value}</Typography>
      ) : (
        <Typography sx={{ cursor: 'pointer' }} variant="body2" onClick={() => setShowEmail(true)}>
          {showText}
        </Typography>
      )}
    </>
  );
};

export default HiddenButton;
