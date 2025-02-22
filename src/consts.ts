export const NAME_MIN = Number(process.env.NEXT_PUBLIC_MIN_NAME) || 4;
export const NAME_MAX = Number(process.env.NEXT_PUBLIC_MAX_NAME) || 50;

export const ADDRESS_MIN = Number(process.env.NEXT_PUBLIC_MIN_ADDRESS) || 4;
export const ADDRESS_MAX = Number(process.env.NEXT_PUBLIC_MAX_ADDRESS) || 500;

export const ZIP_CODE_MIN = Number(process.env.NEXT_PUBLIC_MIN_ZIP_CODE) || 4;
export const ZIP_CODE_MAX = Number(process.env.NEXT_PUBLIC_MAX_ZIP_CODE) || 50;

export const DESCRIPTION_MIN = Number(process.env.NEXT_PUBLIC_MIN_DESCRIPTION) || 4;
export const DESCRIPTION_MAX = Number(process.env.NEXT_PUBLIC_MAX_DESCRIPTION) || 4000;
export const JWT_SECRET = process.env.APP_JWT_SECRET;

export const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/.*)?$/i;
