const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const inProductionMode = import.meta.env.PROD;

export default function useApi(url) {
  if (!inProductionMode) {
    return url;
  }

  const hasBaseUrl = url.startsWith("http");
  if (hasBaseUrl) {
    url = new URL(url).pathname;
  }

  return apiBaseUrl + url;
}
