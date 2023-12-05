'use client';

import { useEffect, useState } from 'react';
import { AiFillCaretUp } from 'react-icons/ai';

const ScrollToTopButton = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollPos = window.scrollY || window.pageYOffset;
      if (currentScrollPos > prevScrollPos) {
        setShowScrollButton(false);
      } else {
        setShowScrollButton(true);
      }
      setPrevScrollPos(currentScrollPos);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`${
        showScrollButton ? 'block' : 'hidden'
      } fixed bottom-[9.25rem] right-5 z-20 flex h-24 w-24 cursor-pointer items-center justify-center rounded-circle border border-solid border-gray12 bg-secondary text-title text-gray10 duration-200 hover:scale-110 active:scale-100 dark:bg-secondary`}
    >
      <AiFillCaretUp />
    </button>
  );
};

export default ScrollToTopButton;
