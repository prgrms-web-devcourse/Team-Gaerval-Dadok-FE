import { useToast } from '@/hooks/toast';
import { SERVICE_ERROR_MESSAGE } from '@/constants';
import { isAxiosErrorWithCustomCode } from '@/utils/helpers';
import type { ServiceErrorCode } from '@/types/error';

const useAxiosError = () => {
  const { showToast } = useToast();

  const handleAxiosError = (
    error: unknown,
    onExpectedAxiosError?: (message: string, code: ServiceErrorCode) => void,
    onUnexpectedError?: () => void
  ) => {
    if (!isAxiosErrorWithCustomCode(error)) {
      showToast({ message: '잠시 후 다시 시도해 주세요.' });
      onUnexpectedError && onUnexpectedError();
      return;
    }

    const { code } = error.response.data;
    const message = SERVICE_ERROR_MESSAGE[code];

    showToast({ message });
    onExpectedAxiosError && onExpectedAxiosError(message, code);
  };

  return { handleAxiosError };
};

export default useAxiosError;
