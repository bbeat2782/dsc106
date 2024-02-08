<script>
  import * as d3 from 'd3';
  import { getContext } from 'svelte';


  export let data;
  export let selectedCountries;

  let countryData = {};

  const width = 928;
  const height = 600;
  const marginTop = 20;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 40;

  $: console.log(data.length);
  $: console.log(selectedCountries);
  $: countryData = selectedCountries.map(country => {
    return {
        country: country,
        data: data.filter(d => d.country === country)
    };
  })
  $: console.log(countryData);
</script>

<div class="consumption-plot">
    <svg
    {width}
    {height}
    viewBox="0 0 {width} {height}"
    style="max-width: 100%; height: auto;"
  >
  </svg>
</div>
