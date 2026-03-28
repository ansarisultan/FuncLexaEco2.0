import { getRecentUsage, getUsageSummary, trackUsage } from '../services/analytics/usageTracker.js';

export const summary = async (req, res) => {
  const data = await getUsageSummary({ userId: req.user?.id || null });
  res.json({ success: true, data: { ...data, mode: req.appMode } });
};

export const recent = async (req, res) => {
  const items = await getRecentUsage({ userId: req.user?.id || null });
  res.json({ success: true, data: { items } });
};

export const logUsage = async (req, res) => {
  const item = await trackUsage({
    userId: req.user?.id || null,
    product: req.body.product || 'core',
    action: req.body.action || 'unknown',
  });

  res.status(201).json({ success: true, data: item });
};

