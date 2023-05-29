export const formatSuccessResponse = (value) => {
  return {
    ok: true,
    data: value
  };
};

export const formatFailResponse = (error, fallbackMessage) => {
  const message = fallbackMessage ?? 'No failure reason supplied';

  return {
    ok: false,
    data: {
      reason: error?.message || message
    }
  };
}
