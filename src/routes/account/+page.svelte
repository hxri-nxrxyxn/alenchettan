<script>
	/**
	 * Mock user data following the minimalist aesthetic
	 * @type {{ name: string, email: string, memberSince: string }}
	 */
	let user = $state({
		name: 'Alex Chen',
		email: 'alex.chen@fabricstudio.io',
		memberSince: 'October 2025'
	});

	// Mock data for saved designs
	const savedDesigns = [
		{ id: 101, name: 'Summer Linen Kurta', date: '2 days ago', silhouette: 'straight', material: '/assets/materials/4.webp' },
		{ id: 102, name: 'Evening Silk Anarkali', date: '1 week ago', silhouette: 'anarkali', material: '/assets/materials/3.webp' },
		{ id: 103, name: 'Casual Cotton Shirt', date: '2 weeks ago', silhouette: 'shirt-hem', material: '/assets/materials/6.webp' }
	];

	// Mock data for recent orders
	const orders = [
		{ id: 'ORD-7721', status: 'In Production', date: 'Feb 24, 2026' },
		{ id: 'ORD-7605', status: 'Delivered', date: 'Jan 15, 2026' }
	];
</script>

<div class="account-container">
	<header class="header">
		<div class="profile-header">
			<div class="avatar-placeholder">{user.name.charAt(0)}</div>
			<div class="user-info">
				<h1>{user.name}</h1>
				<p class="email">{user.email}</p>
				<p class="meta">Member since {user.memberSince}</p>
			</div>
		</div>
		<button class="edit-profile-btn">Edit Profile</button>
	</header>

	<section class="section">
		<div class="section-header">
			<h2>My Designs</h2>
			<a href="/design" class="action-link">Create New</a>
		</div>
		<div class="horizontal-scroll">
			{#each savedDesigns as design}
				<div class="design-card">
					<div class="design-preview" style="background-image: url({design.material}); background-size: cover;">
						<span class="silhouette-initial">{design.silhouette.charAt(0).toUpperCase()}</span>
					</div>
					<div class="card-details">
						<span class="design-name">{design.name}</span>
						<span class="design-date">{design.date}</span>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section class="section">
		<h2>Recent Orders</h2>
		<div class="order-list">
			{#each orders as order}
				<div class="order-item">
					<div class="order-main">
						<span class="order-id">{order.id}</span>
						<span class="order-date">{order.date}</span>
					</div>
					<div class="order-status" class:status-active={order.status === 'In Production'}>
						{order.status}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section class="section settings">
		<h2>Settings</h2>
		<nav class="settings-nav">
			<button class="nav-item">Shipping Addresses</button>
			<button class="nav-item">Payment Methods</button>
			<button class="nav-item">Measurements</button>
			<button class="nav-item logout">Logout</button>
		</nav>
	</section>
</div>

<style>
	.account-container {
		padding: 40px 20px 100px;
		max-width: 800px;
		margin: 0 auto;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 50px;
	}

	.profile-header {
		display: flex;
		gap: 20px;
		align-items: center;
	}

	.avatar-placeholder {
		width: 80px;
		height: 80px;
		background: var(--bg-accent);
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: var(--font-display);
		font-size: 2rem;
		color: var(--text-secondary);
	}

	.user-info h1 {
		font-size: 1.75rem;
		margin-bottom: 4px;
	}

	.email {
		color: var(--text-secondary);
		margin: 0;
		font-size: 0.9rem;
	}

	.meta {
		color: #aaa;
		font-size: 0.75rem;
		margin-top: 4px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.edit-profile-btn {
		background: transparent;
		border: 1px solid var(--border-subtle);
		padding: 8px 16px;
		border-radius: 4px;
		font-size: 0.8rem;
		cursor: pointer;
		font-family: var(--font-body);
		transition: all 0.2s;
	}

	.edit-profile-btn:hover {
		border-color: var(--text-primary);
	}

	.section {
		margin-bottom: 50px;
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 25px;
	}

	h2 {
		font-size: 1.25rem;
		color: var(--text-primary);
		font-family: var(--font-display);
	}

	.action-link {
		font-size: 0.85rem;
		color: var(--text-secondary);
		text-decoration: none;
		border-bottom: 1px solid var(--border-subtle);
		transition: color 0.2s;
	}

	.action-link:hover {
		color: var(--text-primary);
		border-color: var(--text-primary);
	}

	.horizontal-scroll {
		display: flex;
		overflow-x: auto;
		gap: 20px;
		padding-bottom: 15px;
		scrollbar-width: none;
	}
	.horizontal-scroll::-webkit-scrollbar {
		display: none;
	}

	.design-card {
		min-width: 180px;
		background: var(--bg-secondary);
		border-radius: 2px;
		overflow: hidden;
		transition: transform 0.3s ease;
		cursor: pointer;
	}

	.design-card:hover {
		transform: translateY(-4px);
	}

	.design-preview {
		height: 180px;
		background: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid var(--border-subtle);
	}

	.silhouette-initial {
		font-size: 3rem;
		color: var(--bg-accent);
		font-family: var(--font-display);
	}

	.card-details {
		padding: 12px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.design-name {
		font-size: 0.9rem;
		font-weight: 500;
	}

	.design-date {
		font-size: 0.75rem;
		color: var(--text-secondary);
	}

	.order-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.order-item {
		padding: 16px;
		border: 1px solid var(--border-subtle);
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 4px;
		background: var(--bg-primary);
	}

	.order-main {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.order-id {
		font-weight: 500;
		font-size: 0.9rem;
	}

	.order-date {
		font-size: 0.8rem;
		color: var(--text-secondary);
	}

	.order-status {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: var(--text-secondary);
		background: var(--bg-secondary);
		padding: 4px 10px;
		border-radius: 20px;
	}

	.status-active {
		color: #2e7d32;
		background: #e8f5e9;
	}

	.settings-nav {
		display: flex;
		flex-direction: column;
		border-top: 1px solid var(--border-subtle);
	}

	.nav-item {
		padding: 18px 0;
		border: none;
		background: transparent;
		border-bottom: 1px solid var(--border-subtle);
		text-align: left;
		font-family: var(--font-body);
		font-size: 0.95rem;
		color: var(--text-primary);
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		align-items: center;
		transition: color 0.2s;
	}

	.nav-item:hover {
		color: var(--text-secondary);
	}
	
	.nav-item::after {
		content: '→';
		color: var(--text-secondary);
		font-weight: 300;
	}

	.logout {
		color: #d32f2f;
		margin-top: 20px;
		border-bottom: none;
	}

	.logout:hover {
		color: #b71c1c;
	}

	.logout::after {
		content: '';
	}
</style>
