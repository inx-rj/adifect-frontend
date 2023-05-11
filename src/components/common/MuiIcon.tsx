import * as MUIcon from "@mui/icons-material";
interface IconProps {
   icon?: keyof typeof MUIcon;
}
const MuiIcon: React.FC<IconProps> = ({
  icon,
}) => {
    const Icon = icon && MUIcon[icon];
    return Icon && <Icon />
}

export default MuiIcon;