import * as MUIcon from "@mui/icons-material";

interface IconProps {
  icon?: string;
}
const MuiIcon = (props: IconProps) => {
  const { icon } = props;
  const Icon = icon && MUIcon[icon];

  return <Icon />;
};

export default MuiIcon;
