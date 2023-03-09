import { publicApi } from '@/apis/core/axios';

export const getBookColor = async (
  imageUrl: string,
  setter: (hex: string) => void
) => {
  const colors = await publicApi('/api/getBookColor/', {
    params: {
      url: imageUrl,
    },
  });

  setter(colors.data.colors[0]);
};
