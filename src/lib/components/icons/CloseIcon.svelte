<script lang="ts">
  export let width: number = 24;
  export let height: number = 24;
  export let color: string = '#000';
</script>

<svg {width} {height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g>
    <path
      d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
      stroke={color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </g>
</svg>