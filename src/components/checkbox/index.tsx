import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onCheckedChange, ...props }) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onCheckedChange(e.target.checked)}
        {...props}
      />
      <div className={`
        w-5 h-5  rounded-md flex items-center justify-center
        ${checked ? 'bg-blue-500 border-blue-500' : 'bg-[#212d4e]'}
      `}>
        {checked && (
          <svg
            className="w-3 h-3 text-white fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        )}
      </div>
    </label>
  );
};

export default Checkbox;