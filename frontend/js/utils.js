// Tiny helpers
export const qs = (sel, root=document) => root.querySelector(sel);
export const qsa = (sel, root=document) => Array.from(root.querySelectorAll(sel));
export const uid = () => crypto.randomUUID ? crypto.randomUUID() : (Date.now() + Math.random().toString(16).slice(2));
export const formatDate = (iso) => {
  if(!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString();
};
export const initials = (name='?') => name.trim().split(/\s+/).map(x=>x[0]).join('').slice(0,2).toUpperCase();
