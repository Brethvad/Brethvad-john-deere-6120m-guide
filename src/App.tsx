import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "@/components/Layout";
import { HomePage } from "@/pages/HomePage";
import { ModelPage } from "@/pages/ModelPage";
import {
  CabPage, ContentPage, GlossaryPage, MaintenancePage, NotFound, SearchPage, SourcesPage, SpecsPage, TroubleshootingPage,
} from "@/pages/pages";

const CONTENT = ["betjening", "girkasse", "hydraulikk", "fjaering", "lys", "redskap", "veitransport", "daglig-kontroll", "manedlig-kontroll", "sikkerhet"];

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/3d" element={<ModelPage />} />
          <Route path="/forerhus" element={<CabPage />} />
          {CONTENT.map((slug) => (
            <Route key={slug} path={`/${slug}`} element={<ContentPage slug={slug} />} />
          ))}
          <Route path="/vedlikehold" element={<MaintenancePage />} />
          <Route path="/feilsoking" element={<TroubleshootingPage />} />
          <Route path="/spesifikasjoner" element={<SpecsPage />} />
          <Route path="/ordliste" element={<GlossaryPage />} />
          <Route path="/kilder" element={<SourcesPage />} />
          <Route path="/sok" element={<SearchPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
