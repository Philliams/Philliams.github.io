---
layout: post
mathjax: true
title: Amadios - Part 1
---

A couple years ago, I worked on this really cool project called Amadios (a mashup of Amadeus Mozzart and iOS) for a demo competition. Basically, I made an iOS app that would take live audio and convert it to sheet music in real time. A lot of my friends and coworkers found this really cool, so I thought I'd make a series of blog posts explaining how this was accomplished.

First of all, we need to break down what kind of data that we're getting from the microphone, and what type of output that we want to encode the notes being played.

<canvas id="line-chart" width="800" height="450"></canvas>
<script>
document.addEventListener("DOMContentLoaded", function(){

	var x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


	new Chart(document.getElementById("line-chart"), {
	  type: 'line',
	  data: {
	    labels: x,
	    datasets: [{ 
	        data: x.map(i => Math.sin(i)),
	        label: "Sin(x)",
	        borderColor: "#3e95cd",
	        fill: false
	      }, { 
	        data: x.map(i => 1.5 * Math.sin(i + (3.1415/2))),
	        label: "1.5 * Sin(x + pi/2)",
	        borderColor: "#8e5ea2",
	        fill: false
	      }
	    ]
	  },
	  options: {
	    title: {
	      display: true,
	      text: 'Pulse Code Modulation (PCM)'
	    }
	  }
	});
	
});
</script>