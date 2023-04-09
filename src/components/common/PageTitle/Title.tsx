import React from "react";

interface TitleType {
  title: string;
}
const Title = (props: TitleType) => {
  const { title } = props;
  return (
      <h4 className="font-bold text-xl">{title}</h4>
  );
};

export default Title;
