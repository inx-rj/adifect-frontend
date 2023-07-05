import { LoadingType } from '..';
import { TableDataResponseType } from '../muiTable/muiTable';

export interface UsersListInitialStateType extends LoadingType {
  usersList: TableDataResponseType;
}
