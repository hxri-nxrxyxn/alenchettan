<script>
	import Mannequin from '$lib/components/mannequin/Mannequin.svelte';

	// Svelte 5 State for the garment configuration
	let config = $state({
		silhouette: 'straight',
		neckline: 'round',
		collar: 'none',
		sleeves: 'short',
		details: [], // Array for multiple items like buttons/pockets
		fabric: { type: 'color', value: '#f0f0f0' }
	});

	// UI State
	let activeTab = $state('silhouette'); 

	// Mock Data Assets
	const silhouettes = ['straight', 'a-line', 'anarkali', 'shirt-hem'];
	const necklines = ['round', 'v-neck', 'boat', 'square', 'sweetheart'];
	const collars = ['none', 'mandarin', 'peterpan', 'shirt', 'ruffle'];
	const sleeves = ['none', 'cap', 'short', 'three-quarter', 'full', 'bell'];
	const details = ['none', 'buttons-center', 'pocket-left', 'embroidery-neck', 'zipper-back'];
	
	const fabrics = [
		{ type: 'color', name: 'Snow', value: '#ffffff' },
		{ type: 'color', name: 'Ivory', value: '#f0f0f0' },
		{ type: 'color', name: 'Charcoal', value: '#333333' },
		{ type: 'color', name: 'Mint', value: '#a5d6a7' },
		{ type: 'pattern', name: 'ZigZag', value: 'url(/assets/patterns/zigzag.png)' },
		{ type: 'pattern', name: 'Floral', value: 'url(/assets/patterns/floral.png)' }
	];

	function updateConfig(key, value) {
		config[key] = value;
	}

	function toggleDetail(detail) {
		if (detail === 'none') {
			config.details = [];
			return;
		}
		if (config.details.includes(detail)) {
			config.details = config.details.filter(d => d !== detail);
		} else {
			config.details = [...config.details, detail];
		}
	}
	
	function selectFabric(item) {
		config.fabric = item;
	}
</script>

