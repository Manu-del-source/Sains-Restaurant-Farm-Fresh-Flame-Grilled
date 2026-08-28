import type { MouseEvent } from 'react';

/**
 * Smoothly scroll to an element by selector, or scroll to top for '#'.
 */
export function scrollToElement(e: MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  if (href === '#' || !href) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
