import { z } from "zod"
import { VALIDATION } from "./constants"

// Auth Schemas
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
})

export const registerSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(VALIDATION.PASSWORD_MIN_LENGTH, `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`)
      .max(VALIDATION.PASSWORD_MAX_LENGTH, `Password must be less than ${VALIDATION.PASSWORD_MAX_LENGTH} characters`),
    confirmPassword: z.string(),
    firstName: z
      .string()
      .min(VALIDATION.NAME_MIN_LENGTH, `First name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`)
      .max(VALIDATION.NAME_MAX_LENGTH, `First name must be less than ${VALIDATION.NAME_MAX_LENGTH} characters`),
    lastName: z
      .string()
      .min(VALIDATION.NAME_MIN_LENGTH, `Last name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`)
      .max(VALIDATION.NAME_MAX_LENGTH, `Last name must be less than ${VALIDATION.NAME_MAX_LENGTH} characters`),
    role: z.enum(["customer", "vendor"]).optional(),
    acceptTerms: z.boolean().refine((val) => val === true, "You must accept the terms and conditions"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Reset token is required"),
    password: z
      .string()
      .min(VALIDATION.PASSWORD_MIN_LENGTH, `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`)
      .max(VALIDATION.PASSWORD_MAX_LENGTH, `Password must be less than ${VALIDATION.PASSWORD_MAX_LENGTH} characters`),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

// Profile Schemas
export const profileSchema = z.object({
  firstName: z
    .string()
    .min(VALIDATION.NAME_MIN_LENGTH, `First name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`)
    .max(VALIDATION.NAME_MAX_LENGTH, `First name must be less than ${VALIDATION.NAME_MAX_LENGTH} characters`),
  lastName: z
    .string()
    .min(VALIDATION.NAME_MIN_LENGTH, `Last name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`)
    .max(VALIDATION.NAME_MAX_LENGTH, `Last name must be less than ${VALIDATION.NAME_MAX_LENGTH} characters`),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(VALIDATION.PHONE_REGEX, "Invalid phone number").optional().or(z.literal("")),
  dateOfBirth: z.string().optional(),
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"]).optional(),
})

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(VALIDATION.PASSWORD_MIN_LENGTH, `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`)
      .max(VALIDATION.PASSWORD_MAX_LENGTH, `Password must be less than ${VALIDATION.PASSWORD_MAX_LENGTH} characters`),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

// Address Schema
export const addressSchema = z.object({
  firstName: z
    .string()
    .min(VALIDATION.NAME_MIN_LENGTH, `First name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`)
    .max(VALIDATION.NAME_MAX_LENGTH, `First name must be less than ${VALIDATION.NAME_MAX_LENGTH} characters`),
  lastName: z
    .string()
    .min(VALIDATION.NAME_MIN_LENGTH, `Last name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`)
    .max(VALIDATION.NAME_MAX_LENGTH, `Last name must be less than ${VALIDATION.NAME_MAX_LENGTH} characters`),
  company: z.string().optional(),
  address1: z.string().min(1, "Address is required"),
  address2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().regex(VALIDATION.POSTAL_CODE_REGEX, "Invalid postal code"),
  country: z.string().min(1, "Country is required"),
  phone: z.string().regex(VALIDATION.PHONE_REGEX, "Invalid phone number").optional().or(z.literal("")),
  isDefault: z.boolean().optional(),
  type: z.enum(["shipping", "billing"]).optional(),
})

// Product Schemas
export const productReviewSchema = z.object({
  rating: z.number().min(1, "Rating is required").max(5, "Rating must be between 1 and 5"),
  title: z.string().min(1, "Review title is required").max(100, "Title must be less than 100 characters"),
  comment: z
    .string()
    .min(10, "Comment must be at least 10 characters")
    .max(1000, "Comment must be less than 1000 characters"),
  images: z.array(z.string()).optional(),
})

export const productSearchSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  vendor: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  rating: z.number().min(0).max(5).optional(),
  inStock: z.boolean().optional(),
  featured: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  sortBy: z.enum(["price", "rating", "newest", "popularity"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
})

// Cart Schemas
export const addToCartSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  variantId: z.string().optional(),
  selectedAttributes: z.record(z.string()).optional(),
})

