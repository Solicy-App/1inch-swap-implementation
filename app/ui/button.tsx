import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  const {disabled} = rest;
  return (
    <button
      {...rest}
      className={clsx(
        `flex h-10 items-center rounded-xl ${disabled ? 'bg-blue-btnLight' :'bg-blue-500 hover:bg-blue-btnNeutral focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 '} px-4 text-base font-normal text-blue-txtLight transition-colors  aria-disabled:cursor-not-allowed aria-disabled:opacity-50`,
        className,
      )}
    >
      {children}
    </button>
  );
}
