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
    <LoadingDot color={color} animationStep={1} />
    <LoadingDot color={color} animationStep={2} />
    <LoadingDot color={color} animationStep={3} />
  </div>
);

type AnimationStep = 1 | 2 | 3;
type LoadingAnimations = {
  [key in AnimationStep]: string;
};

const animations: LoadingAnimations = {
  1: 'animate-dot-flash',
  2: 'animate-dot-flash-delay-0.5',
  3: 'animate-dot-flash-delay-1',
};

const LoadingDot = ({
  color,
  animationStep = 1,
}: {
  color: DotScheme;
  animationStep?: AnimationStep;
}) => (
  <span
    className={`h-[1rem] w-[1rem] rounded-full ${schemes[color]} ${animations[animationStep]} translate-y-[5px] opacity-20`}
  ></span>
);
