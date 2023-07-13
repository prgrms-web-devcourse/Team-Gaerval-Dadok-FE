import { IconLeftArrow, IconOptions, IconPost, IconShare } from '@public/icons';

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
  onClickBack,
  title = '',
  option = 'none',
  onClickOption,
  isOwner = false,
  onClickOwner,
}: Props) => {
  return (
    <div className={`${BASE_CLASSES} ${backgroundColor}`}>
      <div className="flex">
        {backButton && (
          <div className={`${ICON_CLASSES}`}>
            <IconLeftArrow onClick={onClickBack} />
          </div>
        )}
      </div>
      <div className={`${TITLE_CLASSES} ${VARIANT_CLASSES[variant]}`}>
        {title}
      </div>
      <div className="flex gap-[1rem]">
        {option !== 'none' && (
          <div className={`${ICON_CLASSES}`}>
            {option === 'share' ? (
              <IconShare onClick={onClickOption} />
            ) : (
              <IconPost onClick={onClickOption} />
            )}
          </div>
        )}
        {isOwner && (
          <div className={`${ICON_CLASSES}`}>
            <IconOptions onClick={onClickOwner} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNavigation;

const BASE_CLASSES =
  'flex gap-[1.5rem] align-middle max-w-[43rem] w-full h-[5.4rem] px-[2rem] py-[1.7rem]';

const TITLE_CLASSES =
  'flex w-full text-md font-regular leading-snug align-text-top';

const ICON_CLASSES = 'flex w-[2rem] h-full hover:cursor-pointer';

const VARIANT_CLASSES = {
  primary: 'justify-center',
  secondary: 'justify-left',
};
