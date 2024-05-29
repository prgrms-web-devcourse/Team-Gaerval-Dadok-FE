/**
 * @param value percentage
 */
const ProgressBar = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  return (
    <div
      className={
        'absolute inset-x-0 h-[0.2rem] w-full overflow-hidden ' + className
      }
    >
      <div className="absolute h-full w-full bg-main-500" />
      <div
        className="absolute h-full w-full bg-main-900"
        style={{
          transform: `translateX(-${100 - value}%)`,
          transition: 'transform 0.4s 0.1s ease-in-out',
        }}
      />
    </div>
  );
};

export default ProgressBar;
