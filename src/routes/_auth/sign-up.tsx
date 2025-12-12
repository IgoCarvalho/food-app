import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { pageTitleTemplate } from '@/lib/page-title-template';

export const Route = createFileRoute('/_auth/sign-up')({
  component: SignUpPage,
});

const signUpFormSchema = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  email: z.email(),
  phone: z.string(),
});

type SignUpFormData = z.infer<typeof signUpFormSchema>;

function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  });

  const navigate = Route.useNavigate();

  async function handleSignUp(data: SignUpFormData) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success('Restaurante cadastrado com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => navigate({ to: '/sign-in' }),
        },
      });

      console.log({ data });
    } catch (error) {
      console.error(error);

      toast.error('Erro ao cadastrar restaurante.');
    }
  }

  return (
    <>
      <title>{pageTitleTemplate('Cadastro')}</title>

      <Button asChild className="absolute top-8 right-8" variant={'link'}>
        <Link to="/sign-in">Fazer login</Link>
      </Button>

      <div className="p-8">
        <div className="flex w-[360px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="font-semibold text-2xl tracking-tight">
              Criar conta grátis
            </h1>

            <p className="text-muted-foreground text-sm">
              Seja um parceiro e acompanhe suas vendas!
            </p>
          </div>

          <form className="" onSubmit={handleSubmit(handleSignUp)}>
            <FieldGroup>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="restaurantName">
                    Nome do estabelecimento
                  </FieldLabel>
                  <Input
                    id="restaurantName"
                    required
                    type="text"
                    {...register('restaurantName')}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="managerName">Seu nome</FieldLabel>
                  <Input
                    id="managerName"
                    required
                    type="text"
                    {...register('managerName')}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Seu e-mail</FieldLabel>
                  <Input
                    id="email"
                    required
                    type="email"
                    {...register('email')}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="phone">Seu celular</FieldLabel>
                  <Input
                    id="phone"
                    required
                    type="tel"
                    {...register('phone')}
                  />
                </Field>
              </FieldGroup>

              <Field className="gap-4">
                <Button
                  className="w-full"
                  disabled={isSubmitting}
                  type="submit"
                >
                  Finalizar cadastro
                </Button>

                <FieldDescription className="px-6 text-center">
                  Ao continuar, voce concorda com os nossos{' '}
                  <a href="#">termos de serviço</a> e{' '}
                  <a href="#">políticas de privacidade</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </div>
      </div>
    </>
  );
}
