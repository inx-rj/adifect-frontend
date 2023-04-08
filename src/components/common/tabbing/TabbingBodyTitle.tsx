const TabbingBodyTitle = props => {
  const { title = '' } = props;
  return title && <h3 className="text-lg font-semiBold mb-4">{title}</h3>;
};

export default TabbingBodyTitle;
