<script lang="ts">
	import thickbars from '../graphs/thickbars';
	import ChartWidget from '../widgets/ChartWidget.svelte';
	import { Card, Chart } from 'flowbite-svelte';
	import type { PageData } from '../../(sidebar)/$types';
	import Stats from './Stats.svelte';
	import users from '../graphs/users';
	import DarkChart from '../widgets/DarkChart.svelte';
	import { onMount } from 'svelte';
	import getChartOptions from '../../(sidebar)/statistics/chart_options';
	import ActivityList from './ActivityList.svelte';
	import Change from './Change.svelte';
	import Chat from './Chat.svelte';
	import DesktopPc from './DesktopPc.svelte';
	import Insights from './Insights.svelte';
	import Traffic from './Traffic.svelte';
	import Elements from './Elements.svelte';
	import { derived } from 'svelte/store';

	export let data: PageData;

	let chartOptions = getChartOptions(false);
	chartOptions.series = data.series;
	if (chartOptions.chart.type) {
		chartOptions.chart.type = 'bar';

    const topSeven = JSON.parse(JSON.stringify(data?.chem_list)).splice(0,7)
    const sevenNames = topSeven.map((el:any)=>{
      return el.chemical.name
    });

    console.log('topSeven: ', topSeven)
    console.log('sevenNames: ', sevenNames)

		chartOptions.xaxis.categories = sevenNames
	}

	let dark = false;

	function handler(ev: Event) {
		if ('detail' in ev && typeof ev.detail === 'boolean') {
			chartOptions = getChartOptions(ev.detail);
			chartOptions.series = data.series;
			dark = !!ev.detail;
		}
	}

	onMount(() => {
		console.log(data);
		document.addEventListener('dark', handler);
		return () => document.removeEventListener('dark', handler);
	});
</script>

<div class="mt-px space-y-4">
	<div class="grid gap-4">
		<div class="text-xl font-medium text-slate-600">Elements Statistics</div>
		<ChartWidget {chartOptions} title={data.total_chem} subtitle="Accumulation element extractions this week" />
	</div>
	<Elements {dark} fetchData={data?.chem_list} />
</div>
