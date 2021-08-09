import * as S from './styles';
import * as Input from '../Input';
import { Button } from 'components/Button';

import * as Yup from 'yup';
import { ErrorMessage, Form, Formik } from 'formik';

import Image from 'next/image';
import Link from 'next/link';

import GirlSiting from '../../assets/girl-siting-near-fan-and-holding-cold-drink-can.svg';

export const SignUpForm = () => (
  <S.Wrapper>
    <S.ImageInitial>
      <Image
        src={GirlSiting}
        width={400}
        height={400}
        objectFit="cover"
        alt="Girl With Plant"
      />
    </S.ImageInitial>
    <S.FormContainer>
      <h1>Abstrakt</h1>

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
              <Button main="Entrar" isSubmitting={isSubmitting} type="submit" />
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
