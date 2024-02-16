<script>
    import "../app.css";
    import '@fontsource/rajdhani'
    import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';

    injectSpeedInsights();
    inject({ mode: dev ? 'development' : 'production' });
</script>
  
<slot />

<style lang="postcss">
    :global(html) {
      background-color: #11111f;
      font-family: 'Rajdhani', sans-serif;
    }
</style>