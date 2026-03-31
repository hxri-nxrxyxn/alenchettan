<script>
	import Mannequin from '$lib/components/mannequin/Mannequin.svelte';
	import { garmentDb, getDefaultConfig } from '$lib/logic/garmentDb.js';

	// Svelte 5 State for the garment configuration
	// Initialize with the default shirt configuration
	let config = $state(getDefaultConfig('shirt'));

	// UI State
	let activeTab = $state('silhouette'); 
	let activePart = $state('body');
	let view = $state('front'); // 'front' or 'back'

	// Import/Export Modal State
	let showImportModal = $state(false);
	let importJsonText = $state('');

	// Derived data for the UI
	let availableSilhouettes = $derived(Object.values(garmentDb.silhouettes));
	let currentSilhouetteData = $derived(garmentDb.silhouettes[config.silhouette]);
	
	// Dynamic tabs based on the selected silhouette's features
	let availableTabs = $derived(['silhouette', ...Object.keys(currentSilhouetteData?.features || {}), 'fabric']);

	const fabrics = [
		{ type: 'color', name: 'Snow', value: '#ffffff' },
		{ type: 'color', name: 'Ivory', value: '#f0f0f0' },
		{ type: 'color', name: 'Charcoal', value: '#333333' },
		{ type: 'pattern', name: 'Pattern 1', value: 'url(/assets/materials/1.webp)' },
		{ type: 'pattern', name: 'Pattern 2', value: 'url(/assets/materials/2.webp)' },
		{ type: 'pattern', name: 'Pattern 3', value: 'url(/assets/materials/3.webp)' },
		{ type: 'pattern', name: 'Pattern 4', value: 'url(/assets/materials/4.webp)' },
		{ type: 'pattern', name: 'Pattern 5', value: 'url(/assets/materials/5.webp)' },
		{ type: 'pattern', name: 'Pattern 6', value: 'url(/assets/materials/6.webp)' }
	];

	function updateSilhouette(newSilhouetteId) {
		if (config.silhouette !== newSilhouetteId) {
			// Reset config to the new silhouette's defaults
			config = getDefaultConfig(newSilhouetteId);
			// Reset active part if the new silhouette doesn't have it (e.g. collar on churidar)
			activePart = 'body'; 
			activeTab = 'silhouette';
		}
	}

	function updateFeature(featureKey, value) {
		const featureDef = currentSilhouetteData.features[featureKey];
		if (featureDef.multiSelect) {
			if (value === 'none') {
				config.features[featureKey] = [];
			} else {
				let current = config.features[featureKey] || [];
				if (current.includes(value)) {
					config.features[featureKey] = current.filter(v => v !== value);
				} else {
					config.features[featureKey] = [...current, value];
				}
			}
		} else {
			config.features[featureKey] = value;
		}
	}
	
	function selectFabric(item) {
		if (!config.partFabrics[activePart]) {
			config.partFabrics[activePart] = { ...item };
		} else {
			config.partFabrics[activePart] = item;
		}
	}

	function toggleView() {
		view = view === 'front' ? 'back' : 'front';
	}

	// JSON Export/Import Logic
	function exportConfig() {
		const jsonString = JSON.stringify(config, null, 2);
		navigator.clipboard.writeText(jsonString).then(() => {
			alert('Configuration copied to clipboard!');
		}).catch(err => {
			console.error('Failed to copy text: ', err);
			prompt("Copy this JSON:", jsonString);
		});
	}

	function importConfig() {
		try {
			const parsed = JSON.parse(importJsonText);
			// Basic validation
			if (parsed.silhouette && garmentDb.silhouettes[parsed.silhouette]) {
				config = parsed;
				showImportModal = false;
				importJsonText = '';
				activePart = 'body';
				activeTab = 'silhouette';
			} else {
				alert('Invalid configuration JSON: Unknown silhouette.');
			}
		} catch (e) {
			alert('Invalid JSON format.');
		}
	}
</script>

