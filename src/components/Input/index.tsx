import React, { InputHTMLAttributes, useState } from 'react';
import { Field } from 'formik';

import * as S from './styles';

import { AiOutlineEye } from 'react-icons/ai';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export const Input: React.FC<InputProps> = ({ ...rest }) => (
  <S.Wrapper>
    <Field {...rest} />
  </S.Wrapper>
);

export const InputForPassword: React.FC<InputProps> = ({ ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <S.Wrapper isShowing={showPassword}>
      <Field type={showPassword ? 'text' : 'password'} {...rest} />
      <div onClick={() => setShowPassword(!showPassword)}>
        <AiOutlineEye />
      </div>
    </S.Wrapper>
  );
};
