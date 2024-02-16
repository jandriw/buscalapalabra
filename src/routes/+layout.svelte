<script>
    import "../app.css";
    import '@fontsource/rajdhani'
    import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

    injectSpeedInsights();
</script>
  
<slot />

<style lang="postcss">
    :global(html) {
      background-color: #11111f;
      font-family: 'Rajdhani', sans-serif;
    }
</style>