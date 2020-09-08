const { fetchPeople } = require("./service");

Array.prototype.myFilter = function (callback) {
  const lista = [];
  for (index in this) {
    let item = this[index];
    const result = callback(item, index, this);
    if (!result) continue;
    lista.push(result);
  }
  return lista;
};

async function main() {
  try {
    const { results } = await fetchPeople("a");
    // let names = results.results.filter(person => person.name == "Darth Vader")
    // let familyLars = results
    // .filter(person => {
    //         if (person.name.toLowerCase().indexOf('lars') != -1) {
    //             return person
    //         }
    //     })
    let familyLars = results
      .myFilter((person) => {
        console.log(person);
        if (person.name.toLowerCase().indexOf("lars") != -1) return person;
      })
      .map((person) => person.name);
  } catch (error) {
    console.log("error", error);
  }
}

main();
