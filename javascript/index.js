// Mahika Dubey
// TIM 243 Social Computing
// W2019 UCSC

var friendsfile = "compiled_data.json";
var messageList = []
// Set up the SVG attributes
const w = 1400;
const h = 7000;
const delta = 100;
const margin = ({top: 60, right: 170, bottom: 30, left: 30});

var loaded = false;
var loadedsome = false;

var friendList = [];

var groupclr = '#76448A';
var privateclr = '#148F77';

// Create container div for styling purposes
var main = d3.select('body').append('div')
                .attr('id', 'main')
                .style('text-align', 'center');

var uploadDiv = main.append('div').attr('id', 'uploadDiv');
var loadFriends = uploadDiv.append('button')
                      .attr('id', 'loadFriends')
                      .text('Load All Friends Visualization')
                      .on('click', function() {
                        visualizeFriends(friendsfile);
                      });
var addFriends = uploadDiv.append('textarea')
                        .attr('id', 'friendNames');
var loadSomeFriends = uploadDiv.append('button')
                          .attr('id', 'loadSomeFriends')
                          .text('Load Some Friends')
                          .on('click', function() {
                            visualizeSome(friendList, friendsfile);
                          });

addFriends.on("input", function() {
  friendList = addFriends.property('value').split(', ');
  console.log(friendList);
});

var axisSvg = main.append('div').append('svg').attr('class','axisSvg');

// Create parent div for svg
var svgDiv = main.append('div')
                .attr('id', 'svgDiv')
                .style('width', w + "px")
                .style('height', h + "px")
                .style('display', 'inline-block');

// Append svg to the div
const svg = svgDiv.append("svg")
                .attr('width', w + 'px')
                .attr('height', h + 'px')
                .attr('id', 'svg');
