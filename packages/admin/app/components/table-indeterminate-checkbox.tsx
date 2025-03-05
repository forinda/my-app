import React, { type HTMLProps } from 'react';
import { Checkbox } from './ui/checkbox';
import { css } from 'styled-system/css';
type Props = {
  indeterminate?: boolean;
  className?: string;
} & HTMLProps<HTMLInputElement>;
export default function TableIndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}: Props) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);
  return (
    <input
      type="checkbox"
      ref={ref}
      className={css({ cursor: 'pointer' }) + ' ' + className}
      {...rest}
    />
  );
}
