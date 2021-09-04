// next & react imports
import { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// code imports
import * as S from './styles';
import * as Input from '@/components/Input';
import { Button } from '@/components/Button';
import { FormError } from '@/components/FormError';
import { AuthContext } from '@/contexts/AuthContext';

// dependencies imports
import * as Yup from 'yup';
import { ErrorMessage, Form, Formik } from 'formik';
import { signIn } from 'next-auth/client';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

// image imports
import GirlWithPlant from '@/assets/girl-with-plant.svg';

// types imports
import { SignInType } from '@/types';

export const LoginForm = () => {
  const { signInLogin, isAuthenticated } = useContext(AuthContext);

  function handleError(message: string) {
    toast.error(`${message}`);
  }

  function handleSuccess(message: string) {
    toast.success(`${message}`);
  }

  const signInGoogle = async () => {
    await signIn('google').catch((error) => console.warn(error));
  };

  async function handleSignIn({ email, password }: SignInType) {
    await signInLogin({ email, password })
      .then(() => {
        isAuthenticated && handleSuccess('O usuário está autenticado.');
      })
      .catch((error) => {
        console.log('error', error);
        handleError(
          'O usuário ou senha estão incorretos, aguarde alguns segundos e tente novamente.'
        );
      });
  }

  return (
    <S.Wrapper>
      <S.ImageInitial>
        <Link href="https://iconscout.com/illustration/girl-with-plant-2611073">
          <Image
            src={GirlWithPlant}
            width={400}
            height={400}
            title="Drawing Illustration by Iconscout Store"
            objectFit="cover"
            alt="Girl With Plant"
          />
        </Link>
      </S.ImageInitial>
      <S.FormContainer>
        <h1>Abstrakt</h1>

        <S.SignWithGoogle onClick={signInGoogle}>
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
              .email('O formato de email inválido.')
              .required('O email é obrigatório.'),
            password: Yup.string()
              .required('A senha é obrigatória.')
              .min(6, 'A senha tem o mínimo de 6 caracteres.')
          })}
          onSubmit={(values, { setSubmitting }) => {
            const timeOut = setTimeout(() => {
              handleSignIn(values);
              setSubmitting(false);
              clearTimeout(timeOut);
            }, 1000);
          }}
        >
          {/* The form */}
          {({ handleSubmit, isSubmitting, errors, touched }) => {
            const onErrorValidation =
              (errors.email && touched.email) ||
              (errors.password && touched.password);

            return (
              <Form name="login-form" method="post" onSubmit={handleSubmit}>
                <S.LoginInputGroup>
                  <Input.Input
                    name="email"
                    autoComplete="email"
                    placeholder="Email"
                  />

                  <Input.InputForPassword
                    name="password"
                    autoComplete="password"
                    placeholder="Senha"
                  />

                  {onErrorValidation && (
                    <FormError isEmpty={!onErrorValidation}>
                      <ErrorMessage name="email">
                        {(msg) => <span>{msg}</span>}
                      </ErrorMessage>
                      <ErrorMessage name="password">
                        {(msg) => <span>{msg}</span>}
                      </ErrorMessage>
                    </FormError>
                  )}
                </S.LoginInputGroup>
                <Button
                  main="Entrar"
                  isSubmitting={isSubmitting}
                  type="submit"
                />
                <S.SignInField>
                  <Link href="/signup">
                    <a>ou cadastre-se.</a>
                  </Link>
                </S.SignInField>
              </Form>
            );
          }}
        </Formik>
      </S.FormContainer>
    </S.Wrapper>
  );
};
