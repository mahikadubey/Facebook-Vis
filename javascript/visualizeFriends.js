function visualizeFriends(filename) {
  console.log(filename);


  Promise.all([
    d3.json(filename)
  ])
  .then(([data]) =>  {

    svg.selectAll("*").remove();

    var friends = reformatFriends(data);
    friends.sort(custom_sort);
    var messages = getMessages(friends);
    //console.log(friends);

    var xscale = d3.scaleTime()
                    .domain([friends[friends.length-1].time, friends[0].time])
                    .range([margin.left, w-margin.right]);

    var y = d3.scaleLinear()
                    .domain([friends.length, 0])
                    .range([h-margin.bottom, margin.top]);

    var yscale = d3.scaleLinear()
                    .domain([0, friends.length])
                    .range([h-margin.bottom, margin.top]);

    /*var yAxis = svg.append('g').attr('id', 'y-axis')
                    .attr('transform', `translate(${margin.left},0)`)
                    .call(d3.axisLeft(yscale).ticks(w/100).tickSizeOuter(0));*/

    var xAxis = svg.append('g').attr('id', 'x-axis')
                    .attr('transform', `translate(0,${margin.top})`)
                    .call(d3.axisTop(xscale).ticks(w/100).tickSizeOuter(0));


    var legend = svg.append('g').attr('id', 'legend');
    var group = legend.append('circle')
                    .attr('cx', w-margin.right+20)
                    .attr('cy', margin.top/2)
                    .attr('r', 5)
                    .attr('fill', groupclr);
    var grptxt = legend.append('text')
                    .attr('x', w-margin.right+30)
                    .attr('y', (margin.top/2)+5)
                    .text('Group Message')
                    .attr('font-size', 13)
                    .attr('font-family', 'Geneva')
    var private = legend.append('circle')
                    .attr('cx', w-margin.right+20)
                    .attr('cy', (margin.top/2)+15)
                    .attr('r', 5)
                    .attr('fill', privateclr);
    var prvtxt = legend.append('text')
                    .attr('x', w-margin.right+30)
                    .attr('y', (margin.top/2)+5+15)
                    .text('Private Message')
                    .attr('font-size', 13)
                    .attr('font-family', 'Geneva')



    var timelines = svg.append('g').attr('id', 'friend-timelines')
                      .selectAll('rect').data(friends).enter()
                      .append('rect')
                      .attr('x', function(d) { return xscale(d.time)-5; })
                      .attr('y', function(d,i) { return yscale(i); })
                      .attr('width', function(d) {
                        var begin = xscale(d.time);
                        var end = xscale(friends[0].time);
                        return (end-begin)+15;
                      })
                      .attr('height', 10)
                      .attr('fill', '#bdc3c7')
                      .attr('rx', 5)
                      .attr('ry', 5)
                      .style('opacity', 0.5);

    var mcircles = svg.append('g').attr('id', 'message-circles')
                      .selectAll('circle').data(messages).enter()
                      .append('circle')
                      .attr('cx', function(d) { return xscale(d.message); })
                      .attr('cy', function(d) { return yscale(d.friend)+5; })
                      .attr('r', 5)
                      .style('opacity', 0.5)
                      .attr('fill', function(d) {
                        if (d.type === 'group') {
                          return groupclr;
                        } else {
                          return privateclr;
                        }
                      });

    var labels = svg.append('g').attr('id', 'text-labels')
                      .selectAll('text').data(friends).enter()
                      .append('text')
                      .attr('font-size', 13)
                      .attr('font-family', 'Geneva')
                      .attr('x', w-margin.right+15)
                      .attr('y', function(d,i) { return yscale(i) + 10; })
                      .text(function(d) { return d.name; });


  });
  // Do your stuff. Content of both files is now available in stations and svg
  //d3.json(filename).then(function(data) {




}

function getMessages(friends) {

  var messages = [];

  friends.forEach(function(data, i) {
    //console.log(i);

    data.private.forEach(function(p) {
      entry = {friend: i, message: p, type: 'private'};
      messages.push(entry);
    })

    data.group.forEach(function(g) {
      entry = {friend: i, message: g, type: 'group'}
      messages.push(entry);
    })
  })

  return messages;

}

function custom_sort(a, b) {
  return new Date(b.time) - new Date(a.time);
}

function reformatFriends(friends) {
  friends.forEach(function(d) {
    d.time = new Date(1000 * d.timestamp);

    private_message_dates = [];
    d.private.forEach(function(p) {
      private_message_dates.push(new Date(p));
    })
    d.private = private_message_dates;

    group_message_dates = [];
    d.group.forEach(function(g) {
      group_message_dates.push(new Date(g));
    })
    d.group = group_message_dates;

  })
  return friends;
}
