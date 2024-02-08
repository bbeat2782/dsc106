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

  // Placeholders for the axis elements.
  let gx;
  let gy;

//   $: console.log(data.length);
//   $: console.log(selectedCountries);
  $: worldData = data.filter(d => d.country === 'World');
  $: countryData = selectedCountries.map(country => {
    return {
        country: country,
        data: data.filter(d => d.country === country)
    };
  })
//   $: console.log(countryData);
  $: console.log(worldData);
  $: years = worldData.map(d => d.year);
  $: console.log(d3.max(years))

  $: x = d3.scaleTime()
    .domain([d3.min(years), d3.max(years)])
    .range([marginLeft, width - marginRight]);


  $: y = d3.scaleLinear()
    .domain(d3.extent(worldData, (d) => d.primary_energy_consumption))
    .nice()
    .range([height - marginBottom, marginTop]);


  $: d3.select(gx)
    .call(d3.axisBottom(x)
    .ticks(width / 80)
    .tickFormat(d3.format("")));

  $: d3.select(gy)
    .call(d3.axisLeft(y)
    .ticks(null, '+')
    .tickFormat(d3.format(".2s")))
    // grid lines
    .call((g) =>
      g
        .selectAll('.tick line')
        .clone()
        .attr('x2', width - marginRight - marginLeft)
        .attr('stroke-opacity', (d) => (d === 0 ? 1 : 0.1)),
    );

  // Generate line path
  $: line = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.primary_energy_consumption));

  $: linePath = line(worldData);
</script>

<div class="consumption-plot">
    <svg
    {width}
    {height}
    viewBox="0 0 {width} {height}"
    style="max-width: 100%; height: auto;"
  >
    <!-- x-axis -->
    <g bind:this={gx} transform="translate(0,{height - marginBottom})" />
    <!-- y-axis -->
    <g bind:this={gy} transform="translate({marginLeft},0)">
        <text
            x="5"
            y={marginTop}
            dy="0.32em"
            fill="#000"
            font-weight="bold"
            text-anchor="start"
        >
            Energy Consumption per Capita
        </text>
    </g>
    <path d={linePath} fill="none" stroke="blue" stroke-width="2" />
  </svg>
</div>
