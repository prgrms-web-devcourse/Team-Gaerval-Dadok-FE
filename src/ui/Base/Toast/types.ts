export type ToastType = 'normal' | 'success' | 'error';

export type ToastOption = {
  type?: ToastType;
  message: string;
  duration?: number;
};

export type ToastController = {
  show: (option: ToastOption) => void;
};
