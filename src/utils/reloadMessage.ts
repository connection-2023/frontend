import Cookies from 'js-cookie';

export const reloadToast = (message: string) => {
  const toast = {
    toast: message,
    date: new Date().toISOString(),
  };

  Cookies.set('toast', JSON.stringify(toast));
};
