<script lang="ts">
	import { Button, CloseButton, Heading } from 'flowbite-svelte';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';
	import * as API_ELEMENT from '$lib/elements.js';
	import { alert } from '../../../../shared.svelte';

	const dispatch = createEventDispatcher()

	export let hidden: boolean = true; // modal control
	export let fetching: boolean = false;
	export let itemData: any = {};

	const deleteElement = async (item) => {
		let res = await API_ELEMENT.remove(item.id);
		console.log(res);
		if (res.status === 200) {
			hidden = true;

			alert.set({
				show: true,
				color: 'green',
				message: '',
				status: 'Success delete ' + item.chemical.name,
				timer: 1000
			});
			fetching = true
			dispatch('afterFetch');
		}
	};
</script>

<Heading tag="h5" class="mb-6 text-sm font-semibold uppercase"
	>Delete element <b>{itemData?.chemical?.name}</b></Heading
>
<CloseButton
	on:click={() => (hidden = true)}
	class="absolute right-2.5 top-2.5 text-gray-400 hover:text-black dark:text-white"
/>

<ExclamationCircleOutline class="mb-4 mt-8 h-10 w-10 text-red-600" />

<h3 class="mb-6 text-lg text-gray-500 dark:text-gray-400">
	Are you sure you want to delete this element? ({itemData?.chemical?.name})
</h3>

<Button color="red" class="mr-2" on:click={deleteElement(itemData)}>Yes, I'm sure</Button>
<Button color="alternative" on:click={() => (hidden = true)}>No, cancel</Button>
