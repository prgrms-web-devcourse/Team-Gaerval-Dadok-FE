const schemes = {
  main: 'bg-main-900',
  grey: 'bg-black-400',
} as const;

type DotScheme = keyof typeof schemes;

interface LoadingProps {
  color?: DotScheme;
  fullpage?: boolean;
}

const Loading = ({ color = 'main', fullpage = false }: LoadingProps) => {
  if (fullpage) {
    return (
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <LoadingDots color={color} />
      </div>
    );
  }

  return <LoadingDots color={color} />;
};

export default Loading;

const LoadingDots = ({ color }: { color: DotScheme }) => (
  <div className="flex gap-[1rem]">
    <LoadingDot color={color} animationStep={0} />
    <LoadingDot color={color} animationStep={1} />
    <LoadingDot color={color} animationStep={2} />
  </div>
);

const animations = {
  0: 'animate-dot-flash',
  1: 'animate-dot-flash-delay-0.5',
  2: 'animate-dot-flash-delay-1',
} as const;

export const LoadingDot = ({
  color,
  animationStep = 0,
}: {
  color: DotScheme;
  animationStep?: keyof typeof animations;
}) => (
  <span
    className={`h-[1rem] w-[1rem] rounded-full ${schemes[color]} ${animations[animationStep]}`}
  ></span>
);
