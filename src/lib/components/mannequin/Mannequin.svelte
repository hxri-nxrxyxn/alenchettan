<script>
	/**
	 * @typedef {Object} GarmentConfig
	 * @property {string} neckline
	 * @property {string} collar
	 * @property {string} sleeves
	 * @property {string} silhouette
	 * @property {string} fabricColor
	 */

	/** @type {{ config: GarmentConfig }} */
	let { config } = $props();
</script>

<div class="mannequin-container">
	<!-- The SVG Canvas -->
	<svg viewBox="0 0 1000 1000" class="canvas">
		<!-- Level 0: Mannequin Base (Image) -->
		<!-- User must place 'mannequin_base.png' in 'static/assets/master/' -->
		<image 
			href="/assets/master/mannequin_base.png" 
			x="0" 
			y="0" 
			width="1000" 
			height="1000" 
		/>
	</svg>
</div>

<style>
	.mannequin-container {
		width: 100%;
		max-width: 500px;
		margin: 0 auto;
		background: #fdfdfd;
		border: 1px solid #eee;
		border-radius: 8px;
	}

	.canvas {
		width: 100%;
		height: auto;
		display: block;
	}
</style>
