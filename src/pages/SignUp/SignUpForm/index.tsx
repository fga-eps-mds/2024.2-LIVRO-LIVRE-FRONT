import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router';
import { Input, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { PasswordInput } from '../../../components/ui/password-input';
import { Button } from '../../../components/ui/button';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
}

function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const navigate  = useNavigate();

  const {
    register,
    handleSubmit,
  } = useForm<FormValues>();

  const { signUp, token } = useAuth();

  const onSubmit = handleSubmit(async (data: FormValues) => {
    setLoading(true);
    await signUp({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      password: data.password,
    });
    setLoading(false);
  })

  useEffect(() => {
    if (!token) return;
    navigate('/');
  }, [token])

  return (
    <form onSubmit={onSubmit}>
      <Stack gap={'40px'}>
        <Stack gap={'10px'}>
          <Input
            size={'2xl'}
            placeholder={'Nome'}
            {...register('firstName', { required: "Campo obrigatório." })}
          />
          <Input
            size={'2xl'}
            placeholder={'Sobrenome'}
            {...register('lastName', { required: "Campo obrigatório." })}
          />
          <Input
            size={'2xl'}
            placeholder={'E-mail'}
            {...register('email', { required: "Campo obrigatório." })}
          />
          <Input
            size={'2xl'}
            placeholder={'Telefone'}
            {...register('phone', { required: "Campo obrigatório." })}
          />
          <PasswordInput
            size={'2xl'}
            placeholder={'Senha'}
            {...register('password', { required: "Campo obrigatório." })}
          />
          <PasswordInput
            size={'2xl'}
            placeholder={'Confirmar Senha'}
            {...register('passwordConfirmation', { required: "Campo obrigatório." })}
          />
        </Stack>
        <Button
          loading={loading}
          type="submit"
          width={'100%'}
          size={'2xl'}
          bg={'green.100'}
          fontWeight={'semibold'}
          >
          cadastrar
        </Button>
      </Stack>
    </form>
  );
}

export default SignUpForm
