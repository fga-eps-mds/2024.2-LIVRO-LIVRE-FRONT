import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router';
import { Input, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { PasswordInput } from '../../../components/ui/password-input';
import { Button } from '../../../components/ui/button';
import { Field } from '../../../components/ui/field';
import { formatPhoneNumber } from './phoneformat';

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
    formState: { errors, isValid },
    watch,
    trigger,
  } = useForm<FormValues>();

  const { signUp, isAuthenticated } = useAuth();

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
    if (!isAuthenticated) return;
    navigate('/inicio');
  }, [isAuthenticated])

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
              onChange={(e) => {
                register('email').onChange(e); 
                trigger('email'); 
              }}
            />
          </Field>
           <Input
            size={'2xl'}
            placeholder={'(DDD) Telefone'}
            {...register('phone', {
             required: "Campo obrigatório.",
              validate: (value) => {
              const onlyNumbers = value.replace(/\D/g, '');
              return onlyNumbers.length === 11 || "Telefone inválido.";
              }
            })}
            onChange={(e) => {
                const formatted = formatPhoneNumber(e.target.value); 
                e.target.value = formatted; 
                register('phone').onChange(e); 
                trigger('phone'); 
            }}
          />
          <Field invalid={!!errors.password} errorText={errors.password?.message}>
            <PasswordInput
              size={'2xl'}
              placeholder={'Senha'}
              {...register('password', { 
                required: "Campo obrigatório.",
                validate: (value) => {
                  const minLength = 8;
                  const hasUpperCase = /[A-Z]/.test(value);
                  const hasNumber = /[0-9]/.test(value);
                  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
          
                  if (value.length < minLength) {
                    return "A senha deve ter pelo menos 8 caracteres.";
                  }
                  if (!hasUpperCase) {
                    return "A senha deve conter pelo menos uma letra maiúscula.";
                  }
                  if (!hasNumber) {
                    return "A senha deve conter pelo menos um número.";
                  }
                  if (!hasSpecialChar) {
                    return "A senha deve conter pelo menos um caractere especial.";
                  }
                  return true;
                },
               })}
               onChange={(e) => {
                register('password').onChange(e);
                trigger('password');
              }}
            />
          </Field>
          <Field invalid={!!errors.passwordConfirmation} errorText={errors.passwordConfirmation?.message}>
          <PasswordInput
            size={'2xl'}
              placeholder={'Confirmar senha'}
              {...register('passwordConfirmation', {
                required: "Campo obrigatório.",
                validate: (value) =>
                value === watch('password') || "As senhas não correspondem."
              })}
              onChange={(e) => {
                register('passwordConfirmation').onChange(e);
                trigger('passwordConfirmation'); 
              }}
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
          cadastrar
        </Button>
      </Stack>
    </form>
  );
}

export default SignUpForm
