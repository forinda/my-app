import MaxWidth from '@/components/max-width';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useAuth from '@/hooks/use-auth';
import { toastError, toastSuccess } from '@/lib/toast';
import { LoginResponseData } from '@/types/login';
import apiClient from '@/utils/api-client';
import { loginSchema, LoginSchema } from '@/utils/schema/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const {
    dispatch,
    actions,
    is_authenticated,
    state,
    seconds_until_token_expires,
    should_refresh_token
  } = useAuth();
  const form = useForm<LoginSchema>({
    defaultValues: {
      email_or_username: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const feedback = await apiClient.post<
        LoginSchema,
        { data: LoginResponseData }
      >('/auth/login', data);

      toastSuccess(feedback.data.message);
      const { access_token, refresh_token } = feedback.data.data.tokens;
      dispatch(
        actions.login(feedback.data.data.user, access_token, refresh_token),
      );
    } catch (error) {
      toastError(error);
    }
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 md:p-8 lg:p-12">
      {/* {JSON.stringify(state)} <br /> */}
      <MaxWidth className="w-full max-w-md">
        {JSON.stringify(state)}
        {is_authenticated ? (
          <div>
            <h1>Welcome {state.auth.user!.username}</h1>

            {should_refresh_token ? 'Token should be refreshed' : 'Token should not be refreshed'}
            <h1>Token expires in {seconds_until_token_expires} seconds</h1>
            <button
              onClick={() => dispatch(actions.logout())}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Login
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={onSubmit} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email_or_username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username/Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email or username"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Enter your password"
                              type={showPassword ? 'text' : 'password'}
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={toggleShowPassword}
                              aria-label={
                                showPassword ? 'Hide password' : 'Show password'
                              }
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-500" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-500" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <Link
                      to="/forgot-password"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-600 hover:underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </Card>
        )}
      </MaxWidth>
    </div>
  );
}
