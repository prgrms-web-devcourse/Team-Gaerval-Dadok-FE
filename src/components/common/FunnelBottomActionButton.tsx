import Button from '@/components/common/Button';

const _FunnelBottomActionButton = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-10 mx-auto flex w-full max-w-[43rem] gap-[0.8rem] bg-white px-[2.0rem] pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-[1.5rem]">
      {children}
    </footer>
  );
};

const SubmitButton = ({
  onClick,
  disabled,
  children,
}: {
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <Button
      type="submit"
      onClick={onClick}
      colorScheme="main"
      size="large"
      disabled={disabled}
      className="grow-[5]"
    >
      {children}
    </Button>
  );
};

const PreviousButton = ({
  onClick,
  children,
}: {
  onClick?: () => void;
  children?: React.ReactNode;
}) => {
  return (
    <Button
      onClick={onClick}
      colorScheme="grey"
      size="large"
      className="grow-[1]"
    >
      {children}
    </Button>
  );
};

const FunnelBottomActionButton = Object.assign(_FunnelBottomActionButton, {
  Submit: SubmitButton,
  Previous: PreviousButton,
});

export default FunnelBottomActionButton;
