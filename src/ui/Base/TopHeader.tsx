import { ReactNode } from 'react';

const TopHeader = ({
  label,
  children,
  ...props
}: {
  label: string;
  children?: ReactNode;
}) => {
  const displayStyle = children ? 'flex justify-between items-center' : '';

  return (
    <div className={displayStyle}>
      <p className="text-xl font-bold text-main-900" {...props}>
        {label}
      </p>
      {children && children}
    </div>
  );
};

export default TopHeader;
