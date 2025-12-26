<h1>Welcome to FabricStudio</h1>
<p>Redirecting to Explore...</p>

<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		goto('/explore');
	});
</script>
