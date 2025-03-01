import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import { Field } from '~/components/ui/field';

import { Heading } from '~/components/ui/heading';
import { css } from 'styled-system/css';
import {
  forgotPasswordSchema,
  type ForgotPasswordSchemaType,
} from '~/lib/schema/forgot-password-schema';

export default function ForgotPassword() {
  const [otpSent, setOtpSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const sendOtp = () => {
    const { email } = getValues();
    console.log('Sending OTP to:', email);
    if (email) setOtpSent(true);
  };

  const submitForm = handleSubmit((data) => {
    console.log('Reset Password Data:', data);
  });

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
          Forgot Password
        </Heading>
        <form
          onSubmit={otpSent ? submitForm : handleSubmit(sendOtp)}
          className={css({ display: 'flex', flexDirection: 'column', gap: 4 })}
        >
          <Field.Root invalid={errors.email?.message ? true : false}>
            <Field.Label>Email</Field.Label>
            <Field.Input asChild>
              <Field.Input
                placeholder="Enter your email"
                {...register('email')}
              />
            </Field.Input>
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>

          {otpSent && (
            <>
              <Field.Root invalid={errors.otp?.message ? true : false}>
                <Field.Label>OTP</Field.Label>
                <Field.Input asChild>
                  <Field.Input
                    placeholder="Enter the OTP"
                    {...register('otp')}
                  />
                </Field.Input>
                <Field.ErrorText>{errors.otp?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={errors.password?.message ? true : false}>
                <Field.Label>New Password</Field.Label>
                <Field.Input asChild>
                  <Field.Input
                    type="password"
                    placeholder="********"
                    {...register('password')}
                  />
                </Field.Input>
                <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
              </Field.Root>
            </>
          )}
          {otpSent ? (
            <Button type="submit" className={css({ width: 'full' })}>
              {'Reset Password'}
            </Button>
          ) : (
            <Button
              type="button"
              className={css({ width: 'full' })}
              onClick={sendOtp}
            >
              {'Send OTP'}
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
