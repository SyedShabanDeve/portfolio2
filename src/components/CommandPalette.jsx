import { useEffect, useMemo, useRef, useState } from "react";
import { NAV, PROFILE, PROJECTS } from "../data/site";
import { useLockScroll } from "../hooks/useLockScroll";
import { resumeUrl } from "../lib/media";
import { IS_MAC } from "../lib/motion";
import { copyText } from "../lib/toast";
import Icon from "./ui/Icon";

const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const openLink = (href) => {
  if (href.startsWith("mailto:")) window.location.href = href;
  else window.open(href, "_blank", "noopener,noreferrer");
};

const downloadCv = () => {
  const link = document.createElement("a");
  link.href = resumeUrl(PROFILE.resume);
  link.download = PROFILE.resume;
  document.body.append(link);
  link.click();
  link.remove();
};

function buildCommands({ onOpenProject, onToggleTheme }) {
  return [
    ...NAV.map((item) => ({
      id: `go-${item.id}`,
      group: "Jump to",
      label: item.label,
      icon: "hash",
      run: () => scrollToSection(item.id),
    })),
    ...PROJECTS.map((project) => ({
      id: `project-${project.id}`,
      group: "Case studies",
      label: project.name,
      hint: project.kind,
      icon: "layers",
      keywords: project.tags.join(" "),
      run: () => onOpenProject(project.id),
    })),
    {
      id: "copy-email",
      group: "Actions",
      label: "Copy email address",
      hint: PROFILE.email,
      icon: "copy",
      run: () => copyText(PROFILE.email, "Email address"),
    },
    { id: "cv", group: "Actions", label: "Download CV", hint: "PDF", icon: "download", run: downloadCv },
    {
      id: "theme",
      group: "Actions",
      label: "Switch light / dark theme",
      icon: "sun",
      keywords: "mode colour color",
      run: () => onToggleTheme(),
    },
    {
      id: "whatsapp",
      group: "Contact",
      label: "Message on WhatsApp",
      hint: PROFILE.phone,
      icon: "whatsapp",
      run: () => openLink(PROFILE.whatsapp),
    },
    {
      id: "email",
      group: "Contact",
      label: "Write an email",
      hint: PROFILE.email,
      icon: "mail",
      run: () => openLink(`mailto:${PROFILE.email}`),
    },
    {
      id: "github",
      group: "Contact",
      label: "Open GitHub",
      hint: `@${PROFILE.githubHandle}`,
      icon: "github",
      run: () => openLink(PROFILE.github),
    },
    {
      id: "linkedin",
      group: "Contact",
      label: "Open LinkedIn",
      hint: PROFILE.linkedinHandle,
      icon: "linkedin",
      run: () => openLink(PROFILE.linkedin),
    },
  ];
}

/** Every word typed must appear somewhere in the command's text. */
const matches = (command, query) => {
  const haystack = `${command.label} ${command.hint ?? ""} ${command.group} ${command.keywords ?? ""}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
};

/**
 * ⌘K / Ctrl+K palette: jump to a section, open a case study, copy the email,
 * grab the CV. A native <dialog> handles focus and Escape; the input drives a
 * listbox through aria-activedescendant.
 */
export default function CommandPalette({ open, onClose, onOpenProject, onToggleTheme }) {
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  useLockScroll(open, "palette");

  const commands = useMemo(
    () => buildCommands({ onOpenProject, onToggleTheme }),
    [onOpenProject, onToggleTheme]
  );
  const results = useMemo(() => commands.filter((command) => matches(command, query)), [commands, query]);
  const current = Math.min(active, Math.max(results.length - 1, 0));

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      inputRef.current?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    const onNativeClose = () => {
      setQuery("");
      setActive(0);
      onClose();
    };
    dialog.addEventListener("close", onNativeClose);
    return () => dialog.removeEventListener("close", onNativeClose);
  }, [onClose]);

  // Keep the highlighted row in view while arrowing through a long list.
  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${current}"]`)?.scrollIntoView({ block: "nearest" });
  }, [current]);

  const run = (command) => {
    dialogRef.current?.close();
    // Let the dialog close (and the page unlock) before acting on the page.
    window.requestAnimationFrame(() => command.run());
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current + 1) % Math.max(results.length, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current - 1 + results.length) % Math.max(results.length, 1));
    } else if (event.key === "Enter" && results[current]) {
      event.preventDefault();
      run(results[current]);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="palette"
      aria-label="Command palette"
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
    >
      <div className="palette__panel">
        <div className="palette__search">
          <Icon name="search" size={18} />
          <input
            ref={inputRef}
            className="palette__input"
            type="text"
            value={query}
            placeholder="Search sections, case studies, actions…"
            autoComplete="off"
            spellCheck="false"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[current] ? `cmd-${results[current].id}` : undefined}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
          />
          <kbd className="kbd">Esc</kbd>
        </div>

        <ul className="palette__list" id="palette-list" role="listbox" ref={listRef} aria-label="Commands">
          {results.map((command, i) => {
            const heading = i === 0 || results[i - 1].group !== command.group ? command.group : null;
            return (
              <li key={command.id} role="presentation">
                {heading && (
                  <p className="palette__group" aria-hidden="true">
                    {heading}
                  </p>
                )}
                <div
                  id={`cmd-${command.id}`}
                  role="option"
                  aria-selected={i === current}
                  data-index={i}
                  className={`palette__item${i === current ? " is-active" : ""}`}
                  onPointerMove={() => i !== current && setActive(i)}
                  onClick={() => run(command)}
                >
                  <span className="palette__icon">
                    <Icon name={command.icon} size={15} />
                  </span>
                  <span className="palette__label">{command.label}</span>
                  {command.hint && <span className="palette__hint">{command.hint}</span>}
                  <Icon name="enter" size={14} className="palette__enter" />
                </div>
              </li>
            );
          })}
          {results.length === 0 && <li className="palette__empty">Nothing matches “{query}”.</li>}
        </ul>

        <div className="palette__foot" aria-hidden="true">
          <span>
            <kbd className="kbd">↑</kbd>
            <kbd className="kbd">↓</kbd> to move
          </span>
          <span>
            <kbd className="kbd">↵</kbd> to select
          </span>
          <span className="palette__brand">
            <kbd className="kbd">{IS_MAC ? "⌘" : "Ctrl"}</kbd>
            <kbd className="kbd">K</kbd> anywhere
          </span>
        </div>
      </div>
    </dialog>
  );
}
