import { ReactNode } from 'react';

interface TopHeaderProps {
  label: string;
  children?: ReactNode;
}

const TopHeader = ({ label, children }: TopHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-5 pb-2 pt-5">
      <p className="text-xl font-bold text-main-900">{label}</p>
      {children}
    </div>
  );
};

export default TopHeader;
