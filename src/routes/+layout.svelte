<script>
	let { children } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
</svelte:head>

<nav class="bottom-nav">
	<a href="/explore">Explore</a>
	<a href="/design">Design</a>
	<a href="/account">Account</a>
</nav>

<main>
	{@render children()}
</main>

<style>
	:global(:root) {
		--bg-primary: #ffffff;
		--bg-secondary: #f9f9f9; /* Soft White */
		--bg-accent: #f0f0f0;
		
		--text-primary: #121212;
		--text-secondary: #666666;
		
		--border-subtle: #eaeaea;
		--shadow-soft: 0 4px 20px rgba(0,0,0,0.03);
		
		--font-display: 'Playfair Display', serif;
		--font-body: 'IBM Plex Sans', sans-serif;
	}

	:global(body) {
		margin: 0;
		font-family: var(--font-body);
		background-color: var(--bg-primary);
		color: var(--text-primary);
		padding-bottom: 70px; /* Space for bottom nav */
		-webkit-font-smoothing: antialiased;
	}

	:global(h1), :global(h2), :global(h3) {
		font-family: var(--font-display);
		font-weight: 400;
		margin: 0;
	}

	.bottom-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 65px;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-top: 1px solid var(--border-subtle);
		z-index: 100;
	}

	.bottom-nav a {
		text-decoration: none;
		color: var(--text-secondary);
		font-weight: 400;
		text-transform: uppercase;
		font-size: 0.75rem;
		letter-spacing: 1px;
		transition: color 0.3s;
	}

	.bottom-nav a:hover, .bottom-nav a:focus {
		color: var(--text-primary);
	}

	main {
		min-height: 100vh;
	}
</style>
