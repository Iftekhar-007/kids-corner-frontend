export type ProductType = "EDUCATIONAL" | "TOY";

export type LearningLevel =
  | "PRE_SCHOOL"
  | "BEGINNER"
  | "INTERMEDIATE"
  | "ADVANCED"
  | "ALL_LEVELS";

export interface IProductImage {
  publicId: string;
  secureUrl: string;
  isPrimary?: boolean;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  type: ProductType;
  description: string;
  price: number;
  discountPrice?: number;
  images: IProductImage[];
  category: string;
  recommendedAge: string;
  stock: number;
  isAvailable: boolean;
  isFeatured: boolean;
  learningLevel?: LearningLevel;
  brand?: string;
  createdAt: string;
  updatedAt: string;
}

export type PublicationStatus = "DRAFT" | "PUBLISHED";

export interface IStoryImage {
  publicId: string;
  secureUrl: string;
  caption?: string;
  order?: number;
}

export interface Story {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullContent: string;
  coverImage: {
    publicId: string;
    secureUrl: string;
  };
  comicIllustrations: IStoryImage[];
  category: string;
  recommendedAge: string;
  author: string;
  publicationStatus: PublicationStatus;
  isFeatured: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type PaymentStatus = "UNPAID" | "PAID" | "REFUNDED";

export interface ICustomerInfo {
  fullName: string;
  phoneNumber: string;
  email: string;
  shippingAddress: string;
  city: string;
}

export interface IOrderItem {
  product: string;
  name: string;
  slug: string;
  image?: string;
  unitPrice: number;
  originalPrice: number;
  quantity: number;
  subtotal: number;
}

export interface IOrderStatusHistory {
  status: OrderStatus;
  changedAt: string;
  changedBy: string;
  note?: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  customer: ICustomerInfo;
  items: IOrderItem[];
  subtotal: number;
  discountTotal: number;
  deliveryCharge: number;
  totalAmount: number;
  paymentMethod: "COD";
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  statusHistory: IOrderStatusHistory[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IStoreInfo {
  name: string;
  website: string;
  email: string;
  phone: string;
  address: string;
}

export interface Invoice {
  _id: string;
  invoiceNumber: string;
  order: string;
  orderNumber: string;
  storeInfo: IStoreInfo;
  customer: ICustomerInfo;
  items: Array<{
    product: string;
    name: string;
    quantity: number;
    unitPrice: number;
    originalPrice: number;
    discount: number;
    subtotal: number;
  }>;
  subtotal: number;
  discountTotal: number;
  deliveryCharge: number;
  totalAmount: number;
  paymentMethod: "COD";
  paymentStatus: PaymentStatus;
  orderDate: string;
  invoiceDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  products: {
    total: number;
    educationalCount: number;
    toysCount: number;
    lowStockCount: number;
  };
  stories: {
    total: number;
    publishedCount: number;
    draftCount: number;
  };
  orders: {
    total: number;
    pending: number;
    confirmed: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
  };
  finance: {
    revenue: number;
    paidOrdersCount: number;
    unpaidOrdersCount: number;
    refundedOrdersCount: number;
    unpaidAmount: number;
  };
  recentOrders: Array<{
    id: string;
    orderNumber: string;
    customerName: string;
    totalAmount: number;
    orderStatus: OrderStatus;
    paymentStatus: PaymentStatus;
    createdAt: string;
  }>;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    pagination?: PaginationMeta;
  };
  errors?: Record<string, unknown> | null;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
