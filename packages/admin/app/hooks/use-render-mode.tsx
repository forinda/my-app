export default function useRenderMode() {
  if (typeof window === 'undefined') {
    return 'ssr';
  }
  return 'spa';
}
