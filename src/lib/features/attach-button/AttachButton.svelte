<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { ChangeEventHandler } from "svelte/elements";

	import { IconButton } from "$lib/components/icon-button";
	import { AttachIcon } from "$lib/components/icons";
	import type { Image } from "$lib/types";

  const dispatch = createEventDispatcher<{attach: Image[]}>();

  const onFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.currentTarget.files) {
      const newImages: Image[] =  Array.from(e.currentTarget.files).map((file): Image => ({
        src: URL.createObjectURL(file),
        alt: file.name,
      }));

      dispatch('attach', newImages);
    }
  }

  let fileInput: HTMLInputElement;
</script>

<input
  bind:this={fileInput}
  type="file"
  accept="image/*"
  multiple
  on:change={onFileChange}
/>
<IconButton on:click={() => fileInput.click()}>
  <AttachIcon color="#89f1ef" />
</IconButton>

<style>
  input {
    display: none;
  }
</style>