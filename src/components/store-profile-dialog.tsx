import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { getManagedRestaurantQuery } from '@/api/get-managed-restaurant';
import { updateProfile } from '@/api/update-profile';
import { Button } from './ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Field, FieldGroup, FieldLabel } from './ui/field';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
});

type StoreProfileSchema = z.infer<typeof storeProfileSchema>;

export function StoreProfileDialog() {
  const queryClient = useQueryClient();

  const { data: managedRestaurant } = useQuery(getManagedRestaurantQuery());

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },
  });

  const { mutateAsync: updateStoreProfile } = useMutation({
    mutationFn: updateProfile,
    onSuccess(_, { name, description }) {
      const managedRestaurantQueryKey = getManagedRestaurantQuery().queryKey;

      const cachedManagedRestaurantData = queryClient.getQueryData(
        managedRestaurantQueryKey
      );

      if (cachedManagedRestaurantData) {
        queryClient.setQueryData(managedRestaurantQueryKey, {
          ...cachedManagedRestaurantData,
          name,
          description,
        });
      }
    },
  });

  async function handleUpdateProfile(data: StoreProfileSchema) {
    try {
      await updateStoreProfile({
        name: data.name,
        description: data.description,
      });

      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error({ error });
      toast.error('Erro ao atualizar perfil, tente novamente.');
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao cliente
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <FieldGroup>
          <FieldGroup>
            <Field className="grid grid-cols-4 items-center gap-4">
              <FieldLabel htmlFor="name">Nome</FieldLabel>
              <Input className="col-span-3" id="name" {...register('name')} />
            </Field>
            <Field className="grid grid-cols-4 items-center gap-4">
              <FieldLabel htmlFor="description">Descrição</FieldLabel>
              <Textarea
                className="col-span-3"
                id="description"
                {...register('description')}
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Cancelar
              </Button>
            </DialogClose>
            <Button disabled={isSubmitting} type="submit" variant="success">
              {isSubmitting && <Loader2Icon className="size-5 animate-spin" />}
              Salvar
            </Button>
          </DialogFooter>
        </FieldGroup>
      </form>
    </DialogContent>
  );
}
