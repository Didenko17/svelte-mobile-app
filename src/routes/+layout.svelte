<script>
	import './styles.css';
</script>

<div class="app">
	<main>
		<slot />
	</main>

	<footer>
		Vladislav Didenko 2024
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		height: 90vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	@media (min-width: 680px) {
		.app {
			height: 100vh;
		}
		footer {
			padding: 12px 0;
		}
	}
</style>
