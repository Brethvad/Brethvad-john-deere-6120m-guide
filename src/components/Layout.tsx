import { ChevronRight, Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { NAV, titleFor } from "@/content";
import { TRACTOR } from "@/content/config";
import { recordVisit } from "@/lib/recent";
import { Icon } from "./Icon";

const GROUP_ORDER = ["Oversikt", "Førerhus", "Betjening", "Systemer", "Kontroll og vedlikehold", "Referanse"];

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Hovedmeny" className="space-y-5">
      {GROUP_ORDER.map((group) => {
        const items = NAV.filter((n) => n.group === group);
        if (!items.length) return null;
        return (
          <div key={group}>
            <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted">{group}</p>
            <ul className="space-y-0.5">
              {items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 rounded-lg px-3 py-2 text-[15px] font-medium transition-colors ${
                        isActive ? "bg-jd-700 text-white" : "text-ink hover:bg-jd-50 hover:text-jd-800"
                      }`
                    }
                  >
                    <Icon name={item.icon} />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}

function SearchBox({ autoFocus = false, onDone }: { autoFocus?: boolean; onDone?: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [q, setQ] = useState(location.pathname === "/sok" ? params.get("q") ?? "" : "");
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        ref.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        if (q.trim()) {
          navigate(`/sok?q=${encodeURIComponent(q.trim())}`);
          onDone?.();
        }
      }}
      className="relative w-full"
    >
      <label htmlFor="global-search" className="sr-only">Søk i guiden</label>
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
      <input
        id="global-search"
        ref={ref}
        autoFocus={autoFocus}
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Søk: «differensialsperre», «lyser rødt», «olje» …"
        className="h-10 w-full rounded-lg border border-line bg-white pl-9 pr-16 text-[15px] placeholder:text-muted/80 focus:border-jd-600 focus:outline-none"
      />
      <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-line bg-surface px-1.5 text-[11px] text-muted sm:block">Ctrl K</kbd>
    </form>
  );
}

function Breadcrumbs() {
  const location = useLocation();
  if (location.pathname === "/") return null;
  const title = titleFor(location.pathname) || (location.pathname === "/sok" ? "Søk" : "");
  return (
    <nav aria-label="Brødsmulesti" className="mb-4 flex items-center gap-1 text-sm text-muted">
      <Link to="/" className="hover:text-jd-800 hover:underline">Oversikt</Link>
      <ChevronRight className="size-3.5" aria-hidden />
      <span aria-current="page" className="font-medium text-ink">{title}</span>
    </nav>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  // The menu belongs to the page it was opened on, so navigating closes it.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === location.pathname;
  const setOpen = (v: boolean) => setOpenAt(v ? location.pathname : null);

  useEffect(() => {
    const t = titleFor(location.pathname);
    recordVisit(location.pathname, t);
    document.title = t ? `${t} — 6120M førerguide` : "John Deere 6120M — interaktiv førerguide";
    if (!location.hash) window.scrollTo({ top: 0 });
    else document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-dvh">
      <a href="#hovedinnhold" className="sr-only z-50 rounded bg-jd-700 px-3 py-2 text-white focus:not-sr-only focus:fixed focus:left-3 focus:top-3">
        Hopp til innhold
      </a>
      <header className="sticky top-0 z-30 border-b border-jd-900/20 bg-jd-800 text-white">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-3 px-4">
          <button onClick={() => setOpen(true)} className="-ml-1 rounded-lg p-2 hover:bg-white/10 lg:hidden" aria-label="Åpne meny">
            <Menu className="size-5" />
          </button>
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <img src="/favicon.svg" alt="" className="size-8" />
            <span className="leading-tight">
              <span className="block text-[15px] font-bold">6120M førerguide</span>
              <span className="block text-[11px] text-white/70">Basert på {TRACTOR.manual.split(" ")[0]}</span>
            </span>
          </Link>
          <div className="ml-auto hidden w-full max-w-md md:block">
            <SearchBox />
          </div>
          <Link to="/sok" className="ml-auto rounded-lg p-2 hover:bg-white/10 md:hidden" aria-label="Søk">
            <Search className="size-5" />
          </Link>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Meny">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-xs overflow-y-auto bg-white p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-bold text-jd-900">Meny</span>
              <button onClick={() => setOpen(false)} className="rounded-lg p-2 hover:bg-surface" aria-label="Lukk meny">
                <X className="size-5" />
              </button>
            </div>
            <div className="mb-4"><SearchBox onDone={() => setOpen(false)} /></div>
            <NavList onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <div className="mx-auto flex max-w-[1400px] gap-8 px-4">
        <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-60 shrink-0 overflow-y-auto py-6 lg:block">
          <NavList />
        </aside>
        <main id="hovedinnhold" className="min-w-0 flex-1 py-6 pb-16">
          <Breadcrumbs />
          {children}
        </main>
      </div>

      <footer className="border-t border-line bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-6 text-sm text-muted">
          <p>
            Uavhengig opplæringsressurs for {TRACTOR.model}, basert på John Deere-operatørmanual {TRACTOR.manual}. Ikke tilknyttet eller godkjent av Deere &amp; Company.
            Guiden erstatter ikke den offisielle manualen, obligatorisk opplæring eller fagkyndig service.
          </p>
          <p className="mt-1">
            <Link to="/kilder" className="text-jd-700 hover:underline">Kilder, verifiseringsstatus og begrensninger</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
