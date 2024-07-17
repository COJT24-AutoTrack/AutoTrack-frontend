import React, { ReactNode } from "react";
import PCComponent from "./responsive/PCComponents";
import SPComponent from "./responsive/SPComponents";
import { usePCQuery, useSPQuery } from "../hooks/useBreakpoints";

interface MyComponentProps {
  children?: ReactNode;
}

const MyComponent: React.FC<MyComponentProps> = ({ children }) => {
  const isPC = usePCQuery();
  const isSP = useSPQuery();

  return (
    <div>
      {isPC ? <PCComponent /> : <SPComponent>{children}</SPComponent>}
    </div>
  );
};

export default MyComponent;
