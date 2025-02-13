import type { SelectOrganizationInterface } from "~/server/lib/db/pg/schema";
import type { FetchOrganizationMembersResponseType } from "~/types/response";

export async function useOrganizationMembers() {
    const organization = useState<SelectOrganizationInterface["uuid"] | null>(
        "state:current-member:org",
        () => null,
    );

    const setCurrentOrganization = (
        id: SelectOrganizationInterface["uuid"],
    ) => {
        organization.value = id;
    };

    const { data, error, status, refresh } = await useAsyncData(
        "state:organizations:members",
        async () => {
            const data = await $fetch<ArrayBuffer>(
                `/api/v1/organizations/${organization.value}/members`,
                {
                    method: "GET",
                    responseType: "arrayBuffer",
                },
            );
            console.log("data", data);

            return decodeArrayBuffer<FetchOrganizationMembersResponseType>(
                data!,
            ).data;
        },
    );

    return {
        data,
        error,
        status,
        refresh,
        setCurrentOrganization,
        organization,
    };
}
