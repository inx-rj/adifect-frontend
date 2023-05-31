import { TableDataResponseType } from "../muiTable/muiTable";

export interface initialNotificationQueryInterface {
    id?: number;
    companyId?: number;
    offsetid?: number;
}

export interface ChannelInitialType {
    channelList: {
        loading: boolean;
        data: TableDataResponseType;
    };
}