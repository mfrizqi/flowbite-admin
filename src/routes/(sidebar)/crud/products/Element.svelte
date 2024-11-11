<script lang="ts">
	import { Button, CloseButton, Heading, Input, Label, Select, Textarea } from 'flowbite-svelte';
	import { CloseOutline } from 'flowbite-svelte-icons';
	import * as API_ELEMENT from '$lib/elements.js';
	import { alert } from '../../../../shared.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let hidden: boolean = true; // modal control
	export let fetching: boolean = false;
	export let itemData: any;
	let element: any = {
		name: '',
		atomic_number: 0,
		symbol: '',
		units: 0,
		status: false
	};

	let isAdd = Object.keys(itemData).length ? false : true;

	function init(form: HTMLFormElement) {
		if (Object.keys(itemData).length) {
			element.name = itemData?.chemical?.name;
			element.atomic_number = itemData?.chemical?.atomicNumber;
			element.symbol = itemData?.chemical?.symbol;
			element.units = Math.ceil(itemData?.amount * 0.001);
			element.status = itemData?.status;

			for (const key in element) {
				const el = form.elements.namedItem(key);
				if (el) {
					console.log(el);
					if (el instanceof HTMLInputElement) {
						el.value = element[key];
						console.log('HTMLInputElement: ', el.value + '=' + element[key]);
					} else if (el instanceof HTMLTextAreaElement) {
						el.value = element[key];
						console.log('HTMLTextAreaElement: ', el.value + '=' + element[key]);
					} else if (el instanceof HTMLSelectElement) {
						el.value = element[key];
						console.log('HTMLSelectElement: ', el.value + '=' + element[key]);
					}
				}
			}
		}
	}

	const submitElement = async () => {
		const item: any = {};
		const req: any = {
			chemical: {
				symbol: '',
				name: '',
				atomicNumber: 0
			},
			amount: 0,
			status: false
		};
		const form = document.getElementById('element_form');

		const formLength = document.getElementById('element_form')?.length;
		for (let i = 0; i < formLength; i++) {
			const key = form[i]?.name;
			if (key?.length > 0) {
				if (key === 'units') {
					item['amount'] = Math.ceil(parseInt(form[i].value) * 0.001);
				} else if (key === 'atomic_number') {
					item[key] = parseInt(form[i].value);
				} else {
					item[key] = form[i].value;
				}
			}
		}

		req.chemical.symbol = item.symbol;
		req.chemical.name = item.name;
		req.chemical.atomicNumber = item.atomic_number;
		req.amount = item.amount;
		req.status = item.status;

		if (isAdd) {
			const res: any = await API_ELEMENT.add(req);
			const body = await res.json();
			if (body) {
				hidden = true;

				alert.set({
					show: true,
					color: 'green',
					message: '',
					status: 'Success add ' + body?.chemical?.name,
					timer: 3000
				});
				dispatch('afterFetch');
			}
		} else {
			const res: any = await API_ELEMENT.edit(req, itemData.id);
			const body = await res.json();

			if (body) {
				hidden = true;

				alert.set({
					show: true,
					color: 'green',
					message: '',
					status: 'Success Edit to ' + body?.chemical?.name,
					timer: 3000
				});
				dispatch('afterFetch');
			}
		}
	};

	const edit_element = async () => {};
</script>

<Heading tag="h5" class="mb-6 text-sm font-semibold uppercase">
	{#if !isAdd}
		Edit element
	{:else}
		Add new element
	{/if}
</Heading>
<CloseButton
	on:click={() => (hidden = true)}
	class="absolute right-2.5 top-2.5 text-gray-400 hover:text-black dark:text-white"
/>

<form id="element_form" action="#" use:init>
	<div class="space-y-4">
		<Label class="space-y-2">
			<span>Element Name</span>
			<Input
				name="name"
				class="border font-normal outline-none"
				placeholder="Type element name (Hydrogen)"
				required
			/>
		</Label>

		<Label class="space-y-2">
			<span>Symbol</span>
			<Input name="symbol" class="border font-normal outline-none" placeholder="H" required />
		</Label>
		<Label class="space-y-2">
			<span>Atomic Number</span>
			<Input
				name="atomic_number"
				class="border font-normal outline-none"
				placeholder="1"
				type="number"
				required
			/>
		</Label>
		<Label class="space-y-2">
			<span>Units</span>
			<Input
				name="units"
				class="border font-normal outline-none"
				placeholder="1"
				type="number"
				required
			/>
		</Label>
		<Label class="space-y-2">
			<span>Status</span>
			<Select name="status" class="border-gray-300 font-normal outline-none">
				<option value="false">In Progress</option>
				<option value="true">Complete</option>
			</Select>
		</Label>

		<div class="bottom-0 left-0 flex w-full justify-center space-x-4 pb-4 md:absolute md:px-4">
			{#if !isAdd}
				<Button type="submit" on:click={submitElement} class="w-full">Edit element</Button>
			{:else}
				<Button on:click={submitElement} class="w-full">Add element</Button>
			{/if}
			<Button color="alternative" class="w-full" on:click={() => (hidden = true)}>
				<CloseOutline />
				Cancel
			</Button>
		</div>
	</div>
</form>
