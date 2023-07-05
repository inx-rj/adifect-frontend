export type DateInputT = {
  handleDateChange: (value: string, index: number) => void;
  index: number;
  dateRange: boolean;
  dateState: string;
  setDateState: (value: string) => void;
  label: string;
};
