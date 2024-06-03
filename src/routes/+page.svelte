<script>
	import MessageBox from "./MessageBox.svelte";

</script>

<svelte:head>
	<title>Svelte Mobile</title>
	<meta name="description" content="Svelte Mobile" />
</svelte:head>

<section>
	<h1>Messenger</h1>
	<MessageBox />
</section>

<style>
	section {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 24px;
	}
	@media (max-width < 680px) {
		section {
			gap: 8px;
		}
	}
</style>