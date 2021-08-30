import { useContext } from 'react';

import * as S from './styles';
import * as Input from '../Input';
import { Button } from '../Button';

import * as Yup from 'yup';
import { ErrorMessage, Form, Formik } from 'formik';
import { toast } from 'react-toastify';

import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Router from 'next/router';

import GirlChatting from '../../assets/girl-chatting-with-friends.svg';

import { api } from '../../services/api';

import { AuthContext } from '../../contexts/AuthContext';

type SignUpForm = {
  name: string;
  email: string;
  password: string;
};

type SignInProps = {
  email: string;
  password: string;
};

export const SignUpForm = () => {
  function handleError(message: string) {
    toast.error(`${message}`);
  }

  function handleSuccess(message: string) {
    toast.success(`${message}`);
  }

  async function handleSignUp({ name, email, password }: SignUpForm) {
    await api
      .post('/auth/local/signup', {
        headers: {
          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        name,
        email,
        password
      })
      .then(() => {
        Router.push('/');
        handleSuccess('Usuário cadastrado com sucesso');
      })
      .catch((error) => {
        error;
        handleError('Email já cadastrado');
      });
  }

  return (
    <S.Wrapper>
      <Head>
        <title>Abstrakt | Cadastre-se</title>
      </Head>
      <S.ImageInitial>
        <Image
          src={GirlChatting}
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
            name: '',
            email: '',
            password: ''
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('O nome é necessário'),
            email: Yup.string()
              .email('Formato de email inválido')
              .required('O email é necessário'),
            password: Yup.string()
              .required('A senha é necessária')
              .min(6, 'Senha muito curta, mínimo de 6 caracteres')
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
          {({ handleSubmit, isSubmitting }) => {
            return (
              <Form name="sign-up-form" method="post" onSubmit={handleSubmit}>
                <p>Cadastre-se para monitorar seus sentimentos.</p>
                <S.SignUpInputGroup>
                  <Input.Input name="name" placeholder="Nome" />
                  <Input.Input name="email" placeholder="Email" />

                  <Input.InputForPassword name="password" placeholder="Senha" />
                  <S.InputWithErrorGroup>
                    <ErrorMessage name="name">
                      {(msg) => <span>{msg}</span>}
                    </ErrorMessage>
                    <ErrorMessage name="email">
                      {(msg) => <span>{msg}</span>}
                    </ErrorMessage>
                    <ErrorMessage name="password">
                      {(msg) => <span>{msg}</span>}
                    </ErrorMessage>
                  </S.InputWithErrorGroup>
                </S.SignUpInputGroup>
                <Button
                  main="Cadastrar"
                  isSubmitting={isSubmitting}
                  type="submit"
                />
                <S.SignUpField>
                  <p>
                    Ao se cadastrar você concorda com{' '}
                    <Link href="#">
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
