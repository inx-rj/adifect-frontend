import { Link } from "react-router-dom";
import Title from "components/common/pageTitle/Title";

const CardWithBorder = ({ url, title, desc, content }) => {
  return (
    <Link to={url}>
      <div className="mb-5">
        <div className="border-l-8 rounded border-[#2472FC] bg-white p-6 h-full max-h-[580px] shadow-[0_4px_40px_#2472fc0f]">
          <div className="pb-3">
            <Title title={title} />
          </div>
          <h5 className="h-full max-h-[80px] overflow-y-auto">{desc}</h5>
          {content}
        </div>
      </div>
    </Link>
  );
};

export default CardWithBorder;
