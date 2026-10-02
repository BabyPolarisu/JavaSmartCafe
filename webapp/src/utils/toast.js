export function showToast(message, type = 'success') {
  const existing = document.getElementById('global-toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'global-toast-notification';
  toast.style.position = 'fixed';
  toast.style.bottom = '2rem';
  toast.style.right = '2rem';
  toast.style.background = type === 'info' 
    ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' 
    : 'linear-gradient(135deg, #10b981, #059669)';
  toast.style.color = '#fff';
  toast.style.padding = '0.9rem 1.5rem';
  toast.style.borderRadius = '12px';
  toast.style.fontWeight = '600';
  toast.style.fontSize = '0.95rem';
  toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
  toast.style.zIndex = '99999';
  toast.style.transition = 'all 0.3s ease';
  toast.textContent = message;

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
