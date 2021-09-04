// code imports
import * as S from './styles';

// types imports
import { ButtonTypeProps } from '@/types';

export const Button: React.FC<ButtonTypeProps> = ({
  main,
  isSubmitting,
  outline
}: ButtonTypeProps) => (
  <S.Wrapper Outlined={outline}>{isSubmitting ? <S.Loader /> : main}</S.Wrapper>
);
