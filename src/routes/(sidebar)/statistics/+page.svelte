<script lang="ts">
	import Statistics from '../../utils/dashboard/Statistics.svelte';
	import MetaTag from '../../utils/MetaTag.svelte';
	import Footer from '../Footer.svelte';
	export let data;
	let fetchData: any;

	const path: string = '/statistics';
	const description: string = 'Admin Dashboard example using Flowbite Svelte';
	const title: string = 'Flowbite Svelte Admin Dashboard - Statistics';
	const subtitle: string = 'Admin Dashboard';
	
	</script>

<MetaTag {path} {description} {title} {subtitle} />

<main class="p-4">
	<Statistics {data} />
</main>
<Footer />
