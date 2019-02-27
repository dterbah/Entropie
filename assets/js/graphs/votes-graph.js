// class Graph {

// 	static getGraphBySubject(subject) {
// 		var diameter = 960, radius = diameter / 2, innerRadius = radius - 120;

// 		var cluster = d3.cluster()
// 					    .size([360, innerRadius]);

// 		var line = d3.radialLine()
// 			         .curve(d3.curvebundle.beta(0.85))
// 			         .radius( (d) => d.x )
// 			         .angle( (d) => d.x / 180 * Math.PI);

// 		var svg = d3.select("body").append("svg")
// 					.attr("width", diameter)
// 					.attr("height", diameter)
// 				  .append("g")
// 				  	.attr("transform", 'translate('+ radius + ',' + radius + ')');
				  	

// 		const allVotes = DataExtractor.getVotesBySubject(subject);
// 	}
// }