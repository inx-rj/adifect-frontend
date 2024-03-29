import { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";

export const CustomDND = ({ children, ...props }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable droppableId="droppable" {...props}>{children}</Droppable>;
};
