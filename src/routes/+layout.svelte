<script>
	import modeobserver from './utils/modeobserver';
	import { onMount } from 'svelte';
	import Runatics from './utils/Runatics.svelte';
	import SignIn from './authentication/sign-in.svelte';
	export let data;
	// const analyticsId = data.ANALYTICS_ID
	const analyticsId = '';
	import { isLogin } from '../shared.svelte.js';

	onMount(modeobserver);
</script>

<!-- <Runatics {analyticsId} /> -->
{#if !$isLogin}
	<SignIn />
{:else}
	<slot />
{/if}|
