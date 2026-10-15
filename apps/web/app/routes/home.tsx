import { redirect, useLoaderData } from "react-router";
import type { Route } from "./+types/home";
import type { TimelineResponse } from "@aihot/contracts/site";
import { cachedPage, loadOr404 } from "../lib/api.server";
import { pageReuse } from "../lib/page-reuse";
import { filterParams, hasFeedFilters, itemListLd, listPath, pageMeta, readFilters, siteLd } from "../lib/seo";
import { inNav } from "../components/shell/nav";
import type { Screen } from "../components/shell/screens";
import { Timeline } from "../features/feed/Timeline";
import { HotTopics } from "../features/feed/HotTopics";
import { ActiveFilters, CategoryTabs, FeedBar, SearchField } from "../features/feed/Filters";
import { SITE } from "@aihot/site";

export const handle: Screen = { tab: "featured", name: "精选" };
export { pageHeaders as headers } from "../lib/api.server";
export const { clientLoader, shouldRevalidate } = pageReuse<typeof loader>();

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  // Search lives on /all; keep the parameters so old links still land on results.
  if (q && q.trim()) throw redirect(`/all${url.search}`);
  const filters = readFilters(url.searchParams);
  const upstream = new Headers();
  const data = await loadOr404<TimelineResponse>(listPath("/api/site/timeline", filterParams(filters)), { responseHeaders: upstream, signal: request.signal });
  return cachedPage(60, { data, filters }, upstream);
}

export function meta({ loaderData }: Route.MetaArgs) {
  const path = listPath("/", loaderData ? filterParams(loaderData.filters) : {});
  const titles = loaderData?.data.cards.map((c) => c.item.title) ?? [];
  return pageMeta({ path, noindex: hasFeedFilters(loaderData?.filters), jsonLd: path === "/" ? [...siteLd(), itemListLd("/", "精选", titles)] : undefined });
}

export default function Home() {
  const { data, filters } = useLoaderData<typeof loader>();
  const title = filters.tag ? `#${filters.tag}` : "精选";
  return (
    <div className="pb-6">
      {/* Phones: the bar (精选 | 全部, filter, search), the filter in use, today's hot topics, the feed. */}
      <FeedBar base="/" category={filters.category} channel={filters.channel} />
      <ActiveFilters base="/" category={filters.category} channel={filters.channel} tag={filters.tag} />
      {!filters.tag && !filters.category && filters.channel === "all" && (
        <section className="market-hero mb-5 mt-2 overflow-hidden rounded-sheet border border-line bg-surface px-5 py-5 lg:mb-6 lg:mt-0 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10 lg:px-7 lg:py-7">
          <div>
            <div className="mb-3 flex items-center gap-2 text-[10px] font-bold tracking-[0.16em] text-accent">
              <span className="h-px w-7 bg-energy" />
              CIMC ENRIC · MARKET INTELLIGENCE
            </div>
            <h1 className="text-[25px] font-bold leading-[1.18] tracking-[-0.035em] text-ink lg:text-[34px]">{SITE.name}</h1>
            <p className="mt-3 max-w-[650px] text-[14px] leading-6 text-ink-3 lg:text-[15px]">
              追踪 LNG、绿色甲醇与氨的价格变化，解释战争、航运、政策与供需如何传导。
            </p>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2 lg:mt-0">
            {[["01", "盯价格"], ["02", "找驱动"], ["03", "判影响"]].map(([n, label]) => (
              <div key={n} className="min-w-[76px] border-t-2 border-accent pt-2">
                <div className="text-[9px] font-bold tracking-[0.14em] text-energy">{n}</div>
                <div className="mt-1 text-[13px] font-semibold text-ink-2">{label}</div>
              </div>
            ))}
          </div>
        </section>
      )}
      <div className="hidden lg:block">
        <h1 className="text-[20px] font-semibold leading-[1.3] text-ink">{title}</h1>
        <div className="mb-5 mt-4 flex items-center justify-between gap-4">
          <CategoryTabs base="/" category={filters.category} channel={filters.channel} layoutId="home-cat-desk" className="min-w-0" />
          <SearchField keep={{ category: filters.category }} />
        </div>
      </div>

      {data.hot && inNav("/hot") && <HotTopics entries={data.hot} />}

      <Timeline initial={data} filters={data.filters} />
    </div>
  );
}
