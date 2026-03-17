import React from 'react';
import ReactDOM from 'react-dom/client';
import ColorScaleEditor from './ColorScaleEditor.jsx';
import './index.css';
import '@radix-ui/themes/styles.css';
import { initAnalytics } from './analytics.js';

// Initialize Amplitude analytics
const amplitudeApiKey = import.meta.env.VITE_AMPLITUDE_API_KEY;
initAnalytics(amplitudeApiKey);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorScaleEditor />
  </React.StrictMode>
);
