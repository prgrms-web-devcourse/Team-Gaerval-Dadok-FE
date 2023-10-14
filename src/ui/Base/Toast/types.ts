export type ToastType = 'normal' | 'success' | 'error';

export type ToastOption = {
  type?: ToastType;
  message: string;
};

export type ToastController = {
  show: (option: ToastOption) => void;
};
