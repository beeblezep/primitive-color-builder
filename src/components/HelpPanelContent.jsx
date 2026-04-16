import { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { helpSections } from '../howToUseContent';

/**
 * HelpPanelContent Component
 *
 * Displays help content in a split-screen panel with:
 * - Table of contents sidebar for quick navigation
 * - All content expanded (no accordion)
 * - Position toggle button (bottom ↔ side)
 * - Close button
 *
 * @param {Object} props
 * @param {string} props.theme - 'light' or 'dark'
 * @param {string} props.position - 'bottom' or 'side'
 * @param {function} props.onTogglePosition - Callback to toggle panel position
 * @param {function} props.onClose - Callback to close panel
 */
export function HelpPanelContent({ theme, position, onTogglePosition, onClose }) {
  const contentRef = useRef(null);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element && contentRef.current) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`help-panel-split flex h-full ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Header bar with controls */}
      <div className="help-panel-header">
        <h1 className={`text-2xl font-bold font-fraunces ${
          theme === 'light' ? 'text-neutral-1100' : 'text-warm-gray-200'
        }`}>
          How to use
        </h1>
        <div className="flex items-center gap-2">
          {/* Position toggle button */}
          <button
            onClick={() => {
              onTogglePosition();
              if (window.trackEvent) {
                window.trackEvent('Help Panel Position Changed', {
                  from: position,
                  to: position === 'bottom' ? 'side' : 'bottom'
                });
              }
            }}
            className={`cardboard-icon-button w-9 h-9 rounded-md flex items-center justify-center ${
              theme === 'light'
                ? 'bg-gray-100 text-neutral-900 border border-gray-300'
                : 'bg-gray-1300 text-gray-400 border border-gray-1100'
            }`}
            aria-label={position === 'bottom' ? 'Move to side' : 'Move to bottom'}
            title={position === 'bottom' ? 'Move to side' : 'Move to bottom'}
          >
            <span className="material-symbols-rounded" style={{ fontSize: '18px' }}>
              {position === 'bottom' ? 'chevron_right' : 'expand_more'}
            </span>
          </button>
          {/* Close button */}
          <button
            onClick={onClose}
            className={`cardboard-icon-button w-9 h-9 rounded-md flex items-center justify-center ${
              theme === 'light'
                ? 'bg-gray-100 text-neutral-900 border border-gray-300'
                : 'bg-gray-1300 text-gray-400 border border-gray-1100'
            }`}
            aria-label="Close help panel"
          >
            <span className="material-symbols-rounded" style={{ fontSize: '18px' }}>
              close
            </span>
          </button>
        </div>
      </div>

      {/* Two-column layout: TOC + Content */}
      <div className="help-panel-body flex">
        {/* Table of contents - sticky left sidebar */}
        <nav className={`help-panel-toc ${
          theme === 'light' ? 'border-neutral-300' : 'border-gray-700'
        }`}>
          {helpSections.map(section => (
            <div key={section.id} className="mb-3">
              <button
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left font-semibold mb-0.5 ${
                  theme === 'light' ? 'text-neutral-900' : 'text-gray-300'
                }`}
              >
                {section.title}
              </button>
              <ul className="ml-1.5">
                {section.items.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left text-sm ${
                        theme === 'light' ? 'text-neutral-700' : 'text-gray-400'
                      }`}
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Main content - all sections expanded */}
        <div ref={contentRef} className="help-panel-content flex-1 overflow-auto">
          {helpSections.map(section => (
            <section key={section.id} id={section.id}>
              <h2 className={`font-fraunces ${
                theme === 'light' ? 'text-neutral-1100' : 'text-warm-gray-200'
              }`}>
                {section.title}
              </h2>
              {section.items.map(item => (
                <article key={item.id} id={item.id} className="mb-6">
                  <h3 className={`font-semibold ${
                    theme === 'light' ? 'text-neutral-1100' : 'text-warm-gray-200'
                  }`}>
                    {item.title}
                  </h3>
                  <div className={`whitespace-pre-line leading-relaxed ${
                    theme === 'light' ? 'text-neutral-900' : 'text-gray-400'
                  }`}>
                    <ReactMarkdown>{item.content}</ReactMarkdown>
                  </div>
                </article>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
