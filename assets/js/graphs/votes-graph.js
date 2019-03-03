const margin = {
	top: 20,
	right: 20,
	bottom: 90,
	left: 120
};

const width = 1600 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const x = d3.scaleBand()
		    .range([0, width])
		    .padding(0.1);


const 	y = d3.scaleLinear()
	        .range([height, 0]);

$(document).ready(function() {
	const svg = d3.select('#chart').append('svg')
			  .attr('id', 'svg')
			  .attr('width', width + margin.left + margin.right)
			  .attr('height', height + margin.bottom + margin.top)
			  .append('g')
			  .attr('transform', "translate(" + margin.left + "," + margin.top + "))");

	let subject = Redirection.urlToData()[SUBJECTS_URL_TAG];

	const data = DataExtractor.getCountForStudentBySubject(subject);

 	//transform the data
 	const result = [];

 	console.log(data);

 	for(var studentKey in data) {
 		var count = data[studentKey];
 		result.push({
 			name: studentKey, 
 			value: count * 100
 		})
 	}

 	x.domain(result.map( d => d.name ) );
 	y.domain([
 		0, d3.max(result, d => d.value )
 	]);

 	svg.append("g")
 	   .attr('transform', "translate(0," + height + ")")
 	   .call(d3.axisBottom(x).tickSize(0))
 	   .selectAll('text')
 	   		.style('text-anchor', 'end')
 	   		.attr('dx', '-8em')
 	   		.attr('dy', '.15em')
 	   		.attr('transform', 'rotate(-65)');

 	svg.append('g')
 	   .call(d3.axisLeft(y).ticks(6));

 	svg.selectAll('.bar')
 	   .data(result)
 	.enter().append('rect')
 		.attr('class', 'bar')
 		.attr('x', d => x(d.name))
 		.attr('width', x.bandwidth())
 		.attr('y', d => y(d.value))
 		.attr('height', d => {
 			console.log(y(d.value));
 			return height - y(d.value)
 		});
});