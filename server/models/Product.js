import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'],
    },
    status: {
      type: String,
      enum: {
        values: ['active', 'inactive'],
        message: '{VALUE} is not a valid status',
      },
      default: 'active',
      required: true,
    },
    proxyPath: {
      type: String,
      required: [true, 'Proxy path is required'],
      trim: true,
      match: [/^\/[a-zA-Z0-9/_-]*$/, 'Proxy path must start with a slash and contain only valid characters'],
    },
    targetUrl: {
      type: String,
      required: [true, 'Target URL is required'],
      trim: true,
      match: [
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
        'Please provide a valid URL',
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
productSchema.index({ slug: 1 }, { unique: true });
productSchema.index({ status: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;