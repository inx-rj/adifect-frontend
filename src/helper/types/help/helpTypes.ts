export interface helpFormData {
  subject?: string | null;
  description?: string | null;
}
export interface errorType {
  subject?: string | null;
  description?: string | null;
}

export interface HelpCreateType {
  help?: string | number;
  user?: string;
  sender?: string;
  subject?: string;
  message?: string;
  chat?: string;
  receiver?:string;
  is_admin?:string | boolean;
  help_new_attachments?: File[];
  chat_new_attachments?: File[];
}

export interface HelpAttachment {
  id?: number;
  image_name?: string;
  created?: string;
  modified?: string;
  is_trashed?: boolean;
  help_new_attachments?: string;
  attachment?: number;
}

export interface HelpChatAttachment {
  id?: number;
  created?: string;
  modified?: string;
  is_trashed?: boolean;
  chat_new_attachments?: string;
  chat_attachments?: number;
  image_name:string
}

export interface HelpChatUser {
  id?: number;
  sender_name?: string;
  receiver_name?: string;
  receiver_user_image?: string;
  sender_user_image?: string;
  chat_attachments_user?: HelpChatAttachment[];
  created?: string;
  modified?: string;
  is_trashed?: boolean;
  chat?: string;
  is_admin?: boolean;
  help?: number;
  sender?: number;
  receiver?: null | number;
}

export interface HelpMessage {
  is_active?: boolean;
  id?: number;
  user_name?: string;
  user_image?: string;
  help_attachments?: HelpAttachment[];
  helpChat_user?: HelpChatUser[];
  created?: Date;
  modified?: string;
  is_trashed?: boolean;
  subject?: string;
  message?: string;
  user?: number;
}
export interface initialStateTypes {
  helpList: {
    loading: false;
    data: {
      count: number;
      prev: null | string;
      next: null | string;
      results: HelpMessage[];
    };
  };
  particularHelpDetails: {
    data: HelpMessage;
    loading: boolean;
  };
  response: {
    add: null;
    update: null;
    delete: null;
  };
  chatResponse: {
    update: null;
  };
}
