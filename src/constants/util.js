export const IS_CLIENT = (typeof window !== "undefined")
export const IS_DEV = (process.env.NODE_ENV === "development")
export const IS_PROD = (process.env.NODE_ENV === "production")
