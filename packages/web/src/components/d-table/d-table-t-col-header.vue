<script setup lang="ts" generic="T=any">
import type { Column } from '@tanstack/vue-table'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import type { Component } from 'vue'
import { computed } from 'vue'
interface DataTableFacetedFilter {
	column?: Column<T, any>
	title?: string
	options: {
		label: string
		value: string
		icon?: Component
	}[],
}

const props = defineProps<DataTableFacetedFilter>()

const facets = computed(() => props.column?.getFacetedUniqueValues())
const selectedValues = computed(() => new Set(props.column?.getFilterValue() as string[]))
</script>
<template>
  <cn-popover>
		<cn-popover-trigger as-child>
			<cn-button variant="outline" size="sm" class="h-8 border-dashed">
				<icon :name="'tdesign:plus'" class="mr-2 h-4 w-4" />
				{{ title }}
				<template v-if="selectedValues.size > 0">
					<cn-separator orientation="vertical" class="mx-2 h-4" />
					<cn-badge variant="secondary" class="rounded-sm px-1 font-normal lg:hidden">
						{{ selectedValues.size }}
					</cn-badge>
					<div class="hidden space-x-1 lg:flex">
						<cn-badge v-if="selectedValues.size > 2" variant="secondary"
							class="rounded-sm px-1 font-normal">
							{{ selectedValues.size }} selected
						</cn-badge>

						<template v-else>
							<div>

								<cn-badge v-for="option in options
									.filter((option) => selectedValues.has(option.value))" :key="option.value" variant="secondary"
									class="rounded-sm px-1 font-normal">
									{{ option.label }}
								</cn-badge>
							</div>
						</template>
					</div>
				</template>
			</cn-button>
		</cn-popover-trigger>
		<cn-popover-content class="w-[200px] p-0" align="start">
			<cn-command
				:filter-function="(list: DataTableFacetedFilter['options'], term) => list.filter(i => i.label.toLowerCase()?.includes(term))">
				<cn-command-input :placeholder="title" />
				<cn-command-list>
					<cn-command-empty>No results found.</cn-command-empty>
					<cn-command-group>
						<cn-command-item v-for="option in options" :key="option.value" :value="option" @select="(e) => {
							// console.log(e.detail.value)
							const isSelected = selectedValues.has(option.value)
							if (isSelected) {
								console.log('Removing');

								selectedValues.delete(option.value)
							}
							else {
								// console.log('Adding');
								selectedValues.add(option.value)
							}
							const filterValues = Array.from(selectedValues)
							console.log({ filterValues });

							column?.setFilterValue(
								filterValues.length ? filterValues : [],
							)
						}">
							<div :class="cn(
								'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
								selectedValues.has(option.value)
									? 'bg-primary text-primary-foreground'
									: 'opacity-50 [&_svg]:invisible',
							)">
								<icon :name="'ei:check'" :class="cn('h-4 w-4')" />
							</div>
							<component :is="option.icon" v-if="option.icon"
								class="mr-2 h-4 w-4 text-muted-foreground" />
							<span>{{ option.label }}</span>
							<span v-if="facets?.get(option.value)"
								class="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
								{{ facets.get(option.value) }}
							</span>
						</cn-command-item>
					</cn-command-group>

					<template v-if="selectedValues.size > 0">
						<cn-command-separator />
						<cn-command-group>
							<cn-command-item :value="{ label: 'Clear filters' }" class="justify-center text-center"
								@select="column?.setFilterValue(undefined)">
								Clear filters
							</cn-command-item>
						</cn-command-group>
					</template>
				</cn-command-list>
			</cn-command>
		</cn-popover-content>
	</cn-popover>
</template>


<style scoped></style>
