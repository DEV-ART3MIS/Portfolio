import { type MouseEventHandler, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  portfolioConnectArticles,
  type PortfolioArticleItem,
} from "@/data/portfolio";
import { cn } from "@/lib/utils";

/**
 * @author: @emerald-ui
 * @description: Stacked article cards that expand on click with smooth transitions
 * @version: 1.1.0
 * @license: MIT
 * @website: https://emerald-ui.com
 */

export type ArticleItem = PortfolioArticleItem;

/** Connect links — edit `src/data/portfolio.ts` (`portfolioConnectArticles`) */
export const defaultArticleItems: ArticleItem[] = portfolioConnectArticles;

/** Stacked top offset when collapsed (cards peek behind each other) */
const COLLAPSED_OFFSETS = [
  "top-6",
  "top-[calc(1.5rem+0.75rem)]",
  "top-[calc(1.5rem+1.5rem)]",
  "top-[calc(1.5rem+3rem)]",
];

/** Spread top offset when expanded */
const EXPANDED_OFFSETS = [
  "top-6",
  "top-[calc(1.5rem+112px+1rem)]",
  "top-[calc(1.5rem+224px+2rem)]",
  "top-[calc(1.5rem+336px+3rem)]",
];

const cardSurface =
  "border border-neutral-200 bg-white shadow-lg shadow-black/10 backdrop-blur-sm transition-all duration-1000 ease-[cubic-bezier(0.075,0.82,0.165,1)] hover:bg-neutral-50 dark:border-white/10 dark:bg-white/5 dark:shadow-black/20 dark:hover:bg-white/10";

export interface StackedArticleCardsProps {
  items?: ArticleItem[];
  className?: string;
}

export function StackedArticleCards({
  items = defaultArticleItems,
  className,
}: StackedArticleCardsProps) {
  const [isActive, setIsActive] = useState(false);

  const handleExpand = () => {
    setIsActive(true);
  };

  const handleCollapse: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    setIsActive(false);
  };

  return (
    <div
      className={cn("relative w-full max-w-md min-h-[560px]", className)}
      onClick={handleExpand}
      role="presentation"
    >
      {items.map((item, index) => (
        <div
          key={`${item.title}-${index}`}
          className={cn(
            "absolute right-0 flex h-28 w-96 cursor-pointer items-center gap-4 rounded-2xl p-5 max-md:w-72 md:right-6",
            cardSurface,
            isActive ? EXPANDED_OFFSETS[index] : COLLAPSED_OFFSETS[index]
          )}
        >
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex w-full items-center gap-4 no-underline",
              isActive ? "pointer-events-auto" : "pointer-events-none"
            )}
          >
            <div className="size-16 shrink-0 overflow-hidden rounded-xl ring-2 ring-neutral-200 dark:ring-white/10">
              <img
                src={item.img}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-1 truncate text-base font-semibold text-neutral-900 dark:text-neutral-100">
                {item.title}
              </p>
              <p className="line-clamp-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {item.subTitle}
              </p>
            </div>
          </a>
        </div>
      ))}

      <div
        className={cn(
          "absolute right-0 top-[calc(1.5rem+448px+4rem)] transition-all duration-300 ease-in-out md:right-6",
          isActive
            ? "visible pointer-events-auto opacity-100"
            : "invisible pointer-events-none opacity-0"
        )}
        onClick={handleCollapse}
        role="presentation"
      >
        <Button type="button" variant="secondary" size="sm">
          Show less
        </Button>
      </div>
    </div>
  );
}

export default StackedArticleCards;