export const updateCartItemSchema = z.object({
  quantity: z.number().min(1, "Quantity must be at least 1"),
})

export const applyCouponSchema = z.object({
  code: z.string().min(1, "Coupon code is required"),
})

// Order Schemas
export const createOrderSchema = z.object({
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
  paymentMethodId: z.string().min(1, "Payment method is required"),
  shippingMethodId: z.string().min(1, "Shipping method is required"),
  notes: z.string().optional(),
  saveAddresses: z.boolean().optional(),
})

// Contact Schemas
export const contactSchema = z.object({
  name: z
    .string()
    .min(VALIDATION.NAME_MIN_LENGTH, `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`)
    .max(VALIDATION.NAME_MAX_LENGTH, `Name must be less than ${VALIDATION.NAME_MAX_LENGTH} characters`),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
})

export const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
})

// Vendor Schemas
export const vendorApplicationSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  businessType: z.string().min(1, "Business type is required"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  phone: z.string().regex(VALIDATION.PHONE_REGEX, "Invalid phone number"),
  businessAddress: addressSchema,
  taxId: z.string().optional(),
  registrationNumber: z.string().optional(),
  bankAccountDetails: z.object({
    accountName: z.string().min(1, "Account name is required"),
    accountNumber: z.string().min(1, "Account number is required"),
    routingNumber: z.string().min(1, "Routing number is required"),
    bankName: z.string().min(1, "Bank name is required"),
  }),
  documents: z.array(z.string()).optional(),
})

// Payment Schemas
export const paymentMethodSchema = z.object({
  type: z.enum(["credit_card", "debit_card", "paypal", "stripe", "bank_transfer"]),
  provider: z.string().min(1, "Provider is required"),
  token: z.string().min(1, "Payment token is required"),
  isDefault: z.boolean().optional(),
})

export const creditCardSchema = z.object({
  cardNumber: z.string().min(13, "Invalid card number").max(19, "Invalid card number"),
  expiryMonth: z.number().min(1).max(12),
  expiryYear: z.number().min(new Date().getFullYear()),
  cvv: z.string().min(3, "Invalid CVV").max(4, "Invalid CVV"),
  cardholderName: z.string().min(1, "Cardholder name is required"),
})

// Notification Schemas
export const notificationPreferencesSchema = z.object({
  email: z.boolean(),
  push: z.boolean(),
  sms: z.boolean(),
  orderUpdates: z.boolean(),
  promotions: z.boolean(),
  newsletter: z.boolean(),
})

// File Upload Schema
export const fileUploadSchema = z.object({
  file: z.instanceof(File),
  type: z.enum(["image", "document"]),
  maxSize: z.number().optional(),
  allowedTypes: z.array(z.string()).optional(),
})

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
export type ProfileFormData = z.infer<typeof profileSchema>
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>
export type AddressFormData = z.infer<typeof addressSchema>
export type ProductReviewFormData = z.infer<typeof productReviewSchema>
export type ProductSearchFormData = z.infer<typeof productSearchSchema>
export type AddToCartFormData = z.infer<typeof addToCartSchema>
export type UpdateCartItemFormData = z.infer<typeof updateCartItemSchema>
export type ApplyCouponFormData = z.infer<typeof applyCouponSchema>
export type CreateOrderFormData = z.infer<typeof createOrderSchema>
export type ContactFormData = z.infer<typeof contactSchema>
export type NewsletterFormData = z.infer<typeof newsletterSchema>
export type VendorApplicationFormData = z.infer<typeof vendorApplicationSchema>
export type PaymentMethodFormData = z.infer<typeof paymentMethodSchema>
export type CreditCardFormData = z.infer<typeof creditCardSchema>
export type NotificationPreferencesFormData = z.infer<typeof notificationPreferencesSchema>
export type FileUploadFormData = z.infer<typeof fileUploadSchema>
