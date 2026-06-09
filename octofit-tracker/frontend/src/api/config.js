/**
 * API Configuration for OctoFit Tracker
 * Uses Vite environment variables for Codespaces and localhost support
 */

export const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  console.log('***** Detected Codespace Name:', codespaceName); // Debug log for
  
   

  if (codespaceName && codespaceName !== 'undefined') {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }
  
  // Fallback to localhost for local development
  return 'https://shiny-garbanzo-vpwq4r6gvgcp9r4-8000.app.github.dev/api';
};

export const makeApiRequest = async (endpoint) => {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch ${url}:`, error);
    throw error;
  }
};

export const getEndpointUrl = (endpoint) => {
  return `${getApiBaseUrl()}${endpoint}`;
};
