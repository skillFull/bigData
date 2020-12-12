const fs = require('fs');

let data = fs.readFileSync('urlsVacancy.json', 'utf8');
data = JSON.parse(data);
let sortData = [];
data.forEach(element => {
    for(let i = 0; i < element.href.length; i++){
        let g = {};
        g.href = element.href[i];
        g.spec = element.spec[i];
        g.money = element.money[i];
        sortData.push(g);
    }
});
sortData = sortData.filter(el => el.money.length > ''.length);
let Data = JSON.stringify(sortData) 

fs.writeFileSync('sortVacancy.json', Data ,'utf8');

console.log(sortData);