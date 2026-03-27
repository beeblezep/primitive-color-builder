import { useState } from 'react';

/**
 * ResizeDivider Component
 *
 * A draggable divider for resizing split panels.
 * Adapts the handleNumberDragStart pattern from ColorScaleEditor.jsx
 *
 * @param {Object} props
 * @param {string} props.position - 'bottom' or 'side'
 * @param {number} props.currentSize - Current panel size in pixels
 * @param {function} props.onResize - Callback with new size
 */
export function ResizeDivider({ position, currentSize, onResize }) {
  const [isResizing, setIsResizing] = useState(false);

  const handleResizeStart = (e) => {
    e.preventDefault();
    setIsResizing(true);

    const startPos = position === 'bottom' ? e.clientY : e.clientX;
    const startSize = currentSize;

    const handleMouseMove = (moveEvent) => {
      // Calculate delta based on position
      const delta = position === 'bottom'
        ? startPos - moveEvent.clientY  // Inverted for bottom panel (drag up increases size)
        : startPos - moveEvent.clientX; // Inverted for side panel (drag left increases size)

      // Apply constraints based on position
      const minSize = position === 'bottom' ? 200 : 320;
      const maxSize = position === 'bottom' ? 600 : 800;

      const newSize = Math.min(
        maxSize,
        Math.max(minSize, startSize + delta)
      );

      onResize(newSize);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = position === 'bottom' ? 'ns-resize' : 'ew-resize';
  };

  return (
    <div
      className={`resize-divider ${position === 'bottom' ? 'horizontal' : 'vertical'} ${isResizing ? 'active' : ''}`}
      onMouseDown={handleResizeStart}
      role="separator"
      aria-label={`Resize ${position} panel`}
      aria-orientation={position === 'bottom' ? 'horizontal' : 'vertical'}
    />
  );
}
