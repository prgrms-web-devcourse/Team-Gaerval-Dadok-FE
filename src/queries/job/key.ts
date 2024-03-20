const jobKeys = {
  all: ['job'] as const,
  category: () => [...jobKeys.all, 'category'] as const,
};

export default jobKeys;
