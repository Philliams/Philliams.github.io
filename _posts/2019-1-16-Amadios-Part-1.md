---
layout: post
mathjax: true
title: Amadios - Part 1
---

A couple years ago, I worked on this really cool project called Amadios (a mashup of Amadeus Mozzart and iOS) for a demo competition. Basically, I made an iOS app that would take live audio and convert it to sheet music in real time. A lot of my friends and coworkers found this really cool, so I thought I'd make a series of blog posts explaining how this was accomplished.

First of all, we need to break down what kind of data that we're getting from the microphone, and what type of output that we want to encode the notes being played. 

Sound is just pressure waves in the air that our ears can capture. Below you can see an animated gif showing how the particles in the air behave to produce the pressure waves that we call sound.

<img src="{{ site.baseurl }}/images/pressure_wave.gif" alt="Sound Wave"/>

Source : [Institute of Sound and Vibration Research - University of SouthHampton](http://resource.isvr.soton.ac.uk/spcg/tutorial/tutorial/Tutorial_files/Web-basics-nature.htm)

For our purposes, we're going to be dealing with a common audio format known as PCM or Pulse Code Modulation. Basically, the audio is sample at regular intervals and then converted into a digital value. The digital values are numerical representations of the original waveforms. The float values is the actual sound or pressure waves measured by the microphone.

For example, we can look at a simple sine wave to see what it would look like when sample over 10 seconds. A slightly offset wave is also shown.

<canvas id="line-chart" width="800" height="450"></canvas>
<script>
document.addEventListener("DOMContentLoaded", function(){

	var x = [];

	for(var i = 0; i < 40; i++){
		x.push( i / 4);
	}


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
	        data: x.map(i => Math.sin(i + (3.1415/2))),
	        label: "Sin(x + pi/2)",
	        borderColor: "#8e5ea2",
	        fill: false
	      }
	    ]
	  },
	  options: {
	    title: {
	      display: true,
	      text: 'Pulse Code Modulation (PCM)'
	    },
	    scales: {
		    yAxes: [{
		      scaleLabel: {
		        display: true,
		        labelString: 'PCM Value'
		      }
		    }],
		  xAxes: [{
		      scaleLabel: {
		        display: true,
		        labelString: 'Time (seconds)'
		      }
		    }]
		}     
	  }
	});
	
});
</script>

In practice, these values are given in an array, with the sampling rate known so you can calculate the time for each position in the array given when the audio recording started. So basically, we'll be receiving an array of floats representing the amplitudes of the sound for *n* timesteps.

We could feed these values directly into a neural network, but there's a catch. If we look at the graph above, the exact same frequency can give different values in a sample, depending on when you start recording. For example, if you started recording say a second later or earlier, the sound wave would be exactly the same, but the PCM values in the array would be offset. This would make it very difficult for the machine learning model to process, since the exact same sound can give very different input values.

Thankfully, there exists a mathmatical tool that we can use to avoid this issue - Fourier Transforms. There are videos and extensive explanations on fourier transforms, so we won't look too much into it, but the basic idea is that we can take the PCM values for an audio sample, and figure out what frequencies make up that sound.

<img src="{{ site.baseurl }}/images/fourier_transform.gif" alt="Fourier Transform"/>

Source : [Wikipedia - Fourier Transform](https://en.wikipedia.org/wiki/Fourier_transform)

In our example, the red waveform is the raw audio in PCM format, while the blue chart represents the frequencies that make up the original waveform, the X axis is the frequency and the Y axis is the quantity of a given frequency in the original sound. (**Note :** there is a real and imaginary part to the fourier transform that basically represent the magnitude and offset of the different signals)

In practice, we can calculate the fourier transform ourselves with the 
