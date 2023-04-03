// Define common types
export interface RouteType {
  path: string;
  component: JSX.Element;
  permission?: number[];
}

export interface EmailType {
  email: string;
}

export interface PasswordType {
  password: string;
}

export type EmailPWDType = EmailType & PasswordType;

export interface RefreshToken {
  refresh: string;
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

export type OnChangeFiledValueType = { target: { value: string } };