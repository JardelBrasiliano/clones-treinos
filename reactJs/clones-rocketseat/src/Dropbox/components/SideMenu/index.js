import { useEffect, useState } from 'react';
import * as Styles from './styles';

const scrollThreshold = 300;

export default function SideMenu({ Children }) {
  const [scrollY, setScrollY] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrollY(window.scrollY);
      setIsActive(false);
    }

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const classes = [
    isActive ? 'open' : '',
    scrollY <= scrollThreshold ? 'scrollopen' : ''
  ];
  const className = classes.join(' ').trim();

  return (
    <>
      <Styles.Container>{Children}</Styles.Container>
    </>
  );
}
