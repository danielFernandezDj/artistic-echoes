"use client"

/**
 * Container.tsx
 *
 * A reusable layout wrapper component that handles
 * positioning, max-width, and responsive padding.
 *
 * Props:
 * - size: preset sizing classes (e.g. 'full', 'lg')
 * - position: optional positioning class (e.g. 'relative', 'fixed')
 * - className: any additional tailwind classes to apply
 */

import React, { JSX } from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  position?: 'static' | 'fixed' | 'absolute' | 'relative' | 'sticky';
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  as: Component = 'div',
  size = 'lg',
  padding = 'md',
  position = 'absolute'
}) => {
  const maxWidthClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  const positionClasses = {
    static: 'static',
    fixed: 'fixed',
    absolute: 'absolute',
    relative: 'relative',
    sticky: 'sticky'
  }

  const paddingClasses = {
    none: 'px-0',
    sm: 'px-4 sm:px-6',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-4 sm:px-6 lg:px-12',
  };

  const containerClasses = `
    mx-auto
    w-full
    ${maxWidthClasses[size]}
    ${paddingClasses[padding]}
    ${positionClasses[position]}
    ${className}
  `.trim();

  return <Component className={containerClasses}>{children}</Component>;
};

export default Container;