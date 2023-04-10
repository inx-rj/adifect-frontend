import MuiIcon from "components/common/MuiIcon";

const TabbingHeadTitle = props => {
  const { title = '', info = '', icon = '', active = '', iconSize = 20 } = props;
  return (
    <div className={`nav-card ${title === active ? 'active' : ''}`}>
      <div className="w-[30px] h-[30px] flex items-center justify-center">
        <MuiIcon icon={icon} />
      </div>
      <div className="w-[calc(100%-30px)]">
        <h3 className="title">{title}</h3>
        <span className="info">{info}</span>
      </div>
    </div>
  );
};

export default TabbingHeadTitle;