<div class="design-page">
	<header class="header">
		<h1>Design Studio</h1>
		<div class="header-actions">
			<button class="action-btn" onclick={() => showImportModal = true}>Load Config</button>
			<button class="action-btn" onclick={exportConfig}>Export Config</button>
		</div>
	</header>

	<div class="canvas-section">
		<div class="active-part-badge">Editing: {activePart.replace('_', ' ')}</div>
		<button class="view-toggle" onclick={toggleView}>
			{view === 'front' ? 'Front' : 'Back'}
		</button>
		<Mannequin {config} {view} bind:activePart />
	</div>

	<div class="controls-section">
		<!-- SCROLLABLE TAB BAR -->
		<div class="toolbar-scroll-wrapper">
			<div class="toolbar">
				{#each availableTabs as tab}
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
						{#each availableSilhouettes as item}
							<button class="option-btn" class:active={config.silhouette === item.id} onclick={() => updateSilhouette(item.id)}>
								{item.name}
							</button>
						{/each}
					</div>
				</section>
			{:else if activeTab === 'fabric'}
				<section class="option-grid">
					<div class="part-selector-header">
						<h3>Select Fabric</h3>
						<select bind:value={activePart} class="part-select">
							{#each Object.keys(config.partFabrics) as part}
								<option value={part}>{part.replace('_', ' ')}</option>
							{/each}
						</select>
					</div>
					<div class="color-palette">
						{#each fabrics as item}
							<button 
								class="color-btn" 
								style:background={item.type === 'color' ? item.value : `${item.value} center/cover`}
								class:active={config.partFabrics[activePart]?.value === item.value}
								onclick={() => selectFabric(item)}
								title={item.name}
							>
							</button>
						{/each}
					</div>
				</section>
			{:else if currentSilhouetteData.features[activeTab]}
				{@const featureDef = currentSilhouetteData.features[activeTab]}
				<section class="option-grid">
					<h3>{featureDef.name} {featureDef.multiSelect ? '(Multi-select)' : ''}</h3>
					<div class="options">
						{#each featureDef.options as opt}
							{@const isActive = featureDef.multiSelect 
								? (config.features[activeTab]?.includes(opt.id) || (opt.id === 'none' && (!config.features[activeTab] || config.features[activeTab].length === 0)))
								: config.features[activeTab] === opt.id}
							<button 
								class="option-btn" 
								class:active={isActive}
								onclick={() => updateFeature(activeTab, opt.id)}
							>
								{opt.name}
							</button>
						{/each}
					</div>
				</section>
			{/if}
		</div>

		<button class="done-btn">Add to Bag</button>
	</div>

	<!-- Import Modal -->
	{#if showImportModal}
		<div class="modal-backdrop" onclick={() => showImportModal = false} onkeydown={(e) => e.key === 'Escape' && (showImportModal = false)} role="button" tabindex="-1" aria-label="Close modal">
			<div class="modal-content" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()} role="dialog" tabindex="-1">
				<h3>Import Configuration</h3>
				<p>Paste your JSON configuration below:</p>
				<textarea bind:value={importJsonText} placeholder='Paste your JSON here...'></textarea>
				<div class="modal-actions">
					<button class="action-btn" onclick={() => showImportModal = false}>Cancel</button>
					<button class="action-btn primary" onclick={importConfig}>Import</button>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.design-page {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	.header {
		padding: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	h1 {
		font-size: 1.5rem;
		letter-spacing: 0.5px;
	}

	.header-actions {
		display: flex;
		gap: 10px;
	}

	.action-btn {
		background: transparent;
		border: 1px solid var(--border-subtle);
		padding: 6px 12px;
		border-radius: 4px;
		font-size: 0.75rem;
		cursor: pointer;
		font-family: var(--font-body);
		transition: all 0.2s;
	}

	.action-btn:hover {
		border-color: var(--text-primary);
	}

	.action-btn.primary {
		background: var(--text-primary);
		color: var(--bg-primary);
		border-color: var(--text-primary);
	}

	.canvas-section {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px;
		background: var(--bg-secondary);
		position: relative;
	}

	.active-part-badge {
		position: absolute;
		top: 20px;
		left: 20px;
		background: var(--text-primary);
		color: var(--bg-primary);
		padding: 6px 12px;
		border-radius: 4px;
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 1px;
		font-weight: 500;
		z-index: 5;
	}

	.view-toggle {
		position: absolute;
		top: 20px;
		right: 20px;
		background: var(--bg-primary);
		border: 1px solid var(--border-subtle);
		padding: 8px 16px;
		border-radius: 20px;
		font-family: var(--font-body);
		font-size: 0.75rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		cursor: pointer;
		box-shadow: var(--shadow-soft);
		z-index: 5;
		transition: all 0.2s;
	}

	.view-toggle:hover {
		border-color: var(--text-primary);
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
		scrollbar-width: none;
		border-bottom: 1px solid var(--border-subtle);
	}
	.toolbar-scroll-wrapper::-webkit-scrollbar {
		display: none;
	}

	.toolbar {
		display: flex;
		gap: 25px;
		padding-bottom: 10px;
		white-space: nowrap;
		min-width: min-content;
		padding-left: 5px;
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
		text-transform: capitalize;
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

	.part-selector-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
	}

	.part-select {
		padding: 8px 12px;
		border: 1px solid var(--border-subtle);
		background: var(--bg-primary);
		font-family: var(--font-body);
		font-size: 0.85rem;
		text-transform: capitalize;
		border-radius: 4px;
		cursor: pointer;
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

	/* Modal Styles */
	.modal-backdrop {
		position: fixed;
		top: 0; left: 0; right: 0; bottom: 0;
		background: rgba(0,0,0,0.5);
		backdrop-filter: blur(4px);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.modal-content {
		background: var(--bg-primary);
		padding: 30px;
		border-radius: 8px;
		width: 90%;
		max-width: 500px;
		box-shadow: 0 10px 30px rgba(0,0,0,0.1);
	}

	textarea {
		width: 100%;
		height: 200px;
		margin: 15px 0;
		padding: 10px;
		font-family: monospace;
		border: 1px solid var(--border-subtle);
		border-radius: 4px;
		resize: vertical;
	}

	.modal-actions {
		display: flex;
		justify-content: flex-end;
		gap: 10px;
	}
</style>
