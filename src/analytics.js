import * as amplitude from '@amplitude/analytics-browser';

/**
 * Initialize Amplitude analytics with the provided API key
 * @param {string} apiKey - Amplitude API key from environment variable
 */
export function initAnalytics(apiKey) {
  if (!apiKey) {
    console.warn('Amplitude API key not provided. Analytics disabled.');
    return;
  }

  amplitude.init(apiKey, undefined, {
    defaultTracking: false, // Disable automatic page view tracking for SPA
  });

  console.log('Amplitude analytics initialized');
}

/**
 * Track an event with optional properties
 * @param {string} eventName - Name of the event to track
 * @param {Object} [properties] - Optional event properties
 *
 * Core Events:
 * - Color Scale Added
 * - Color Scale Removed
 * - Color Scale Updated
 * - Color Scales Reordered
 * - Exported to Figma
 * - Share URL Generated
 * - Figma Tokens Imported
 * - Harmonious Colors Generated
 * - Theme Changed
 * - View Mode Changed
 */
export function trackEvent(eventName, properties = {}) {
  try {
    amplitude.track(eventName, properties);
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
}

/**
 * Set user properties for tracking
 * @param {Object} properties - User properties to set
 */
export function setUserProperties(properties) {
  try {
    const identifyEvent = new amplitude.Identify();
    Object.entries(properties).forEach(([key, value]) => {
      identifyEvent.set(key, value);
    });
    amplitude.identify(identifyEvent);
  } catch (error) {
    console.error('Analytics user properties error:', error);
  }
}
