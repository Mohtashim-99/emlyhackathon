/*
 * Copyright (c) 2025 MiyaInfotech.
 * All Rights Reserved.
 * This software is the confidential and proprietary information of MiyaInfotech.
 * Any unauthorized copying, distribution, or modification of this software, via any medium,
 * is strictly prohibited and will result in legal action.
 * All violators will be prosecuted to the fullest extent of the law.
 */

import * as React from 'react';

import { cn } from '@remis/ares/utils';

export type RatingVariant = 'singleStar' | 'multipleStars';

export interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  rate?: number;
  max?: number;
  variant?: RatingVariant;
  showScore?: boolean;
  description?: string;
}

export function Rating({
  rate = 0,
  max = 5,
  variant = 'multipleStars',
  showScore = false,
  description,
  className,
  ...props
}: RatingProps) {
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 !== 0;

  if (variant === 'singleStar') {
    return (
      <div
        className={cn(
          'flex items-center gap-2 rounded-xl bg-accent px-4 py-2 w-fit text-accent-foreground',
          className,
        )}
        {...props}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-current" fill="currentColor" aria-hidden>
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
        {showScore ? <span className="text-sm font-semibold">{rate.toFixed(1)}</span> : null}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-2 text-sm text-golden', className)} {...props}>
      <div className="flex items-center">
        {Array.from({ length: max }).map((_, index) => {
          const isFull = index < fullStars;
          const isHalf = index === fullStars && hasHalfStar;

          return (
            <div key={index} className="relative">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-current/30"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>

              {isFull || isHalf ? (
                <div
                  className={cn('absolute inset-0 overflow-hidden', isHalf ? 'w-1/2' : 'w-full')}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-current"
                    fill="currentColor"
                    stroke="none"
                    aria-hidden
                  >
                    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {showScore ? <span className="font-medium text-foreground">{rate.toFixed(1)}</span> : null}

      {description ? <span className="text-muted-foreground">{description}</span> : null}
    </div>
  );
}
