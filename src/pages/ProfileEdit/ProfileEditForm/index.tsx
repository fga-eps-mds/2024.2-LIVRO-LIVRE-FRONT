import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Input, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { PasswordInput } from '../../../components/ui/password-input';
import { Button } from '../../../components/ui/button';
import useApi from '../../../hooks/useApi';
import { Field } from '../../../components/ui/field';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  oldPassword?: string;
  newPassword?: string;
  newPasswordConfirmation?: string;
}

function SignUpForm() {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>();

  const { editProfile, token } = useAuth();
  const { getProfile } = useApi();

  const getUserData = async () => {
    if (!token) return;
    const { data } = await getProfile(token);
    setValue('firstName', data.firstName);
    setValue('lastName', data.lastName);
    setValue('email', data.email);
    setValue('phone', data.phone);
    setUserId(data.id)
  }

  useEffect(() => {
    getUserData();
  }, [])

  const onSubmit = handleSubmit(async (data: FormValues) => {
    setLoading(true);
    await editProfile(userId, {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      newPassword: data.newPassword,
      oldPassword: data.oldPassword,
    });
    setLoading(false);
  })

  return (
    <form onSubmit={onSubmit}>
      <Stack gap={'40px'}>
        <Stack gap={'10px'}>
          <Field invalid={!!errors.firstName} errorText={errors.firstName?.message}>
            <Input
              size={'2xl'}
              placeholder={'Nome'}
              {...register('firstName', { required: "Campo obrigatório." })}
            />
          </Field>
          <Field invalid={!!errors.lastName} errorText={errors.lastName?.message}>
            <Input
              size={'2xl'}
              placeholder={'Sobrenome'}
              {...register('lastName', { required: "Campo obrigatório." })}
            />
          </Field>
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
          <Field invalid={!!errors.phone} errorText={errors.phone?.message}>
            <Input
              size={'2xl'}
              placeholder={'Telefone'}
              {...register('phone', {
                required: "Campo obrigatório.",
                pattern: {
                  value: /^\d{11}$/,
                  message: "Telefone inválido."
                }
              })}
            />
          </Field>
          <PasswordInput
            size={'2xl'}
            placeholder={'Senha atual'}
            {...register('oldPassword', { required: false })}
          />
          <PasswordInput
            size={'2xl'}
            placeholder={'Senha nova'}
            {...register('newPassword', { required: watch('oldPassword') !== '' })}
          />
          <Field invalid={!!errors.newPasswordConfirmation} errorText={errors.newPasswordConfirmation?.message}>
            <PasswordInput
              size={'2xl'}
              placeholder={'Confirmar senha nova'}
              {...register('newPasswordConfirmation', {
                required: watch('newPassword') !== '',
                validate: value => value === watch('newPassword') || 'As senhas não coincidem.',
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
          editar
        </Button>
      </Stack>
    </form>
  );
}

export default SignUpForm
