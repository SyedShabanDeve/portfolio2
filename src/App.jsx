import { useCallback, useEffect, useState } from "react";
import About from "./components/About";
import BackToTop from "./components/BackToTop";
import CommandPalette from "./components/CommandPalette";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Navbar from "./components/Navbar";
import ProjectDialog from "./components/ProjectDialog";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Skills from "./components/Skills";
import Toast from "./components/ui/Toast";
import { NAV } from "./data/site";
import { useActiveSection } from "./hooks/useActiveSection";
import { useProjectHash } from "./hooks/useProjectHash";
import { useScrollState } from "./hooks/useScrollState";
import { useSpotlight } from "./hooks/useSpotlight";
import { useTheme } from "./hooks/useTheme";

/* Module scope keeps the reference stable across renders. */
const SECTION_IDS = ["home", ...NAV.map((item) => item.id)];

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [projectId, openProject] = useProjectHash();
  const { progress, stuck, past } = useScrollState();
  const active = useActiveSection(SECTION_IDS);
  useSpotlight();

  const openPalette = useCallback(() => {
    setMenuOpen(false);
    setPaletteOpen(true);
  }, []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  // ⌘K / Ctrl+K toggles the palette from anywhere; "/" opens it when not typing.
  useEffect(() => {
    const onKey = (event) => {
      const typing = event.target.closest?.("input, textarea, select, [contenteditable='true']");
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      } else if (event.key === "/" && !typing && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="grain">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <span className="progress" style={{ "--progress": progress }} aria-hidden="true" />

      <Navbar
        active={active}
        stuck={stuck}
        theme={theme}
        onToggleTheme={toggleTheme}
        open={menuOpen}
        onOpenChange={setMenuOpen}
        onOpenPalette={openPalette}
      />

      <main id="main">
        <Hero theme={theme} onOpenProject={openProject} />
        <Marquee />
        <Projects onOpenProject={openProject} />
        <About />
        <Skills />
        <Experience />
        <Services />
        <Contact />
      </main>

      <Footer onOpenPalette={openPalette} />
      <BackToTop shown={past} progress={progress} />

      <ProjectDialog projectId={projectId} onOpenProject={openProject} />
      <CommandPalette
        open={paletteOpen}
        onClose={closePalette}
        onOpenProject={openProject}
        onToggleTheme={toggleTheme}
      />
      <Toast />
    </div>
  );
}
