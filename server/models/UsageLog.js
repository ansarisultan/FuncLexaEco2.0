import mongoose from 'mongoose';

const usageLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      index: true,
    },
    productSlug: {
      type: String,
      ref: 'Product', // optional, for population
      required: [true, 'Product slug is required'],
      index: true,
    },
    action: {
      type: String,
      required: [true, 'Action is required'],
      trim: true,
      maxlength: [100, 'Action cannot exceed 100 characters'],
    },
    timestamp: {
      type: Date,
      default: Date.now,
      required: true,
      index: true,
    },
  },
  {
    // No automatic timestamps because we use custom timestamp field
    timestamps: false,
  }
);

// Compound indexes for common analytics queries
usageLogSchema.index({ userId: 1, timestamp: -1 }); // get user's recent activity
usageLogSchema.index({ productSlug: 1, timestamp: -1 }); // get product usage over time
usageLogSchema.index({ action: 1, timestamp: -1 }); // filter by action type

const UsageLog = mongoose.model('UsageLog', usageLogSchema);

export default UsageLog;
