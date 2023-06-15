import Image from 'next/image';
import React from 'react';

const Loader = () => {
  return (
    <div className="Loader">
      <Image width={100} height={100} alt="Loading..." src="/loader.svg" />
    </div>
  );
};

export default Loader;
