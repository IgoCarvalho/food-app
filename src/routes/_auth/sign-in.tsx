import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { pageTitleTemplate } from '@/lib/page-title-template';

export const Route = createFileRoute('/_auth/sign-in')({
  component: SignInPage,
});

const signInFormSchema = z.object({
  email: z.email(),
});

type SignInFormData = z.infer<typeof signInFormSchema>;

function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
  });

  async function handleSignIn(data: SignInFormData) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success('Enviamos um link de autenticação para seu e-mail.', {
      action: {
        label: 'Reenviar',
        onClick: () => handleSignIn(data),
      },
    });

    console.log({ data });
  }

  return (
    <>
      <title>{pageTitleTemplate('Login')}</title>

      <div className="p-8">
        <div className="flex w-[360px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="font-semibold text-2xl tracking-tight">
              Acessar painel
            </h1>

            <p className="text-muted-foreground text-sm">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
          </div>

          <form className="" onSubmit={handleSubmit(handleSignIn)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Seu e-mail</FieldLabel>
                <Input
                  id="email"
                  placeholder="seu@email.com"
                  required
                  type="email"
                  {...register('email')}
                />
              </Field>

              <Field orientation="horizontal">
                <Button
                  className="w-full"
                  disabled={isSubmitting}
                  type="submit"
                >
                  Acessar painel
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </div>
      </div>
    </>
  );
}
