// next & react imports
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Router from 'next/router';

// code imports
import * as S from './styles';
import * as Input from '@/components/Input';
import { Button } from '@/components/Button';
import { FormError } from '@/components/FormError';
import { api } from '@/services/api';

// dependencies imports
import * as Yup from 'yup';
import { ErrorMessage, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { setCookie } from 'nookies';

// assets imports
import GirlChatting from '@/assets/girl-chatting-with-friends.svg';

// types imports
import { Sign } from '@/types';

export const SignUpForm = () => {
  function handleError(message: string) {
    toast.error(`${message}`);
  }

  function handleSuccess(message: string) {
    toast.success(`${message}`);
  }

  async function handleSignUp({ name, email, password }: Sign) {
    await api
      .post('/auth/local/signup', {
        name,
        email,
        password
      })
      .then(({ data }) => {
        const tokenAccess = data.data.accessToken;
        setCookie(undefined, 'abstrakt.token', tokenAccess, {
          maxAge: 60 * 60 * 1 // 1 hour
        });
        Router.push('/app');
        handleSuccess('O usuário está autenticado.');
      })
      .catch((error) => {
        console.log(error);
        handleError(
          'Já um usuário cadastrado com este email, tente fazer login.'
        );
      });
  }

  return (
    <S.Wrapper>
      <Head>
        <title>Abstrakt | Cadastre-se</title>
      </Head>
      <S.ImageInitial>
        <Link href="https://iconscout.com/illustration/girl-chatting-with-friends-2611096">
          <Image
            src={GirlChatting}
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

        <Formik
          initialValues={{
            name: '',
            email: '',
            password: ''
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('O nome é obrigatório.'),
            email: Yup.string()
              .email('O formato de email inválido.')
              .required('O email é obrigatório.'),
            password: Yup.string()
              .required('A senha é obrigatória.')
              .min(6, 'A senha tem o mínimo de 6 caracteres.')
          })}
          onSubmit={(values, { setSubmitting }) => {
            const timeOut = setTimeout(() => {
              handleSignUp(values);
              setSubmitting(false);
              clearTimeout(timeOut);
            }, 1000);
          }}
        >
          {/* The form */}
          {({ handleSubmit, isSubmitting, errors, touched }) => {
            const onErrorValidation =
              (errors.name && touched.name) ||
              (errors.email && touched.email) ||
              (errors.password && touched.password);

            return (
              <Form name="sign-up-form" method="post" onSubmit={handleSubmit}>
                <p>Cadastre-se para monitorizar seus sentimentos.</p>
                <S.SignUpInputGroup>
                  <Input.Input
                    name="name"
                    autoComplete="name"
                    placeholder="Nome"
                  />
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
                      <ErrorMessage name="name">
                        {(msg) => <span>{msg}</span>}
                      </ErrorMessage>
                      <ErrorMessage name="email">
                        {(msg) => <span>{msg}</span>}
                      </ErrorMessage>
                      <ErrorMessage name="password">
                        {(msg) => <span>{msg}</span>}
                      </ErrorMessage>
                    </FormError>
                  )}
                </S.SignUpInputGroup>
                <Button
                  main="Cadastrar"
                  isSubmitting={isSubmitting}
                  type="submit"
                />
                <S.SignUpField>
                  <p>
                    Ao se cadastrar você concorda com{' '}
                    <Link href="/useterms">
                      <a>os termos de uso.</a>
                    </Link>
                  </p>
                </S.SignUpField>
              </Form>
            );
          }}
        </Formik>
      </S.FormContainer>
    </S.Wrapper>
  );
};
