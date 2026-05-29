import { StackedArticleCards } from "@/components/ui/stacked-article-cards";

export function LetsConnectSection() {
  return (
    <section
      className="flex min-h-full flex-col bg-white text-neutral-950"
      aria-labelledby="lets-connect-heading"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center px-[clamp(1.5rem,5vw,3rem)] py-[clamp(3rem,8vh,5rem)]">
        <h2
          id="lets-connect-heading"
          className="font-geist mb-12 text-center text-[clamp(2rem,4vw,3rem)] font-medium leading-tight tracking-[-0.03em] text-neutral-900"
        >
          Let&apos;s connect
        </h2>
        <StackedArticleCards />
      </div>
    </section>
  );
}
