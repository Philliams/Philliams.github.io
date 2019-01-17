---
layout: post
mathjax: true
title: Amadios - Part 1
---

A couple years ago, I worked on this really cool project called Amadios (a mashup of Amadeus Mozzart and iOS) for a demo competition. Basically, I made an iOS app that would take live audio and convert it to sheet music in real time. A lot of my friends and coworkers found this really cool, so I thought I'd make a series of blog posts explaining how this was accomplished.

In N-dimensional simplex noise, the squared kernel summation radius $r^2$ is $\frac 1 2$
for all values of N. This is because the edge length of the N-simplex $s = \sqrt {\frac {N} {N + 1}}$
divides out of the N-simplex height $h = s \sqrt {\frac {N + 1} {2N}}$.
The kerel summation radius $r$ is equal to the N-simplex height $h$.

$$ r = h = \sqrt{\frac {1} {2}} = \sqrt{\frac {N} {N+1}} \sqrt{\frac {N+1} {2N}} $$

<canvas id="radar-chart" width="600" height="800"></canvas>
<script>
document.onload = function(){
    var notations = {
        0:"",
        1:"no",
        20:"Theory",
        50:"proficient",
        70:"Great",
        90:"outstanding",
            }

    new Chart(document.getElementById("radar-chart"), {
        type: 'radar',
        
        data: {
            labels: ["GNU/Linux", "Android Development", "Core Java", "Frontend HTML/CSS", "UI / UX", "Blogging", "Database", "Javascript", "Windows", "CMS(Wordpress)"],
            datasets: [{
                label: "2017",
                fill: true,
                backgroundColor: "rgba(51,133,255,0.2)",
                borderColor: "rgba(51,133,255,1)",
                pointBorderColor: "#fff",
                pointBackgroundColor: "rgba(51,133,255,1)",
                data: [33, 49, 50, 67, 39, 80, 60, 50, 90,80]
            }, {
                label: "2018",
                fill: true,
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                pointBorderColor: "#fff",
                pointBackgroundColor: "rgba(255,99,132,1)",
                pointBorderColor: "#fff",
                data: [60, 67, 80, 68, 50, 90, 80, 60, 90,81]
            }]
        },


        options: {
            scale: {
                responsive: true,
                ticks: {
                    display: true,
                    min:0,
                    beginAtZero: true,
                    max: 100, 
                    userCallback: function (value, index, values) {
                        if( typeof notations[value]!="undefined")
                        {
                             return notations[value];
                         }
                    else {
                      return value;
                           }

                },
                },

                gridLines: {
                    display: true,
                    color: [
                        "rgba(245, 245,220,1)",
                        "rgba(0, 0,255,0.1)",
                        "rgba(165, 42,42,0.1)",
                        "rgba(0, 255,255,0.1)",
                        "rgba(0, 0,139,0.3)",
                        "rgba(0, 139,139,0.1)",
                        "rgba(169, 169,169,1)",
                        "rgba(0, 100,0,0.1)",
                        "rgba(189, 22,107,0.1)",
                        "rgba(139, 0,139,0.1)",
                        "rgba(139, 0,139,0.1)",
                        "rgba(139, 0,139,0.1)",


                    ], 
                },

                angleLines: {
                    display: true,
                    color: "red",
                },
                pointLabels: {
                    // callback: function(value, index, values) {
                    //     return '$' + value;
                    // }
                    fontColor: '#' + Math.random().toString(16).slice(2, 8).toUpperCase(),
                },
            },
            legend: {
                display: true
            },
            title: {
                display: false,
                // text: 'Skill Set'
            },
        }
    });
}
</script>