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
	  	legend :{
	  		labels :{
		  		fontColor : "#839496"
	  		}
	  	},
	    title: {
	      display: true,
	      text: 'Pulse Code Modulation (PCM)',
	      fontColor: "#839496"
	    },
	    scales: {
		    yAxes: [{
		      gridLines: {
			    color: "#839496"
			  },
		      ticks :{
		      	fontColor: "#839496"
		      },
		      scaleLabel: {
		        display: true,
		        labelString: 'PCM Value',
		        fontColor: "#839496"
		      }
		    }],
		  xAxes: [{
		  	  gridLines: {
			    color: "#839496"
			  },
		  	  ticks :{
		      	fontColor: "#839496"
		      },
		      scaleLabel: {
		        display: true,
		        labelString: 'Time (seconds)',
		        fontColor: "#839496"
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

We are going to use the Discrete Fourier Transform. We are going to calculate the amount of frequency *k* $ (X[k]) $ from the data points $x[n]$. The equation is as follows :

$$ X[k] = \sum_{n=0}^{N-1} x[n] \left(cos \left( \frac{2 \pi kn}{N} \right) - i \cdot sin \left( \frac{2 \pi kn}{N} \right) \right) $$

Each $ X[k] $ is a complex number representing the magnitude and offset of the given frequency *k* in the original sample. The frequency is k cycles per N samples. The magnitude and phase of the frequency can be computed, but we will only deal with the magnitude, which is calculated using :

$$ Magnitude(X[k]) = \sqrt{Re(X[k])^2 + Im(X[k])^2} $$

**Note** : Re and Im are the Real and Imaginary components of the complex number.

Now we have everything we need to be able to take an input from a microphone and transform it into a set of numerical values that a machine learning model could process. Below is the python 2 program that will take an input from a microphone, read in the PCM values, calculate the Discrete Fourier Transform and then graph the original sound wave and the fourier transform of the sound wave.

{% highlight python %}

# import all the libraries we will need for the audio processing
import pyaudio
import math
import struct
import matplotlib.pyplot as plt

# define the variables for the audio recording
CHUNK = 1024 # This is how many PCM values we will retrieve at a time
FORMAT = pyaudio.paInt16 # This is the numerical format for the PCM values, in this case a 16 bit signed integer
CHANNELS = 1 # how many channels to record, we only care about one channel for simplicity
RATE = 44100 # the sampling rate, this is how many PCM values would be recorded in a second
RECORD_SECONDS = 1 # this is how long our recording will be in seconds
WAVE_OUTPUT_FILENAME = "output_2.wav"

# define out discrete fourier transform function
def discrete_fourier_transform(PCM_VALUES):

	# array to keep track of the amplitudes of each frequency component
	amplitudes = []

	# length of PCM_VALUES array used in for loops, N corresponds to the N in the relevant equations
	N = len(PCM_VALUES)

	# iterate over each frequency components [0, N-1]
	for k in range(N):

		# initialize complex number for the specific frequency component
		complex_num = complex(0)

		# iterate over each data point in PCM_VALUES array
		for n in range(N):

			# calculate contribution of specific data point to specific frequency component
			complex_num += PCM_VALUES[n] * (math.cos(2*k*n*math.pi/float(N)) - 1j * math.sin(2*k*n*math.pi/float(N)))

		# calculate amplitude of frequency component
		amplitude = math.sqrt(complex_num.real**2 + complex_num.imag**2)

		# append magnitude of frequency component to amplitudes array
		amplitudes.append(amplitude)

	# return result for all frequency components
	return amplitudes

# initialize/instantiate pyAudio
p = pyaudio.PyAudio()

# create an audio stream to be able to read the input from the microphone
stream = p.open(format=FORMAT,
                channels=CHANNELS,
                rate=RATE,
                input=True,
                frames_per_buffer=CHUNK)

# have a list to record the PCM values
PCM_VALUES = []

print("* recording")

# figure out how many chunks we need, given the chunk size, the recording rate and the length of the recording
for i in range(0, int(RATE / CHUNK * RECORD_SECONDS)):

	# read in the data from the stream, this is a byte string
	# the length of the byte string is CHUNK * Num. Bytes per values
	# in our case, the number of bytes per value is 2 bytes per Int16 and CHUNK is 1024
	# so the length will be 2048
    data = stream.read(CHUNK)

    # specify the byte string format for the struct library, "h" denotes a signed Int16, then we multiply it by CHUNK so that we know how many Int16's we have
    byte_format = "h" * CHUNK

    # parse the byte string into a list of values using the struct library and append to the running list of all PCM values in the recording
    PCM_VALUES += struct.unpack(byte_format, data)

print("* done recording")

# close audio stream and pyaudio
stream.stop_stream()
stream.close()
p.terminate()

# for the sake of the visualization, we're only going to that the first CHUNK of data, in this case 1024 values
PCM_VALUES = PCM_VALUES[:CHUNK]

# plot the raw audio using matplotlib, y axis is PCM value, x axis is position in PCM array
plt.plot([i for i in range(len(PCM_VALUES))], PCM_VALUES)
plt.show()

# compute the fourier transform of our raw audio/PCM values
amplitudes = discrete_fourier_transform(PCM_VALUES)

# plot the fourier transform
plt.plot([i for i in range(len(amplitudes))], amplitudes)
plt.show()
{% endhighlight %}