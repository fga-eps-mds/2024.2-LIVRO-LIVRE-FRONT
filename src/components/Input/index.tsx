import { useState } from 'react';
import styles from './styles';
import { AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface InputProps {
  placeholder: string;
  value: string;
  showVisibleButton?: boolean;
  onChange: (value: string) => void;
  disabled?: boolean;
}

function Input({
  placeholder,
  disabled,
  value,
  onChange,
  showVisibleButton = true,
}: InputProps) {
  const [isValueVisible, setIsValueVisible] = useState(false);

  return (
    <styles.Container>
      <styles.Icon>
        <AiOutlineLock size={20}/>
      </styles.Icon>
      <styles.Input
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        type={isValueVisible ? 'text' : 'password'}
        onChange={(e) => onChange(e.target.value)}
      />
      {showVisibleButton && (
        <>
          {isValueVisible ? (
            <styles.Icon onClick={() => setIsValueVisible(v => !v)} >
              <AiOutlineEye size={20}/>
            </styles.Icon>
          ) : (
          <styles.Icon onClick={() => setIsValueVisible(v => !v)} >
            <AiOutlineEyeInvisible size={20}/>
          </styles.Icon>
        )}
        </>
      )}
    </styles.Container>
  )
}

export default Input;
