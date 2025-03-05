import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { css } from 'styled-system/css';
import { Button } from '~/components/ui/button';
import { Field } from '~/components/ui/field';
import { Heading } from '~/components/ui/heading';
import { createListCollection, Select } from '~/components/ui/select';
import { useOrgProjectCategoriesQuery } from '~/lib/queries/org-project-category-query';
import { Icon } from '@iconify/react';
import {
  createOrgProjectSchema,
  type CreateOrgProjectType,
} from '~/lib/schema/create-org-project-schema';
import { useOrgProjectsQuery } from '~/lib/queries/org-projects-query';

export default function MockAddProject() {
  const rootProps: Field.RootProps = {};
  const {
    recordsQuery: { data: categories },
  } = useOrgProjectCategoriesQuery();
  const { createRecordMutation } = useOrgProjectsQuery();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<CreateOrgProjectType>({
    resolver: zodResolver(createOrgProjectSchema),
  });
  const collection = createListCollection({
    items: categories?.map((category) => ({
      label: category.name,
      value: category.id,
    })),
  });
  const navigate = useNavigate();

  const submitForm = handleSubmit(async (data) => {
    await createRecordMutation.mutateAsync(data, {
      onSuccess() {
        navigate('/mock-dashboard/projects');
      },
    });
  });
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bg: 'gray.100',
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
          Create project
        </Heading>
        <form
          onSubmit={submitForm}
          className={css({ display: 'flex', flexDirection: 'column', gap: 4 })}
        >
          <Field.Root
            {...rootProps}
            invalid={errors.name?.message ? true : false}
          >
            <Field.Label>Name</Field.Label>
            <Field.Input asChild>
              <Field.Input
                placeholder="e.g Data Collection Series 2025"
                {...register('name')}
              />
            </Field.Input>
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={errors.category_id?.message ? true : false}>
            <Select.Root
              collection={collection}
              positioning={{ sameWidth: true }}
            >
              <Select.Label>Category</Select.Label>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select a category" />
                  <Select.Indicator>
                    {/* <ChevronDownIcon /> */}
                  </Select.Indicator>
                </Select.Trigger>
              </Select.Control>
              <Select.Positioner>
                <Select.Content>
                  {collection.items.map((item) => (
                    <Select.Item key={item.value} item={item}>
                      <Select.ItemText>{item.label}</Select.ItemText>
                      <Select.ItemIndicator>✓</Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
              <Select.HiddenSelect />
            </Select.Root>
            {/* <Field.HelperText>Additional Info</Field.HelperText> */}
            <Field.ErrorText>{errors.category_id?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root
            {...rootProps}
            invalid={errors.description?.message ? true : false}
          >
            <Field.Label>Description</Field.Label>
            <Field.Input asChild>
              <Field.Textarea
                placeholder="e.g Project to collect data for the year 2025 for Business Intelligence"
                {...register('description')}
                resize={'none'}
                className={css({ resize: 'none', h: 32 })}
              />
            </Field.Input>

            <Field.ErrorText> {errors.description?.message}</Field.ErrorText>
          </Field.Root>

          <Button type="submit" className={css({ width: 'full' })}>
            Save Project
          </Button>
        </form>
      </div>
    </div>
  );
}
