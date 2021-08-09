import * as S from './styles';
import * as Input from '../Input';
import { Button } from 'components/Button';

import * as Yup from 'yup';
import { ErrorMessage, Form, Formik } from 'formik';

import { FcGoogle } from 'react-icons/fc';

import GirlWithPlant from '../../assets/girl-with-plant.svg';

import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';

type handleSignInProps = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data: handleSignInProps) {
    await signIn(data);
  }

  return (
    <S.Wrapper>
      <S.ImageInitial>
        <Image
          src={GirlWithPlant}
          width={400}
          height={400}
          objectFit="cover"
          alt="Girl With Plant"
        />
      </S.ImageInitial>
      <S.FormContainer>
        <h1>Abstrakt</h1>

        <S.SignWithGoogle>
          <FcGoogle />
          Entre com Google
        </S.SignWithGoogle>
        <S.SeparatorWithOr>
          <div />
          <span>ou entre com email</span>
          <div />
        </S.SeparatorWithOr>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email('Formato de email inválido')
              .required('O email é necessário'),
            password: Yup.string()
              .required('A senha é necessária')
              .min(6, 'Senha muito curta, mínimo de 6 caracteres')
          })}
          onSubmit={(values, { setSubmitting }) => {
            const timeOut = setTimeout(() => {
              console.log(values);
              setSubmitting(false);
              handleSignIn(values);
              clearTimeout(timeOut);
            }, 1000);
          }}
        >
          {/* The form */}
          {({ handleSubmit, isSubmitting }) => {
            return (
              <Form name="login-form" method="post" onSubmit={handleSubmit}>
                <S.LoginInputGroup>
                  <Input.Input name="email" placeholder="Email" />

                  <Input.InputForPassword name="password" placeholder="Senha" />
                  <S.InputWithErrorGroup>
                    <ErrorMessage name="email">
                      {(msg) => <span>{msg}</span>}
                    </ErrorMessage>
                    <ErrorMessage name="password">
                      {(msg) => <span>{msg}</span>}
                    </ErrorMessage>
                  </S.InputWithErrorGroup>
                </S.LoginInputGroup>
                <Button
                  main="Entrar"
                  isSubmitting={isSubmitting}
                  type="submit"
                />
                <S.SignInField>
                  <Link href="#"> ou cadastre-se.</Link>
                </S.SignInField>
              </Form>
            );
          }}
        </Formik>
      </S.FormContainer>
    </S.Wrapper>
  );
};
