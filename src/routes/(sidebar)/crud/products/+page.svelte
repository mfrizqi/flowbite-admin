<script lang="ts">
	import {
		Breadcrumb,
		BreadcrumbItem,
		Button,
		Checkbox,
		Drawer,
		Heading,
		Input,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Toolbar,
		ToolbarButton
	} from 'flowbite-svelte';
	import {
		CogSolid,
		DotsVerticalOutline,
		EditOutline,
		ExclamationCircleSolid,
		InfoCircleSolid,
		TrashBinSolid
	} from 'flowbite-svelte-icons';
	import type { ComponentType } from 'svelte';
	import { sineIn } from 'svelte/easing';
	import MetaTag from '../../../utils/MetaTag.svelte';
	import Delete from './Delete.svelte';
	import StatisticsBadge from '../../../utils/dashboard/StatisticsBadge.svelte';
	import Element from './Element.svelte';

	import * as API_ELEMENT from '$lib/elements.js';

	import { Alert } from 'flowbite-svelte';
	import { alert } from '../../../../shared.svelte';
	import { load } from './+page';

	export let data;

	let hidden: boolean = true; // modal control
	let drawerComponent: ComponentType = Element; // drawer component
	let itemData = {};

	const toggle = (component: ComponentType, item: any = {}) => {
		drawerComponent = component;
		itemData = item;
		hidden = !hidden;
	};

	let timer: any = null;

	const handleFetch: any = async (event) => {
		// event.detail => `new CustomEvent()`를 통해 이벤트를 초기화 할 때 전달 된 모든 데이터를 반환
		console.log(event);

		if (timer) {
			window.clearTimeout(timer);
		} else {
			timer = setTimeout(() => {
				alert.set({
					show: false,
					color: 'green',
					message: '',
					status: '',
					timer: 3000
				});
			}, $alert.timer);
		}
		let chem_list = await API_ELEMENT.get()
		console.log('chem_res:', chem_list);
		console.log('data: ',data)
		data.chem_list = JSON.parse(JSON.stringify(chem_list));
		// data.chem_list = await JSON.parse(JSON.stringify(API_ELEMENT.get()))
	};

	const path: string = '/crud/products';
	const description: string = 'CRUD Elements example - Flowbite Svelte Admin Dashboard';
	const title: string = 'Flowbite Svelte Admin Dashboard - CRUD Elements';
	const subtitle: string = 'CRUD Elements';
	let transitionParams = {
		x: 320,
		duration: 200,
		easing: sineIn
	};

	let dark = false;

	const headers = ['Name', 'Units', 'Status', ' ', ' '];
</script>

<MetaTag {path} {description} {title} {subtitle} />

<main class="relative h-full w-full overflow-y-auto bg-white dark:bg-gray-800">
	<div class="p-4">
		<Breadcrumb class="mb-5">
			<BreadcrumbItem home>Home</BreadcrumbItem>
			<BreadcrumbItem href="/crud/products">Manage</BreadcrumbItem>
			<BreadcrumbItem>Elements</BreadcrumbItem>
		</Breadcrumb>
		<Heading tag="h1" class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
			All Registered Element
		</Heading>

		<Toolbar embedded class="w-full py-4 text-gray-500 dark:text-gray-400">
			<!-- <Input placeholder="Search for elements" class="me-6 w-80 border xl:w-96" />
			<ToolbarButton
				color="dark"
				class="m-0 rounded p-1 hover:bg-gray-100 focus:ring-0 dark:hover:bg-gray-700"
			>
				<CogSolid size="lg" />
			</ToolbarButton>
			<ToolbarButton
				color="dark"
				class="m-0 rounded p-1 hover:bg-gray-100 focus:ring-0 dark:hover:bg-gray-700"
			>
				<TrashBinSolid size="lg" />
			</ToolbarButton>
			<ToolbarButton
				color="dark"
				class="m-0 rounded p-1 hover:bg-gray-100 focus:ring-0 dark:hover:bg-gray-700"
			>
				<ExclamationCircleSolid size="lg" />
			</ToolbarButton>
			<ToolbarButton
				color="dark"
				class="m-0 rounded p-1 hover:bg-gray-100 focus:ring-0 dark:hover:bg-gray-700"
			>
				<DotsVerticalOutline size="lg" />
			</ToolbarButton> -->

			<div class="space-x-2">
				<Button class="whitespace-nowrap" on:click={() => toggle(Element)}>Add new element</Button>
			</div>
		</Toolbar>
	</div>

	{#if $alert.show}
		<Alert color="green" class="mb-4">
			<InfoCircleSolid slot="icon" class="h-5 w-5" />
			<span class="font-medium">{$alert.status}</span>
		</Alert>
	{/if}

	<Table>
		<TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
			<TableHeadCell class="w-4 p-4"><Checkbox /></TableHeadCell>
			{#each headers as title}
				<TableHeadCell class="ps-4 font-normal">{title}</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody>
			{#each data?.chem_list as element}
				<TableBodyRow class="text-base">
					<TableBodyCell class="w-4 p-4"><Checkbox /></TableBodyCell>
					<TableBodyCell class="flex items-center space-x-6 whitespace-nowrap p-4">
						<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
							<div class="text-base font-semibold text-gray-900 dark:text-white">
								{element?.chemical.name}
							</div>
							<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
								<b>{element?.chemical.symbol}</b> - <b>{element?.chemical.atomicNumber}</b>
							</div>
						</div>
					</TableBodyCell>
					<TableBodyCell class="p-4">{Math.ceil(element.amount * 0.001)}gr</TableBodyCell>
					<TableBodyCell class="p-4">
						<StatisticsBadge state={element?.status} {dark} />
					</TableBodyCell>
					<TableBodyCell colspan="2" class="space-x-2 text-right">
						<Button size="sm" class="gap-2 px-3" on:click={() => toggle(Element, element)}>
							<EditOutline size="sm" /> Update
						</Button>
						<Button
							color="red"
							size="sm"
							class="gap-2 px-3"
							on:click={() => toggle(Delete, element)}
						>
							<TrashBinSolid size="sm" /> Delete
						</Button>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</main>

<!-- <Drawer placement="right" transitionType="fly" {transitionParams} bind:hidden on:afterFetch{handleFetch}>
	<svelte:component this={drawerComponent} bind:hidden {itemData} on:afterFetch{handleFetch} />
</Drawer> -->

<Drawer placement="right" transitionType="fly" {transitionParams} bind:hidden>
	<svelte:component this={drawerComponent} bind:hidden {itemData} on:afterFetch={handleFetch} />
	<!-- <Delete {itemData} bind:hidden on:afterFetch={handleFetch} /> -->
</Drawer>
