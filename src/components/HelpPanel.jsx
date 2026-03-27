import { motion, AnimatePresence } from 'framer-motion';
import { Button, Theme } from '@radix-ui/themes';
import * as Accordion from '@radix-ui/react-accordion';
import { useEffect, useRef } from 'react';
import { helpSections } from '../howToUseContent';
import { motion as motionDuration, ease } from '../motionTokens';

export function HelpPanel({ isOpen, onClose, theme }) {
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);
  const openTimeRef = useRef(null);

  // Track open time for analytics
  useEffect(() => {
    if (isOpen) {
      openTimeRef.current = Date.now();
    } else if (openTimeRef.current) {
      const dwellTime = Math.round((Date.now() - openTimeRef.current) / 1000);
      if (window.trackEvent) {
        window.trackEvent('Help Panel Closed', { dwell_time_seconds: dwellTime });
      }
      openTimeRef.current = null;
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when panel is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (isOpen && panelRef.current) {
      const focusableElements = panelRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTabKey = (e) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);

      // Focus the close button when panel opens
      setTimeout(() => closeButtonRef.current?.focus(), 100);

      return () => {
        document.removeEventListener('keydown', handleTabKey);
      };
    }
  }, [isOpen]);

  const handleSectionExpand = (sectionId) => {
    if (window.trackEvent) {
      window.trackEvent('Help Section Expanded', { section: sectionId });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="help-panel-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: motionDuration.exit / 1000 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            className="help-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="help-panel-title"
            initial={{
              x: '100%',
              y: 0,
              opacity: 0
            }}
            animate={{
              x: 0,
              y: 0,
              opacity: 1,
              transition: {
                duration: motionDuration.lg / 1000,
                ease: [0.4, 0, 0.2, 1]
              }
            }}
            exit={{
              x: '100%',
              y: 0,
              opacity: 0,
              transition: {
                duration: motionDuration.exit / 1000
              }
            }}
          >
            {/* Header */}
            <div className="help-panel-header">
              <h1
                id="help-panel-title"
                className={`text-4xl font-bold font-fraunces ${
                  theme === 'light' ? 'text-neutral-1100' : 'text-warm-gray-200'
                }`}
              >
                How to use
              </h1>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className={`help-panel-close-button ${
                  theme === 'light'
                    ? 'text-neutral-900 hover:text-neutral-1100'
                    : 'text-gray-400 hover:text-warm-gray-200'
                }`}
                aria-label="Close help panel"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="help-panel-content">
              <Accordion.Root
                type="multiple"
                className="help-panel-accordion"
                onValueChange={(values) => {
                  // Track the most recently expanded section
                  if (values.length > 0) {
                    handleSectionExpand(values[values.length - 1]);
                  }
                }}
              >
                {helpSections.map((section) => (
                  <Accordion.Item
                    key={section.id}
                    value={section.id}
                    className="help-panel-accordion-item"
                  >
                    <Accordion.Header>
                      <Accordion.Trigger className="help-panel-accordion-trigger">
                        <span className={`text-xl font-bold font-fraunces ${
                          theme === 'light' ? 'text-neutral-1100' : 'text-warm-gray-200'
                        }`}>
                          {section.title}
                        </span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="help-panel-accordion-chevron"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="help-panel-accordion-content">
                      <div className="help-panel-accordion-content-inner">
                        {section.items.map((item, index) => (
                          <div key={item.id} className="help-panel-item">
                            <h3 className={`text-base font-semibold mb-2 ${
                              theme === 'light' ? 'text-neutral-1100' : 'text-warm-gray-200'
                            }`}>
                              {item.title}
                            </h3>
                            <p className={`text-sm leading-relaxed whitespace-pre-line ${
                              theme === 'light' ? 'text-neutral-900' : 'text-gray-400'
                            }`}>
                              {item.content}
                            </p>
                            {index < section.items.length - 1 && (
                              <div className={`help-panel-divider ${
                                theme === 'light' ? 'bg-neutral-300' : 'bg-gray-800'
                              }`} />
                            )}
                          </div>
                        ))}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>

            {/* Footer */}
            <div className="help-panel-footer">
              <Theme accentColor="gray" radius="small">
                <Button
                  onClick={onClose}
                  size="3"
                  variant="solid"
                  className="w-full"
                >
                  Back to editor
                </Button>
              </Theme>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
