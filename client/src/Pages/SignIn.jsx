import { TypographyH1 } from '@/Components/typography/H1';
import { TypographyMuted } from '@/Components/typography/muted';
import { Button } from '@/Components/ui/button';
import CustomCard from '@/Components/ui/Custom/CustomCard';
import CustomFormField from '@/Components/ui/Custom/CustomFormField';
import CustomFormWrapper from '@/Components/ui/Custom/CustomFormWrapper';
import Wrapper from '@/Components/ui/Custom/wrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email({ message: "That's not an email" }),
  password: z.string().min(8, { message: 'Too short' }),
});

function SignIn() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { isSubmitting } = form.formState;

  const mutation = useMutation(
    async (data) =>
      await axios.post('/api/v1/auth/sign-in', data, {
        withCredentials: true,
      }),
    {
      onSuccess: (data) => {
        console.log('Login successful:', data.data.user.email);
        Cookies.set('user', data.data.user.email, {
          secure: true,
          sameSite: 'None',
        });
        Cookies.set('role', data.data.user.role, {
          secure: true,
          sameSite: 'None',
        });
        navigate('/');
      },
      onError: (error) => {
        console.error('Login error:', error.message);
      },
    },
  );

  async function onSubmit(data) {
    console.log(data);
    mutation.mutate(data);
  }

  return (
    <Wrapper>
      <CustomCard
        title={<TypographyH1 text="Sign In" />}
        description="Login to your account"
        body={
          <CustomFormWrapper
            form={form}
            onSubmit={onSubmit}
            fields={
              <>
                <CustomFormField
                  control={form.control}
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="Email address"
                />
                <CustomFormField
                  control={form.control}
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="********"
                  password
                />
              </>
            }
            button={
              <Button
                type="submit"
                className="w-full bg-extend-secondary hover:bg-extend-hoverSecondary"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Loading...' : 'Sign In'}
              </Button>
            }
          />
        }
        footer={
          <div className="flex justify-center">
            <TypographyMuted text="Don't have an account, yet?" />
            &nbsp;
            <Link
              to="/sign-up"
              className="underline"
            >
              <TypographyMuted text="Sign Up" />
            </Link>
          </div>
        }
      />
    </Wrapper>
  );
}

export default SignIn;
