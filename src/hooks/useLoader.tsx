import { ReactNode } from 'react';

interface LoaderProps {
  message?: string;
  className?: string;
  spinnerClassName?: string;
  textClassName?: string;
}

export default function useLoader(): (props: LoaderProps) => ReactNode {
  const Loader = ({
    message = 'Loading...',
    className = 'col-span-2 flex items-center justify-center py-8',
    spinnerClassName = 'animate-spin h-6 w-6 text-blue-500',
    textClassName = 'text-xl'
  }: LoaderProps = {}) => {
    return (
      <div className={className}>
        <div className={`flex items-center gap-2 ${textClassName}`}>
          <svg className={spinnerClassName} viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          {message}
        </div>
      </div>
    );
  };

  return Loader;
}