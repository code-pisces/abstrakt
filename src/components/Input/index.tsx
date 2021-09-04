// next & react imports
import React, { useState } from 'react';

// dependencies imports
import { Field } from 'formik';
import { AiOutlineEye } from 'react-icons/ai';

//  code imports
import * as S from './styles';

// types imports
import { InputProps } from '@/types';

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
