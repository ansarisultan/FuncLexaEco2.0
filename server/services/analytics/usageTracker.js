import UsageLog from '../../models/UsageLog.js';
import { io } from '../../server.js';
import { logError } from '../../utils/logger.js';

const toObjectIdOrNull = (value) => {
  if (!value) return null;
  const normalized = String(value).trim();
  return /^[0-9a-fA-F]{24}$/.test(normalized) ? normalized : null;
};

const getUsageRoom = (userId) => (userId ? `usage:user:${userId}` : 'usage:guest');

const getStartOfToday = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

const getLastNDays = (days = 7) => {
  const today = new Date();
  const dates = [];
  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(d);
  }
  return dates;
};

export const trackUsage = async ({ userId = null, product = 'core', action = 'unknown' }) => {
  try {
    const activeUserId = toObjectIdOrNull(userId);

    const newLog = new UsageLog({
      userId: activeUserId,
      productSlug: product,
      action: action,
    });

    await newLog.save();

    const payload = {
      id: newLog._id,
      userId: newLog.userId,
      product: newLog.productSlug,
      action: newLog.action,
      timestamp: newLog.timestamp,
    };

    if (io) {
      io.to(getUsageRoom(activeUserId)).emit('new_usage_event', payload);
    }

    return payload;
  } catch (err) {
    logError('Failed to track usage in MongoDB:', err);
    return {
      id: `fallback-${Date.now()}`,
      userId: toObjectIdOrNull(userId),
      product,
      action,
      timestamp: new Date()
    };
  }
};

export const getRecentUsage = async ({ userId = null, limit = 10 } = {}) => {
  try {
    const activeUserId = toObjectIdOrNull(userId);
    const query = activeUserId ? { userId: activeUserId } : { userId: null };

    const logs = await UsageLog.find()
      .find(query)
      .sort({ timestamp: -1 })
      .limit(limit)
      .lean();
    
    return logs.map(l => ({
      id: l._id,
      product: l.productSlug,
      action: l.action,
      timestamp: l.timestamp,
    }));
  } catch (err) {
    logError('Failed to get recent usage:', err);
    return [];
  }
};

export const getUsageSummary = async ({ userId = null } = {}) => {
  try {
    const activeUserId = toObjectIdOrNull(userId);
    const query = activeUserId ? { userId: activeUserId } : { userId: null };

    const [totalActions, activeAppsKeys, todayActions, productAgg, recentLogs] = await Promise.all([
      UsageLog.countDocuments(query),
      UsageLog.distinct('productSlug', query),
      UsageLog.countDocuments({
        ...query,
        timestamp: { $gte: getStartOfToday() }
      }),
      UsageLog.aggregate([
        { $match: query },
        { $group: { _id: '$productSlug', value: { $sum: 1 } } },
        { $sort: { value: -1 } },
        { $limit: 6 }
      ]),
      UsageLog.find(query).sort({ timestamp: -1 }).limit(500).lean()
    ]);

    const dayBuckets = getLastNDays(7).map((date) => {
      const key = date.toISOString().slice(0, 10);
      return {
        key,
        name: date.toLocaleDateString('en-US', { weekday: 'short' }),
        calls: 0
      };
    });

    const dayMap = new Map(dayBuckets.map((d) => [d.key, d]));
    for (const log of recentLogs) {
      const key = new Date(log.timestamp).toISOString().slice(0, 10);
      const bucket = dayMap.get(key);
      if (bucket) bucket.calls += 1;
    }

    const productBreakdown = productAgg.map((row) => ({
      name: row._id || 'unknown',
      value: row.value
    }));

    return {
      totalActions,
      activeApps: activeAppsKeys.length,
      todayActions,
      productBreakdown,
      dailySeries: dayBuckets
    };
  } catch (err) {
    logError('Failed to get usage summary:', err);
    return {
      totalActions: 0,
      activeApps: 0,
      todayActions: 0,
      productBreakdown: [],
      dailySeries: []
    };
  }
};

