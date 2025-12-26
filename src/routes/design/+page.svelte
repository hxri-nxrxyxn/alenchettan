<script>
	import Mannequin from '$lib/components/mannequin/Mannequin.svelte';

	// Svelte 5 State for the garment configuration
	let config = $state({
		neckline: 'round',
		collar: 'none',
		sleeves: 'short',
		silhouette: 'straight',
		fabricColor: '#f0f0f0'
	});

	// UI State
	let activeTab = $state('collar'); // 'collar', 'sleeves', 'color'

	const collars = ['none', 'mandarin', 'peterpan', 'shirt'];
	const sleeves = ['none', 'short', 'three-quarter', 'full'];
	const colors = ['#f0f0f0', '#e0e0e0', '#dcdcdc', '#333333', '#a5d6a7'];

	function selectCollar(val) { config.collar = val; }
	function selectSleeve(val) { config.sleeves = val; }
	function selectColor(val) { config.fabricColor = val; }
</script>

<div class="design-page">
	<header class="header">
		<h1>Design Studio</h1>
	</header>

	<div class="canvas-section">
		<Mannequin {config} />
	</div>

	<div class="controls-section">
		<!-- TAB BAR -->
		<div class="toolbar">
			<button 
				class="tab-btn" 
				class:active={activeTab === 'collar'} 
				onclick={() => activeTab = 'collar'}
			>
				Collar
			</button>
			<button 
				class="tab-btn" 
				class:active={activeTab === 'sleeves'} 
				onclick={() => activeTab = 'sleeves'}
			>
				Sleeves
			</button>
			<button 
				class="tab-btn" 
				class:active={activeTab === 'color'} 
				onclick={() => activeTab = 'color'}
			>
				Color
			</button>
		</div>

		<!-- DYNAMIC PANELS -->
		<div class="panel-container">
			{#if activeTab === 'collar'}
				<section class="option-grid">
					<h3>Select Collar Style</h3>
					<div class="options">
						{#each collars as item}
							<button 
								class="option-btn" 
								class:active={config.collar === item}
								onclick={() => selectCollar(item)}
							>
								{item}
							</button>
						{/each}
					</div>
				</section>

			{:else if activeTab === 'sleeves'}
				<section class="option-grid">
					<h3>Select Sleeve Length</h3>
					<div class="options">
						{#each sleeves as item}
							<button 
								class="option-btn" 
								class:active={config.sleeves === item}
								onclick={() => selectSleeve(item)}
							>
								{item}
							</button>
						{/each}
					</div>
				</section>

			{:else if activeTab === 'color'}
				<section class="option-grid">
					<h3>Select Fabric Tone</h3>
					<div class="color-palette">
						{#each colors as color}
							<button 
								class="color-btn" 
								style="background-color: {color}"
								class:active={config.fabricColor === color}
								onclick={() => selectColor(color)}
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

	.toolbar {
		display: flex;
		justify-content: center;
		gap: 30px;
		margin-bottom: 30px;
		border-bottom: 1px solid var(--border-subtle);
		padding-bottom: 10px;
	}

	.tab-btn {
		padding: 10px 5px;
		border: none;
		background: transparent;
		cursor: pointer;
		font-family: var(--font-body);
		font-size: 0.9rem;
		color: var(--text-secondary);
		position: relative;
		transition: color 0.3s;
	}

	.tab-btn.active {
		color: var(--text-primary);
		font-weight: 500;
	}

	.tab-btn.active::after {
		content: '';
		position: absolute;
		bottom: -11px;
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
	}

	.option-btn.active {
		border-color: var(--text-primary);
		background: var(--bg-secondary);
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
