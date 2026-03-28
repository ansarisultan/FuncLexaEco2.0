export const cn = (...parts) => parts.filter(Boolean).join(' ');

export const formatDateTime = (value) => {
  try {
    return new Date(value).toLocaleString();
  } catch {
    return String(value ?? '');
  }
};
