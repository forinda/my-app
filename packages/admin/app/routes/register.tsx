import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { Field } from '~/components/ui/field';
import { Icon } from '@iconify/react';
import { Link } from 'react-router';
import { Heading } from '~/components/ui/heading';
import { css } from 'styled-system/css';
import {
  registerUserSchema,
  type RegisterUserSchemaType,
} from '~/lib/schema/register-user-schema';

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserSchemaType>({
    resolver: zodResolver(registerUserSchema),
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
          Register
        </Heading>
        <form
          onSubmit={submitForm}
          className={css({ display: 'flex', flexDirection: 'column', gap: 4 })}
        >
          <Field.Root
            {...rootProps}
            invalid={errors.first_name?.message ? true : false}
          >
            <Field.Label>First Name</Field.Label>
            <Field.Input asChild>
              <Field.Input
                placeholder="Enter your first name"
                {...register('first_name')}
              />
            </Field.Input>
            <Field.ErrorText>{errors.first_name?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root
            {...rootProps}
            invalid={errors.last_name?.message ? true : false}
          >
            <Field.Label>Last Name</Field.Label>
            <Field.Input asChild>
              <Field.Input
                placeholder="Enter your last name"
                {...register('last_name')}
              />
            </Field.Input>
            <Field.ErrorText>{errors.last_name?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root
            {...rootProps}
            invalid={errors.email?.message ? true : false}
          >
            <Field.Label>Email</Field.Label>
            <Field.Input asChild>
              <Field.Input
                placeholder="Enter your email"
                {...register('email')}
              />
            </Field.Input>
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root
            {...rootProps}
            invalid={errors.username?.message ? true : false}
          >
            <Field.Label>Username</Field.Label>
            <Field.Input asChild>
              <Field.Input
                placeholder="Choose a username"
                {...register('username')}
              />
            </Field.Input>
            <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root
            {...rootProps}
            invalid={errors.phone_number?.message ? true : false}
          >
            <Field.Label>Phone Number</Field.Label>
            <Field.Input asChild>
              <Field.Input
                placeholder="Enter your phone number"
                {...register('phone_number')}
              />
            </Field.Input>
            <Field.ErrorText>{errors.phone_number?.message}</Field.ErrorText>
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
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>

          <div
            className={css({ display: 'flex', alignItems: 'center', gap: 2 })}
          >
            <Checkbox {...register('terms')}>
              I agree to the Terms and Conditions
            </Checkbox>
          </div>

          <Button type="submit" className={css({ width: 'full' })}>
            Register
          </Button>
        </form>

        <div
          className={css({
            display: 'flex',
            justifyContent: 'center',
            fontSize: 'sm',
            color: 'gray.12',
            marginTop: 4,
          })}
        >
          Already have an account?{' '}
          <Link
            to="/auth/login"
            className={css({
              color: 'blue',
              ml: 1,
              '&:hover': { textDecoration: 'underline' },
            })}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
