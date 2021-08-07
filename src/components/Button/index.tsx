import { ButtonHTMLAttributes } from 'react';
import * as S from './styles';

interface ButtonTypeProps extends ButtonHTMLAttributes<HTMLInputElement> {
  main: string;
  isSubmitting?: boolean;
  outline?: boolean;
}

export const Button: React.FC<ButtonTypeProps> = ({
  main,
  isSubmitting,
  outline
}: ButtonTypeProps) => (
  <S.Wrapper Outlined={outline}>{isSubmitting ? <S.Loader /> : main}</S.Wrapper>
);
