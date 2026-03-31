<script>
	import { garmentDb } from '$lib/logic/garmentDb.js';

	/**
	 * @typedef {Object} FabricConfig
	 * @property {string} type - 'color' or 'pattern'
	 * @property {string} value - hex code or url(...)
	 */

	/** @type {{ config: any, view: 'front' | 'back', activePart: string }} */
	let { config, view = 'front', activePart = $bindable('body') } = $props();

	// Helper to get fabric for a specific part
	function getFabric(partName) {
		const fabric = config.partFabrics?.[partName] || config.fabric;
		return fabric.type === 'color' ? fabric.value : `url(#pattern-${partName})`;
	}

	// Extract raw URL for SVG patterns
	function getPatternUrl(partName) {
		const fabric = config.partFabrics?.[partName] || config.fabric;
		if (fabric.type !== 'pattern') return '';
		return fabric.value.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
	}

	// Reactive references to the DB data
	let currentSilhouette = $derived(garmentDb.silhouettes[config.silhouette]);
	
	let bodyPath = $derived(currentSilhouette?.svgPath || '');

	// Find the current selected feature options from the DB
	function getFeatureOption(featureKey, selectedValue) {
		if (!currentSilhouette || !currentSilhouette.features[featureKey]) return null;
		return currentSilhouette.features[featureKey].options.find(opt => opt.id === selectedValue);
	}
	
	let neckOption = $derived(getFeatureOption('neckline', config.features?.neckline));
	let neckPath = $derived(neckOption ? neckOption.svgPath : '');

	let sleeveOption = $derived(getFeatureOption('sleeves', config.features?.sleeves));
	let collarOption = $derived(getFeatureOption('collar', config.features?.collar));
	
	// Details is an array in our schema
	let activeDetails = $derived(() => {
		if (!currentSilhouette || !currentSilhouette.features.details) return [];
		const selected = config.features.details || [];
		return currentSilhouette.features.details.options.filter(opt => selected.includes(opt.id) && opt.id !== 'none');
	});

</script>

