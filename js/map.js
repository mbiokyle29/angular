// Genome length
genomeLength = 172281;
var ncbi = 'NC_007605.1';

// Read in the tsv file
var scaler = d3.scale.linear()
.domain([0, genomeLength])
.range([0, 5000]);

var axis = d3.svg.axis()
.scale(scaler)
.orient("bottom")
.ticks(scaler(1000));

var geneSet = [];
var gene;
var currGene;

d3.tsv("public/EBV-B958_version1_0.gtf.txt", function(data) {
  data.forEach(function(line) {
    if(line != "\n")
    {
      attributes = line.ATTRIBUTE.split("; ");
      geneID = attributes[0].split(" ")[1].replace(/"/g,"");
      start = parseInt(line.START);
      end = parseInt(line.END);
      if(end > start)
      {
        length = end - start;
      } else {
        length = start - end;
      }
      
      feature = 
      {
        start: start,
        stop: end,
        type: line.FEATURE,
        strand: line.STRAND,
        gene: geneID,
        length: length,
      };
      
      if(!currGene)
      {
        currGene = geneID;
        gene = [];
        gene.push(feature);
      } else if(currGene === geneID) {
        gene.push(feature);
      } else {
        geneSet.push(gene);
        gene = [];
        currGene = geneID;
        gene.push(feature);
      }
    }
  })

  var svgContainer = d3.select(".map-container").append("svg")
    .attr("width", scaler(genomeLength+500))
    .attr("height", 600);

  svgContainer.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "#A1A194")
    .style("fill-opacity", .2);

  var topFrame = 0;
  var bottomFrame = 0;
  var groups = svgContainer.selectAll("g")
    .data(geneSet)
    .enter()
    .append("g")
      .attr("id", function(d) { return d[0].gene; })
      .on("click", function(d) {
        vex.open({
          content: generateContent(d, ncbi),
          afterOpen: function($vexContent) {
            return $vexContent.append($el);
          }
        });
      })
    .each(function(gene) 
    {
      var g = this;
      gene = _.sortBy(gene, function(feature) { return !feature.type.match("codon"); });
      gene.forEach(function(feature) 
      {
        d3.select(g).append("rect")
        .attr("class", buildClass(feature))
        .attr("width", scaler(feature.length))
        .attr("height", 10)
        .attr("x", scaler(feature.start)+10)
        .attr("y", mapVertical(feature.strand, topFrame, bottomFrame, feature.type));
      })

      if(gene[0].strand === "+") {
        topFrame === 2 ? topFrame = 0 : ++topFrame;
      } else {
        bottomFrame === 2 ? bottomFrame = 0 : ++bottomFrame;
      }
    });

  svgContainer.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(10,490)")
    .call(axis);

  svgContainer.append("line")
    .attr("x1", scaler(10))
    .attr("x2", scaler(172281))
    .attr("y1", 250)
    .attr("y2", 250);
});


var svgContainer = d3.select(".legend").append("svg")
    .attr("width", "100%")
    .attr("height", 50);
var types =  ['exon', 'intron', '_3UTR', '_5UTR', 'CDS','start_codon_leg', 'stop_codon_leg'];
var legend = svgContainer.append("g");

var legendGroups = legend.selectAll("g")
  .data(types)
  .enter()
  .append("g");

var xPointer = 250;
var count = 0;
legendGroups.append("rect")
  .attr("class", function(d) { return d; })
  .attr("width", 20)
  .attr("height", 10)
  .attr("x", function(d) { 
    loc = xPointer;
    xPointer += 75 + (d.length*3);
    return loc;
  })
  .attr("y", 5);

xPointer = 280;
legendGroups.append("text")
  .text(function(d) { 
    d = d.replace(/_/g, " ");
    d = d.replace("leg", "");
    return d;
  })
  .attr("x", function(d) { 
    loc = xPointer;
    xPointer += 75 + (d.length*3);
    return loc;
  })
  .attr("y", 14)
  .attr("font-family", "Ubuntu Condensed");

function mapVertical(strand, topFrame, bottomFrame, type) 
{
  var base;
  switch(type)
  {    
    case "intron":
      base = 5;
    break;

    case "exon":
      base = 20
    break;

    case "start_codon":
    case "stop_codon":
    case "CDS":
      base = 35;
    break;

    case "3UTR":
      base = 50;
    break;

    case "5UTR":
      base = 50;
    break;
  

  }
  if(strand == "+")
  {
    switch(topFrame)
    {
      case 0:
        return base;
      break;
      case 1:
        return base+80;
      break;
      case 2:
        return base+160;
      break;
    }
  } else {
    switch(bottomFrame)
    {
      case 0:
        return base+250;
      break;
      case 1:
        return base+330;
      break;
      case 2:
        return base+410;
      break;
    }
  }
}

function buildClass(feature)
{
  var classString = feature.gene;
  var type = feature.type;
  
  if(type.match("UTR"))
  {
    type = "_".concat(type);
  }

  classString = classString.concat(" ", type);
  return classString;
}

function generateContent(gene, ncbiNumber)
{
  // Sort first
  sortedGene = _.sortBy(gene, function(feature) {
    return feature.start;
  });

  var content;

  // Search Link
  content = '<h2>' + gene[0].gene + " - ";
  content += "<a class='blue-accent' href='http://www.ncbi.nlm.nih.gov/gene/?term=EBV+"+gene[0].gene+"'";
  content += ">NCBI Gene</a><span>  |  </span>";

  
  // Fasta link
  var start = _.min(sortedGene, function(feature) { return feature.start;   }).start;
  var end =   _.max(sortedGene, function(feature)   { return feature.stop;    }).stop;

  var fastaUrl = "http://www.ncbi.nlm.nih.gov/nuccore/"+ncbiNumber+"?report=fasta&from="+start+"&to="+end;
  
  content += "<a class='blue-accent' href='"+fastaUrl+"'>  FASTA </a></h2>";

  content += '<ul>';
  sortedGene.forEach(function(feature) {
    var featureContent = '<li>';
    var type = feature.type;
    type = type.replace("_", " ");
    featureContent += type+": "+feature.start+"-"+feature.stop;
    content += featureContent;
  });
  content += '</ul>';
  return content;
}
