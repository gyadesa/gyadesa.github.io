var fs = require('fs')
var R = require('ramda')

var countryData = fs.readFileSync('countries.csv', 'utf8')

var splitByNewLines = countryData.split('\n')



var splitByTabs = splitByNewLines.map(function(record){ 
    
    return record.split('\t').map(function(element, i) {
            if (i === 3) {
                return element.split('\r')[0]
            } else {
                return element
            }
        })
 
})
 var locationObject = splitByTabs.map(function(locationArray){
return JSON.stringify({
      countryCode : locationArray[0],
     lat : locationArray[1],
     lng : locationArray[2],
      countryName: locationArray[3]

  })
})
 console.log(splitByTabs)
 
fs.writeFileSync('countryData.js', JSON.stringify(locationObject))

