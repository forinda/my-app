import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { css } from 'styled-system/css';
import { Button } from '~/components/ui/button';
import { Field } from '~/components/ui/field';
import { Heading } from '~/components/ui/heading';
import { useDepartmentQuery } from '~/lib/queries/departments-query';
import {
  createDepartmentSchema,
  type CreateDepartmentType,
} from '~/lib/schema/create-department-schema';

export default function MockAddDesignation() {
  const rootProps: Field.RootProps = {};
  const { createRecordMutation } = useDepartmentQuery();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<CreateDepartmentType>({
    resolver: zodResolver(createDepartmentSchema),
  });
  const navigate = useNavigate();
  const submitForm = handleSubmit(async (data) => {
    await createRecordMutation.mutateAsync(data, {
      onSuccess: () => {
        navigate('/mock-dashboard/departments');
      },
    });
  });
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bg: 'gray.1',
      })}
    >
      <div
        className={css({
          width: 'full',

          bg: 'white',
          padding: 6,
          borderRadius: 'md',
        })}
      >
        <Heading
          as="h2"
          className={css({
            fontSize: '1.5rem',
            fontWeight: 'semibold',
            marginBottom: 4,
          })}
        >
          Create Department
        </Heading>
        <form
          onSubmit={submitForm}
          className={css({ display: 'flex', flexDirection: 'column', gap: 4 })}
        >
          <Field.Root
            {...rootProps}
            invalid={errors.name?.message ? true : false}
          >
            <Field.Label>Name of Designation</Field.Label>
            <Field.Input asChild>
              <Field.Input placeholder="e.g ICT" {...register('name')} />
            </Field.Input>
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root
            {...rootProps}
            invalid={errors.description?.message ? true : false}
          >
            <Field.Label>Description</Field.Label>
            <Field.Input asChild>
              <Field.Textarea
                placeholder="e.g Information and Communication Technology"
                {...register('description')}
                resize={'none'}
                className={css({ resize: 'none', h: 32 })}
              />
            </Field.Input>

            <Field.ErrorText> {errors.description?.message}</Field.ErrorText>
          </Field.Root>

          <Button type="submit" className={css({ width: 'full' })}>
            Save Department
          </Button>
        </form>
      </div>
    </div>
  );
}
