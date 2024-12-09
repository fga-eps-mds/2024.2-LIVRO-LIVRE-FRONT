import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Input, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/ui/button';
import { Field } from '../../../components/ui/field';

interface FormValues {
  email: string;
}

function RecoverPasswordForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>();

  const { recoverPassword } = useAuth();

  const onSubmit = handleSubmit(async (data: FormValues) => {
    setLoading(true);
    await recoverPassword(data.email);
    setLoading(false);
  })

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
          Solicitar nova senha
        </Button>
      </Stack>
    </form>
  );
}

export default RecoverPasswordForm
