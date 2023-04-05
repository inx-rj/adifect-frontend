import React from "react";

interface TitleType {
  title: string;
}
const Title = (props: TitleType) => {
  const { title } = props;
  return (
    <div className="">
      <span className="font-bold text-xl">{title}</span>
    </div>
  );
};

export default Title;
