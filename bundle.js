<<<<<<< Updated upstream
(function (d3,topojson) {
  'use strict';

  const svg = d3.select('svg');

  const projection = d3.geoNaturalEarth1();
  const pathGenerator = d3.geoPath().projection(projection);

  svg.append('path')
      .attr('class', 'sphere')
      .attr('d', pathGenerator({type: 'Sphere'}));

  d3.json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
    .then(data => {
      const countries = topojson.feature(data, data.objects.countries);
      svg.selectAll('path').data(countries.features)
        .enter().append('path')
          .attr('class', 'country')
          .attr('d', pathGenerator);
    });

}(d3,topojson));

=======
(function (d3,topojson) {
  'use strict';

  const svg = d3.select('svg');

  const projection = d3.geoNaturalEarth1();
  const pathGenerator = d3.geoPath().projection(projection);

  svg.append('path')
      .attr('class', 'sphere')
      .attr('d', pathGenerator({type: 'Sphere'}));

  d3.json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
    .then(data => {
      const countries = topojson.feature(data, data.objects.countries);
      svg.selectAll('path').data(countries.features)
        .enter().append('path')
          .attr('class', 'country')
          .attr('d', pathGenerator);
    });

}(d3,topojson));

>>>>>>> Stashed changes
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNlbGVjdCwganNvbiwgZ2VvUGF0aCwgZ2VvTmF0dXJhbEVhcnRoMSB9IGZyb20gJ2QzJztcbmltcG9ydCB7IGZlYXR1cmUgfSBmcm9tICd0b3BvanNvbic7XG5cbmNvbnN0IHN2ZyA9IHNlbGVjdCgnc3ZnJyk7XG5cbmNvbnN0IHByb2plY3Rpb24gPSBnZW9OYXR1cmFsRWFydGgxKCk7XG5jb25zdCBwYXRoR2VuZXJhdG9yID0gZ2VvUGF0aCgpLnByb2plY3Rpb24ocHJvamVjdGlvbik7XG5cbnN2Zy5hcHBlbmQoJ3BhdGgnKVxuICAgIC5hdHRyKCdjbGFzcycsICdzcGhlcmUnKVxuICAgIC5hdHRyKCdkJywgcGF0aEdlbmVyYXRvcih7dHlwZTogJ1NwaGVyZSd9KSk7XG5cbmpzb24oJ2h0dHBzOi8vdW5wa2cuY29tL3dvcmxkLWF0bGFzQDEuMS40L3dvcmxkLzExMG0uanNvbicpXG4gIC50aGVuKGRhdGEgPT4ge1xuICAgIGNvbnN0IGNvdW50cmllcyA9IGZlYXR1cmUoZGF0YSwgZGF0YS5vYmplY3RzLmNvdW50cmllcyk7XG4gICAgc3ZnLnNlbGVjdEFsbCgncGF0aCcpLmRhdGEoY291bnRyaWVzLmZlYXR1cmVzKVxuICAgICAgLmVudGVyKCkuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NvdW50cnknKVxuICAgICAgICAuYXR0cignZCcsIHBhdGhHZW5lcmF0b3IpO1xuICB9KTsiXSwibmFtZXMiOlsic2VsZWN0IiwiZ2VvTmF0dXJhbEVhcnRoMSIsImdlb1BhdGgiLCJqc29uIiwiZmVhdHVyZSJdLCJtYXBwaW5ncyI6Ijs7O0VBR0EsTUFBTSxHQUFHLEdBQUdBLFNBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7RUFFMUIsTUFBTSxVQUFVLEdBQUdDLG1CQUFnQixFQUFFLENBQUM7RUFDdEMsTUFBTSxhQUFhLEdBQUdDLFVBQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7RUFFdkQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7RUFDbEIsS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQztFQUM1QixLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFaERDLFNBQUksQ0FBQyxxREFBcUQsQ0FBQztFQUMzRCxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUk7RUFDaEIsSUFBSSxNQUFNLFNBQVMsR0FBR0MsZ0JBQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztFQUM1RCxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7RUFDbEQsT0FBTyxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0VBQzdCLFNBQVMsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7RUFDakMsU0FBUyxJQUFJLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0VBQ2xDLEdBQUcsQ0FBQzs7OzsifQ==