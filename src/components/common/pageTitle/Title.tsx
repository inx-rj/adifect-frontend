interface TitleType {
  title: string;
  customClass?: string;
}
const Title = (props: TitleType) => {
  const { title, customClass } = props;
  return <h4 className={`${customClass} font-bold text-xl`}>{title}</h4>;
};

export default Title;
