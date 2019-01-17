---
layout: post
mathjax: true
title: Amadios - Part 1
---

A couple years ago, I worked on this really cool project called Amadios (a mashup of Amadeus Mozzart and iOS) for a demo competition. Basically, I made an iOS app that would take live audio and convert it to sheet music in real time. A lot of my friends and coworkers found this really cool, so I thought I'd make a series of blog posts explaining how this was accomplished.

First of all, we need to break down what kind of data that we're getting from the microphone, and what type of output that we want to encode the notes being played.

<canvas id="radar-chart" width="600" height="800"></canvas>
<script>
document.addEventListener("DOMContentLoaded", function(){

	var data = {
	    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9 ,10],
	    datasets: [{
	        label: "f(x) = sin(x)", // Name it as you want
	        function: function(x) { return Math.sin(x)},
	        data: [], // Don't forget to add an empty data array, or else it will break
	        borderColor: "rgba(75, 192, 192, 1)",
	        fill: false
	    },
	    {
	        label: "f(x) = sin(x+Π)",
	        function: function(x) {return Math.sin(x + 3.1415)},
	        data: [],
	        borderColor: "rgba(153, 102, 255, 1)",
	        fill: false
	    }]
	}

	Chart.pluginService.register({
	    beforeInit: function(chart) {
	        // We get the chart data
	        var data = chart.config.data;

	        // For every dataset ...
	        for (var i = 0; i < data.datasets.length; i++) {

	            // For every label ...
	            for (var j = 0; j < data.labels.length; j++) {

	                // We get the dataset's function and calculate the value
	                var fct = data.datasets[i].function,
	                    x = data.labels[j],
	                    y = fct(x);
	                // Then we add the value to the dataset data
	                data.datasets[i].data.push(y);
	            }
	        }
	    }
	});
	
});
</script>