import React from 'react';

const banner = require('Assets/img/banner.png');

const style = {
  height: '90vh',
  maxHeight: '1000px',
  overflow: 'hidden',
  position: 'sticky',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  margin: '0',
  padding: '0',
  border: '0',
  display: 'flex',
  alignItems: 'center'
};

export default function Parallax() {
  let windowScrollTop;
  if (window.innerWidth >= 768) {
    windowScrollTop = window.pageYOffset / 3;
  } else {
    windowScrollTop = 0;
  }
  const [transform, setTransform] = React.useState(
    `translate3d(0,${windowScrollTop}px,0)`
  );

  const resetTransform = () => {
    windowScrollTop = window.pageYOffset / 3;
    setTransform(`translate3d(0,${windowScrollTop}px,0)`);
  };

  React.useEffect(() => {
    if (window.innerWidth >= 768) {
      window.addEventListener('scroll', resetTransform);
    }
    return function cleanup() {
      if (window.innerWidth >= 768) {
        window.removeEventListener('scroll', resetTransform);
      }
    };
  });

  return (
    <div
      style={{
        ...style,
        backgroundImage: `url('${banner.default}')`,
        transform
      }}
    />
  );
}
