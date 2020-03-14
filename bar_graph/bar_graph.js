//importing json utility from d3
import {select, json} from 'd3';

const svg = select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');

// loading 