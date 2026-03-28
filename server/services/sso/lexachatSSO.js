export const verifyLexaChatToken = async (token) => {
  if (!token) return null;
  return { provider: 'lexachat', externalId: `lexa-${token.slice(0, 8)}` };
};
