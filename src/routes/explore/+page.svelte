<script>
	// Mock data for the Explore page
	const patterns = $state([
		{ id: 1, name: 'HIMA3306', type: 'Pattern', color: '#f0f0f0' },
		{ id: 2, name: 'ZigZag Red', type: 'Pattern', color: '#e8e8e8' },
		{ id: 3, name: 'Floral Blue', type: 'Fabric', color: '#f5f5f5' },
		{ id: 4, name: 'Plain Linen', type: 'Fabric', color: '#fafafa' }
	]);
</script>

<div class="explore-container">
	<header class="header">
		<div class="search-bar">
			<span class="icon">search</span>
			<span class="placeholder">Search fabrics & patterns...</span>
		</div>
	</header>

	<section class="section">
		<h2>Best Patterns</h2>
		<div class="horizontal-scroll">
			{#each patterns as item}
				<div class="card" style="background-color: {item.color}">
					<div class="card-content">
						<span class="card-label">{item.name}</span>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section class="section">
		<h2>Fabrics on Demand</h2>
		<div class="grid">
			{#each patterns as item}
				<div class="card" style="background-color: {item.color}">
					<div class="card-content">
						<span class="card-label">{item.name}</span>
					</div>
				</div>
			{/each}
		</div>
	</section>
</div>

<style>
	.explore-container {
		padding: 30px 20px;
		max-width: 800px;
		margin: 0 auto;
	}

	.header {
		margin-bottom: 40px;
	}

	.search-bar {
		background: var(--bg-primary);
		border: 1px solid var(--border-subtle);
		padding: 12px 20px;
		border-radius: 4px;
		color: var(--text-secondary);
		font-family: var(--font-body);
		font-weight: 300;
		display: flex;
		align-items: center;
		gap: 10px;
		box-shadow: var(--shadow-soft);
	}

	.section {
		margin-bottom: 50px;
	}

	h2 {
		font-size: 1.5rem;
		margin-bottom: 25px;
		color: var(--text-primary);
		letter-spacing: -0.5px;
	}

	.horizontal-scroll {
		display: flex;
		overflow-x: auto;
		gap: 20px;
		padding-bottom: 20px; /* Hide scrollbar usually, but here helps touch */
		scrollbar-width: none;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
	}

	.card {
		min-width: 160px;
		height: 220px;
		border-radius: 2px; /* Sharper corners for minimal look */
		position: relative;
		transition: transform 0.3s ease;
	}
	
	.card:hover {
		transform: translateY(-5px);
	}

	.card-content {
		position: absolute;
		bottom: 15px;
		left: 15px;
	}

	.card-label {
		font-family: var(--font-body);
		font-size: 0.85rem;
		color: var(--text-primary);
		background: rgba(255,255,255,0.8);
		padding: 4px 8px;
		backdrop-filter: blur(4px);
	}
</style>
