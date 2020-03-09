import { select, json, geoPath, geoNaturalEarth1 } from 'd3';
import { feature } from 'topojson';

const svg = select('svg');



json('https://observablehq.com/@d3/world-map-svg')
  .then(data => {
    console.log(data);
  });