{#if currentSilhouette}
<div class="mannequin-container">
	<svg viewBox="0 0 1000 1000" class="canvas">
		<defs>
			{#each ['body', 'sleeve_l', 'sleeve_r', 'collar', 'pocket', 'pants', 'dupatta'] as part}
				{@const url = getPatternUrl(part)}
				{#if url}
					<pattern id="pattern-{part}" patternUnits="userSpaceOnUse" width="200" height="200">
						<image href={url} x="0" y="0" width="200" height="200" preserveAspectRatio="xMidYMid slice" />
					</pattern>
				{/if}
			{/each}
		</defs>

		<!-- Level 0: Anatomical Mannequin (Skin) -->
		<g fill="#f5e0d3" stroke="#e0c0b0" stroke-width="1">
			<!-- Head/Neck -->
			<ellipse cx="500" cy="80" rx="40" ry="50" />
			<path d="M475,120 Q500,140 525,120 L520,175 L480,175 Z" />
			<!-- Torso & Legs behind clothes -->
			<path d="M420,175 Q500,165 580,175 L600,450 Q600,650 550,950 L450,950 Q400,650 400,450 Z" />
			<!-- Arms -->
			<path d="M420,175 L300,220 L280,480" fill="none" stroke-linecap="round" stroke-width="40" />
			<path d="M580,175 L700,220 L750,400" fill="none" stroke-linecap="round" stroke-width="40" />
		</g>

		<!-- Pants (Bottom Layer) -->
		{#if getFeatureOption('pants', config.features?.pants)}
			{@const opt = getFeatureOption('pants', config.features?.pants)}
			<path 
				class="garment-part"
				class:selected={activePart === 'pants'}
				onclick={() => activePart = 'pants'}
				onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && (activePart = 'pants')}
				role="button"
				tabindex="0"
				aria-label="Pants"
				d={opt.svgPath} 
				fill={getFabric('pants')} 
			/>
		{/if}

		<!-- Left Sleeve -->
		{#if sleeveOption && sleeveOption.svgPathLeft}
			<path 
				class="garment-part"
				class:selected={activePart === 'sleeve_l'}
				onclick={() => activePart = 'sleeve_l'}
				onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && (activePart = 'sleeve_l')}
				role="button"
				tabindex="0"
				aria-label="Left Sleeve"
				d={sleeveOption.svgPathLeft} 
				fill={getFabric('sleeve_l')} 
			/>
		{/if}

		<!-- Right Sleeve -->
		{#if sleeveOption && sleeveOption.svgPathRight}
			<path 
				class="garment-part"
				class:selected={activePart === 'sleeve_r'}
				onclick={() => activePart = 'sleeve_r'}
				onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && (activePart = 'sleeve_r')}
				role="button"
				tabindex="0"
				aria-label="Right Sleeve"
				d={sleeveOption.svgPathRight} 
				fill={getFabric('sleeve_r')} 
			/>
		{/if}

		<!-- Main Body with Neckline Cut -->
		<g>
			<path 
				class="garment-part"
				class:selected={activePart === 'body'}
				onclick={() => activePart = 'body'}
				onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && (activePart = 'body')}
				role="button"
				tabindex="0"
				aria-label="Garment Body"
				d={bodyPath} 
				fill={getFabric('body')} 
			/>
			<!-- Neckline Hole -->
			{#if neckPath}
				<path d={neckPath} fill="none" stroke="rgba(0,0,0,0.1)" stroke-width="2" />
			{/if}
		</g>

		<!-- Dynamic Collar -->
		{#if collarOption && collarOption.svgPath}
			<path 
				class="garment-part"
				class:selected={activePart === 'collar'}
				onclick={() => activePart = 'collar'}
				onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && (activePart = 'collar')}
				role="button"
				tabindex="0"
				aria-label="Collar"
				d={collarOption.svgPath} 
				fill={getFabric('collar')} 
			/>
		{/if}

		<!-- Dynamic Details -->
		{#each activeDetails() as detail}
			{#if detail.svgPath}
				<path 
					class="garment-part"
					class:selected={activePart === 'pocket'}
					onclick={() => activePart = 'pocket'}
					onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && (activePart = 'pocket')}
					role="button"
					tabindex="0"
					aria-label={detail.name}
					d={detail.svgPath} 
					fill={getFabric('pocket')} 
				/>
			{:else if detail.type === 'circles'}
				<g fill="#555" opacity="0.6">
					{#each detail.coords as coord}
						<circle cx={coord[0]} cy={coord[1]} r="5" />
					{/each}
				</g>
			{/if}
		{/each}

		<!-- Dupatta (Top Layer) -->
		{#if getFeatureOption('dupatta', config.features?.dupatta)}
			{@const opt = getFeatureOption('dupatta', config.features?.dupatta)}
			{#if opt.svgPath}
				<path 
					class="garment-part"
					class:selected={activePart === 'dupatta'}
					onclick={() => activePart = 'dupatta'}
					onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && (activePart = 'dupatta')}
					role="button"
					tabindex="0"
					aria-label="Dupatta"
					d={opt.svgPath} 
					fill={getFabric('dupatta')} 
					opacity="0.9"
				/>
			{/if}
		{/if}
	</svg>
</div>
{/if}

<style>
	.mannequin-container {
		width: 100%;
		max-width: 500px;
		margin: 0 auto;
		background: #fdfdfd;
		border: 1px solid #eee;
		border-radius: 8px;
		cursor: crosshair;
	}

	.canvas { width: 100%; height: auto; display: block; }

	.garment-part {
		cursor: pointer;
		stroke: rgba(0,0,0,0.15);
		stroke-width: 1;
		transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.garment-part:hover {
		stroke: var(--text-primary);
		stroke-width: 2;
	}

	.selected {
		stroke: var(--text-primary);
		stroke-width: 3;
		filter: drop-shadow(0 0 8px rgba(0,0,0,0.15));
	}
</style>