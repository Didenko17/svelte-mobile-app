<script lang="ts">
  export let className: string = '';
</script>

<button on:click class={className}>
  <slot />  
</button>

<style>
  button {
    height: 36px;
    width: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #89f1ef;
    background-color: transparent;
    cursor: pointer;
  }
</style>