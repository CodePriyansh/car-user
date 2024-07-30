// ClipSpinner.tsx

import React from 'react';
import { ClipLoader } from 'react-spinners';

interface ClipSpinnerProps {
  loading: boolean;
}

const ClipSpinner: React.FC<ClipSpinnerProps> = ({ loading }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <ClipLoader color={'#EF6E0B'} loading={loading} size={35} />
    </div>
  );
};

export default ClipSpinner;