<div class="design-page">
	<header class="header">
		<h1>Design Studio</h1>
	</header>

	<div class="canvas-section">
		<Mannequin {config} />
	</div>

	<div class="controls-section">
		<!-- SCROLLABLE TAB BAR -->
		<div class="toolbar-scroll-wrapper">
			<div class="toolbar">
				{#each ['silhouette', 'neckline', 'collar', 'sleeves', 'details', 'fabric'] as tab}
					<button 
						class="tab-btn" 
						class:active={activeTab === tab} 
						onclick={() => activeTab = tab}
					>
						{tab}
					</button>
				{/each}
			</div>
		</div>

		<!-- DYNAMIC PANELS -->
		<div class="panel-container">
			{#if activeTab === 'silhouette'}
				<section class="option-grid">
					<h3>Choose Silhouette</h3>
					<div class="options">
						{#each silhouettes as item}
							<button class="option-btn" class:active={config.silhouette === item} onclick={() => updateConfig('silhouette', item)}>{item}</button>
						{/each}
					</div>
				</section>

			{:else if activeTab === 'neckline'}
				<section class="option-grid">
					<h3>Choose Neckline</h3>
					<div class="options">
						{#each necklines as item}
							<button class="option-btn" class:active={config.neckline === item} onclick={() => updateConfig('neckline', item)}>{item}</button>
						{/each}
					</div>
				</section>

			{:else if activeTab === 'collar'}
				<section class="option-grid">
					<h3>Add Collar</h3>
					<div class="options">
						{#each collars as item}
							<button class="option-btn" class:active={config.collar === item} onclick={() => updateConfig('collar', item)}>{item}</button>
						{/each}
					</div>
				</section>

			{:else if activeTab === 'sleeves'}
				<section class="option-grid">
					<h3>Select Sleeves</h3>
					<div class="options">
						{#each sleeves as item}
							<button class="option-btn" class:active={config.sleeves === item} onclick={() => updateConfig('sleeves', item)}>{item}</button>
						{/each}
					</div>
				</section>

			{:else if activeTab === 'details'}
				<section class="option-grid">
					<h3>Add Details (Multi-select)</h3>
					<div class="options">
						{#each details as item}
							<button 
								class="option-btn" 
								class:active={config.details.includes(item) || (item === 'none' && config.details.length === 0)}
								onclick={() => toggleDetail(item)}
							>
								{item}
							</button>
						{/each}
					</div>
				</section>

			{:else if activeTab === 'fabric'}
				<section class="option-grid">
					<h3>Select Fabric or Pattern</h3>
					<div class="color-palette">
						{#each fabrics as item}
							<button 
								class="color-btn" 
								style:background={item.type === 'color' ? item.value : `repeating-linear-gradient(45deg, #ccc 0, #ccc 10px, #eee 10px, #eee 20px)`}
								class:active={config.fabric.value === item.value}
								onclick={() => selectFabric(item)}
								title={item.name}
							>
							</button>
						{/each}
					</div>
				</section>
			{/if}
		</div>

		<button class="done-btn">Add to Bag</button>
	</div>
</div>

<style>
	.design-page {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	.header {
		padding: 20px;
		text-align: center;
	}

	h1 {
		font-size: 1.5rem;
		letter-spacing: 0.5px;
	}

	.canvas-section {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px;
		background: var(--bg-secondary);
	}

	.controls-section {
		background: var(--bg-primary);
		padding: 30px 20px 80px 20px;
		border-top-left-radius: 24px;
		border-top-right-radius: 24px;
		box-shadow: 0 -10px 40px rgba(0,0,0,0.05);
		z-index: 10;
	}

	/* Scrollable Toolbar Logic */
	.toolbar-scroll-wrapper {
		margin-bottom: 30px;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none; /* Hide scrollbar Firefox */
		border-bottom: 1px solid var(--border-subtle);
	}
	.toolbar-scroll-wrapper::-webkit-scrollbar {
		display: none; /* Hide scrollbar Chrome/Safari */
	}

	.toolbar {
		display: flex;
		gap: 25px;
		padding-bottom: 10px;
		white-space: nowrap;
		min-width: min-content; /* Ensure items don't wrap */
		padding-left: 5px; /* Visual balance */
	}

	.tab-btn {
		padding: 10px 0;
		border: none;
		background: transparent;
		cursor: pointer;
		font-family: var(--font-body);
		font-size: 0.9rem;
		color: var(--text-secondary);
		position: relative;
		text-transform: capitalize;
		transition: color 0.3s;
	}

	.tab-btn.active {
		color: var(--text-primary);
		font-weight: 500;
	}

	.tab-btn.active::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background: var(--text-primary);
	}

	.panel-container {
		min-height: 180px;
	}

	h3 {
		font-size: 1rem;
		margin-bottom: 10px;
		font-family: var(--font-body);
		color: var(--text-secondary);
		font-weight: 300;
	}

	.options {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 15px;
	}

	.option-btn {
		padding: 15px;
		border: 1px solid var(--border-subtle);
		background: var(--bg-primary);
		color: var(--text-primary);
		border-radius: 4px;
		cursor: pointer;
		font-family: var(--font-body);
		font-weight: 300;
		transition: all 0.2s;
		text-transform: capitalize;
	}

	.option-btn.active {
		border-color: var(--text-primary);
		background: var(--bg-secondary);
		font-weight: 500;
	}

	.color-palette {
		display: flex;
		gap: 20px;
		flex-wrap: wrap;
	}

	.color-btn {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		border: 1px solid var(--border-subtle);
		cursor: pointer;
		transition: transform 0.2s;
	}

	.color-btn.active {
		transform: scale(1.15);
		border-color: var(--text-primary);
		box-shadow: 0 4px 10px rgba(0,0,0,0.1);
	}

	.done-btn {
		width: 100%;
		padding: 18px;
		background: var(--text-primary);
		color: var(--bg-primary);
		border: none;
		border-radius: 2px;
		font-family: var(--font-body);
		font-weight: 500;
		letter-spacing: 1px;
		text-transform: uppercase;
		margin-top: 30px;
		cursor: pointer;
		transition: opacity 0.3s;
	}
	
	.done-btn:hover {
		opacity: 0.9;
	}
</style>
