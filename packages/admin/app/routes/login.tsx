import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { Field } from '~/components/ui/field';
import {
  loginUserSchema,
  type LoginUserSchemaType,
} from '~/lib/schema/login-schema';
import { Icon } from '@iconify/react';
import { Link } from 'react-router';
import { Heading } from '~/components/ui/heading';
import { css } from 'styled-system/css';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserSchemaType>({
    resolver: zodResolver(loginUserSchema),
  });

  const submitForm = handleSubmit((data) => {
    console.log(data);
  });
  const rootProps: Field.RootProps = {};

  return (
    <div
      className={css({
        display: 'flex',
        minH: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        bg: 'gray.100',
      })}
    >
      <div
        className={css({
          width: 'full',
          maxWidth: 'md',
          bg: 'white',
          padding: 6,
          borderRadius: 'md',
          shadow: 'md',
        })}
      >
        <Heading
          as="h2"
          className={css({
            fontSize: '1.5rem',
            fontWeight: 'semibold',
            marginBottom: 4,
            textAlign: 'center',
          })}
        >
          Login
        </Heading>
        <form
          onSubmit={submitForm}
          className={css({ display: 'flex', flexDirection: 'column', gap: 4 })}
        >
          <Field.Root
            {...rootProps}
            invalid={errors.emailOrUsername?.message ? true : false}
          >
            <Field.Label>Email or Username</Field.Label>
            <Field.Input asChild>
              <Field.Input
                placeholder="Enter your email or username"
                {...register('emailOrUsername')}
              />
            </Field.Input>
            <Field.ErrorText>{errors.emailOrUsername?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root
            {...rootProps}
            invalid={errors.password?.message ? true : false}
          >
            <Field.Label>Password</Field.Label>
            <Field.Input asChild>
              <Field.Input
                type="password"
                placeholder="********"
                {...register('password')}
              />
            </Field.Input>

            <Field.ErrorText> {errors.password?.message}</Field.ErrorText>
          </Field.Root>

          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            })}
          >
            <Checkbox defaultChecked {...register('rememberMe')}>
              Remember Me
            </Checkbox>
            <Link
              to="/auth/forgot-password"
              className={css({
                fontSize: 'sm',
                color: 'blue.600',
                textDecoration: 'underline',
                '&:hover': { color: 'blue' },
              })}
            >
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" className={css({ width: 'full' })}>
            Login
          </Button>
        </form>

        <div className={css({ position: 'relative', marginY: 4 })}>
          <div
            className={css({
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
            })}
          >
            <div
              className={css({
                width: 'full',
                borderTop: '1px solid',
                borderColor: 'gray.10',
                backgroundColor: 'red',
              })}
            ></div>
          </div>
          <div
            className={css({
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              fontSize: 'sm',
            })}
          >
            <span
              className={css({
                backgroundColor: 'white',
                paddingX: 2,
                color: 'gray.12',
              })}
            >
              Or
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className={css({
            width: 'full',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          })}
        >
          <Icon icon="logos:google-icon" scale={'2'} /> Continue with Google
        </Button>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'center',
            fontSize: 'sm',
            color: 'gray.12',
            marginTop: 4,
          })}
        >
          Don't have an account?{' '}
          <Link
            to="/auth/register"
            className={css({
              color: 'blue',
              ml: 1,
              '&:hover': { textDecoration: 'underline' },
            })}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
