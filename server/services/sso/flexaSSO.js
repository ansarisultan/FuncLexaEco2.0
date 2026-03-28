export const verifyFlexaToken = async (token) => {
  if (!token) return null;
  return { provider: 'flexa', externalId: `flexa-${token.slice(0, 8)}` };
};
