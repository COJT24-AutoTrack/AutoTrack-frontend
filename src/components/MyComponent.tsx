import dynamic from 'next/dynamic';
import React, { ReactNode } from 'react';
import { usePCQuery, useSPQuery } from '../hooks/useBreakpoints';

const PCComponent = dynamic(() => import('./responsive/PCComponents'), { ssr: false });
const SPComponent = dynamic(() => import('./responsive/SPComponents'), { ssr: false });

interface MyComponentProps {
    children: ReactNode;
}

const MyComponent: React.FC<MyComponentProps> = ({ children }) => {
    return (
        <div>
            {useSPQuery() && <SPComponent>{children}</SPComponent>}
            {usePCQuery() && <PCComponent>{children}</PCComponent>}
        </div>
    );
};

export default MyComponent;