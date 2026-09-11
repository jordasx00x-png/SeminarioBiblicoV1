export function formatMD(text: string) {
  let html = text;
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-stone-900">$1</strong>');
  // Italics
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  // Paragraphs
  html = html.replace(/\n\n/g, '</p><p class="mt-6 mb-2">');
  return `<p class="mt-4 first:mt-0 leading-loose">${html}</p>`;
}
