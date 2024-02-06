import Cookies from 'js-cookie';

export const reloadToast = (message: string, state: 'error' | 'success') => {
  const toast = {
    toast: message,
    date: new Date().toISOString(),
    state,
  };

  Cookies.set('toast', JSON.stringify(toast));
};
