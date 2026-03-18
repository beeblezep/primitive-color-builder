import * as amplitude from '@amplitude/analytics-browser';

/**
 * Generate or retrieve persistent user ID from localStorage
 * @returns {string} UUID v4 user ID
 */
function getUserId() {
  let userId = localStorage.getItem('analytics_user_id');
  if (!userId) {
    // Generate UUID v4
    userId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    localStorage.setItem('analytics_user_id', userId);
  }
  return userId;
}

/**
 * Initialize Amplitude analytics with the provided API key
 * @param {string} apiKey - Amplitude API key from environment variable
 */
export function initAnalytics(apiKey) {
  if (!apiKey) {
    console.warn('Amplitude API key not provided. Analytics disabled.');
    return;
  }

  const userId = getUserId(); // Get persistent user ID

  amplitude.init(apiKey, userId, {
    defaultTracking: false, // Disable automatic page view tracking for SPA
  });

  console.log('Amplitude analytics initialized with user ID:', userId);
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

/**
 * Track screen view events
 * @param {string} screenName - Name of the screen being viewed
 * @param {Object} [properties] - Optional additional properties
 */
export function trackScreenView(screenName, properties = {}) {
  trackEvent('Screen Viewed', {
    screen_name: screenName,
    ...properties
  });
}
