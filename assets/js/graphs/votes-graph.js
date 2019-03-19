$(document).ready( () => {
	const urlData = Redirection.urlToData()
	const student = urlData[STUDENT_URL_TAG];
	const subject = urlData[SUBJECTS_URL_TAG];

	const data = DataExtractor.getCountForStudentBySubject(subject);

	const sortedMap = DataExtractor.sortedData(data);

	// retrieve labels and datasets
	const labels = Object.keys(sortedMap);
	const datasets = [];

	labels.forEach( (label, index) => {
		datasets.push(sortedMap[label]);
	});

	//find the max of the value
	var max = 0;
	datasets.forEach( (dataset, index) => {
		if(max < dataset) max = dataset;
	});

	// map doesn't work...
	for(let i = 0; i < datasets.length; i++) {
		datasets[i] /= max;
	}



	const globalChartContext = document.getElementById('global-chart').getContext('2d');

	const globalChart = new Chart(globalChartContext, {
		type: 'bar',
		data: {
			labels: labels,
			datasets: [{
				label: '# of global votes',
				data: datasets,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)'
				],
				borderColor: [
					'rgba(255,99,132,1)'
				],
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yaxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});


	// individual graph
	const studentMap = DataExtractor.getVotesByStudentAndSubject(student, subject);
	const studentKeys = Object.keys(studentMap); 

	datasets.forEach( (dataset, index) => {
		if(!studentKeys.includes(dataset)) {
			studentMap[dataset] = 0; // null value
		}
	});

	const studentData = [];
	labels.forEach( (value, index) => {
		studentData.push(studentMap[value]);
	});

	const individualChartContext = document.getElementById('individual-chart').getContext('2d');
	const individualChart = new Chart(individualChartContext, {
		type: 'bar',
		data: {
			labels: labels,
			datasets: [{
				label: '# of individual votes',
				data: studentData,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)'
				],
				borderColor: [
					'rgba(255,  99, 132, 1)'
				],
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yaxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});	

	const sourceStudents = DataExtractor.getStudents();
	generateEntropy(subject, sourceStudents, labels);
});