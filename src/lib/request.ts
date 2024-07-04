export const getOrigin = (request: Request) => {
  const { host } = new URL(request.url);
  const protocol = request.headers.get('x-forwarded-proto') ?? 'http';
  return `${protocol}://${host}`;
};
