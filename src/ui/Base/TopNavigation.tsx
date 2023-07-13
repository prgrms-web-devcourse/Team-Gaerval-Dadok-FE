interface Props {
  variant?: 'primary' | 'secondary';
  backgroundColor?: 'bg-background' | 'bg-white';
  backButton?: boolean;
  onClickBack?: () => void;
  title?: string;
  option?: 'none' | 'share' | 'post';
  onClickOption?: () => void;
  isOwner?: boolean;
  onClickOwner?: () => void;
}

const TopNavigation = ({
  variant = 'primary',
  backgroundColor = 'bg-background',
  backButton = true,
  title = '',
  option = 'none',
  isOwner = false,
}: Props) => {
  return (
    <div className={`${BASE_CLASSES} ${backgroundColor}`}>
      {backButton && <div className={`${ICON_CLASSES}`}></div>}
      <div className={`${TITLE_CLASSES} ${VARIANT_CLASSES[variant]}`}>
        {title}
      </div>
      <div className="flex">
        {option !== 'none' && <div className={`${ICON_CLASSES}`}></div>}
        {isOwner && <div className={`${ICON_CLASSES}`}></div>}
      </div>
    </div>
  );
};

export default TopNavigation;

const BASE_CLASSES =
  'flex justify-between align-middle max-w-[43rem] w-100% h-[5.4rem] px-[2rem] py-[1.5rem] border-main-900 border-[0.1rem]';

const TITLE_CLASSES =
  'flex w-[100%] border-[0.1rem] border-warning-800 text-md font-regular';

const ICON_CLASSES = 'w-[2.2rem] h-[2.2rem] border-[0.1rem] border-warning-800';

const VARIANT_CLASSES = {
  primary: 'justify-center',
  secondary: 'justify-left',
};
