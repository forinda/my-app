import type { ApiRequestContext } from '../interfaces/controller';

export function populateUserMetadata(
  injectionType: 'create' | 'update' | 'delete'
) {
  return (context: ApiRequestContext) => {
    console.log(`[populateUserMetadata] injectionType: ${injectionType}`);

    const { user } = context;

    if (user) {
      context.body = {
        ...context.body,
        ...(injectionType === 'create'
          ? { created_by: user.id, updated_by: user.id }
          : injectionType === 'update'
            ? { updated_by: user.id }
            : injectionType === 'delete'
              ? { deleted_by: user.id }
              : {})
      };
      // console.log(`[populateUserMetadata] context.body: ${context.body}`);
    }

    return context;
  };
}
