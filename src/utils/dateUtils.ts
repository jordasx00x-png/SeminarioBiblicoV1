export function safeFormatDate(val?: any, fallback = ''): string {
  if (!val) return fallback;
  try {
    const num = Number(val);
    const d = !isNaN(num) ? new Date(num) : new Date(val);
    if (isNaN(d.getTime())) return fallback;
    return d.toLocaleDateString('es-ES');
  } catch (e) {
    return fallback;
  }
}

export function safeFormatTime(val?: any, fallback = ''): string {
  if (!val) return fallback;
  try {
    const num = Number(val);
    const d = !isNaN(num) ? new Date(num) : new Date(val);
    if (isNaN(d.getTime())) return fallback;
    return d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  } catch (e) {
    return fallback;
  }
}

export function safeFormatNow(): string {
  const d = new Date();
  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}:${minutes} ${ampm}`;
}
