import type {
    InsertOrganizationInterface,
    SelectOrganizationInterface,
} from "~/server/lib/db/pg/schema";
import type {
    CreateOrganizationResponseType,
    GetOrganizationsResponseType,
} from "~/types/response";

export async function useOrganizations() {
    const currentOrg = useState<SelectOrganizationInterface | null>(
        "state:current-organization",
        () => null,
    );
    const { data, error, status, refresh } = await useAsyncData(
        "state:organizations",
        async () => {
            const data = await $fetch<ArrayBuffer>("/api/v1/organizations", {
                method: "GET",
                responseType: "arrayBuffer",
            });
            return decodeArrayBuffer<GetOrganizationsResponseType>(data!).data;
        },
    );

    type CreateOptionParams = {
        onSuccess?: (organization: SelectOrganizationInterface) => void;
        onError?: (error: any) => void;
    };

    async function createOrganization(
        organization: Pick<InsertOrganizationInterface, "name" | "description">,
        { onSuccess, onError }: CreateOptionParams = {},
    ) {
        try {
            const feed = await $fetch<CreateOrganizationResponseType>(
                "/api/v1/organizations",
                {
                    method: "POST",
                    body: JSON.stringify(organization),
                },
            );
            await refresh();
            if (typeof onSuccess === "function") onSuccess!(feed.data);
        } catch (error) {
            if (typeof onError === "function") onError!(error);
        }
    }

    const setCurrentOrganization = (
        organization: SelectOrganizationInterface["uuid"],
    ) => {
        if (data.value?.length === 0) return;
        const org = data.value?.find((org) => org.uuid === organization);
        if (org) currentOrg.value = org;
    };

    watch(data, (newState) => {
        if (newState!.length > 0 && !currentOrg.value) {
            currentOrg.value = newState![0];
        }
    });

    return {
        data,
        error,
        status,
        refresh,
        create: createOrganization,
        currentOrg,
        setCurrentOrganization,
    };
}
