import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import { Input, Stack, Link as ChakraLink, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { PasswordInput } from '../../../components/ui/password-input';
import { Button } from '../../../components/ui/button';
import { Field } from '../../../components/ui/field';

interface FormValues {
  email: string;
  password: string;
}

function SignInForm() {
  const [loading, setLoading] = useState(false);
  const navigate  = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>();

  const { signIn, isAuthenticated } = useAuth();

  const onSubmit = handleSubmit(async (data: FormValues) => {
    setLoading(true);
    await signIn({
      email: data.email,
      password: data.password,
    });
    setLoading(false);
  })

  useEffect(() => {
    if (!isAuthenticated) return;
    navigate('/inicio');
  }, [isAuthenticated])

  return (
    <form onSubmit={onSubmit}>
      <Stack gap={'40px'}>
        <Stack gap={'10px'}>
          <Field invalid={!!errors.email} errorText={errors.email?.message}>
            <Input
              size={'2xl'}
              placeholder={'E-mail'}
              {...register('email', {
                required: "Campo obrigatório.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "E-mail inválido."
                }
              })}
            />
          </Field>
          <Field invalid={!!errors.password} errorText={errors.password?.message}>
            <PasswordInput
              size={'2xl'}
              placeholder={'Senha'}
              {...register('password', { required: "Campo obrigatório." })}
            />
          </Field>
          <Stack gap={'25px'} width={'100%'}>
            <Text
              textAlign={'center'}
              color={'blue.100'}
            >
              Não lembra sua senha? <ChakraLink color={'green.100'}><Link to='/recuperar-senha'>Recupere-a aqui</Link></ChakraLink>
            </Text>
          </Stack>
        </Stack>
        <Button
          loading={loading}
          type="submit"
          width={'100%'}
          size={'2xl'}
          bg={'green.100'}
          fontWeight={'semibold'}
          disabled={!isValid}
        >
          Entrar
        </Button>
      </Stack>
    </form>
  );
}

export default SignInForm
