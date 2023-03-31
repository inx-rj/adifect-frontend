// Define common types 
export interface RouteType {
  path: string;
  component: JSX.Element;
}

export interface EmailType {
  email: string;
}

export interface PasswordType {
  password: string;
}

export type EmailPWDType = EmailType & PasswordType

export interface CodePhoneType {
  phone_number: string;
  country_code: string;
}

export interface CountryCodeType {
  country_code?: string;
}

export interface PhoneNumType {
  phone_number: string;
}

export interface TwoFACodePhoneType extends PhoneNumType {
  "2fa_country_code"?: string;
}

export interface RefreshToken {
  refresh: string;
}

export interface APIKeyType {
  api_key: string;
}

export interface LoadingType {
  loading: boolean;
}
export interface LoadingHasDataType extends LoadingType {
  hasData: boolean;
}

// Application token type
export interface AppTokenType extends RefreshToken {
  access: string;
}

export interface SidebarRoutesTypes {
  name: string;
  path: string;
  //   icon?: React.ReactComponentElement<JSXElementConstructor<undefined>>;
  icon?: string;
  children: SidebarRoutesTypes[];
}

export interface appInitialType {
  value: boolean;
  persist: boolean;
  isMiniSidebar: boolean;
}