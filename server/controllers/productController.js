import { proxyApps } from '../proxy/proxyRegistry.js';

export const listProducts = async (req, res) => {
  const products = proxyApps.map((app) => ({
    slug: app.slug,
    path: app.path,
    target: app.target,
    status: 'active',
  }));

  res.json({ success: true, data: products });
};
