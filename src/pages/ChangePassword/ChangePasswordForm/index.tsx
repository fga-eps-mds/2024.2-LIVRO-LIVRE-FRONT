import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/ui/button';
import { Field } from '../../../components/ui/field';
import { PasswordInput } from '../../../components/ui/password-input';
import { useLocation, useNavigate } from 'react-router';

interface FormValues {
  password: string;
  passwordConfirmation: string;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

 function ChangePasswordForm() {
  const query = useQuery();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const token = query.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>();

  const { changePassword } = useAuth();

  const onSubmit = handleSubmit(async (data: FormValues) => {
    if (!token) return;
    setLoading(true);
    await changePassword(data.password, token);
    setLoading(false);
    navigate('/login')
  })

  return (
    <form onSubmit={onSubmit}>
      <Stack gap={'40px'}>
        <Stack gap={'10px'}>
          <Field invalid={!!errors.password} errorText={errors.password?.message}>
            <PasswordInput
              size={'2xl'}
              placeholder={'Senha'}
              {...register('password', { required: "Campo obrigatório." })}
            />
          </Field>
          <Field invalid={!!errors.passwordConfirmation} errorText={errors.passwordConfirmation?.message}>
            <PasswordInput
              size={'2xl'}
              placeholder={'Confirmar senha'}
              {...register('passwordConfirmation', { required: "Campo obrigatório." })}
            />
          </Field>
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
          Alterar senha
        </Button>
      </Stack>
    </form>
  );
}

export default ChangePasswordForm
