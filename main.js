const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const rl = readline.createInterface({ input, output });
let meals = [];
function start() {
  console.log("Diário alimentar do Léo");
  showMeals();
  askToAdd();
}
start();
function showMeals() {
  if (meals.length === 0) {
    console.log("Nenhuma refeição registrada");
  } else {
    meals.map((item, index) => {
      console.log("Refeição ", index + 1);
      item.map((data) => {
        console.log(data);
      });
    });
  }
}

async function askToAdd() {
  rl.question(
    'Deseja adicionar uma refeição? Digite "s" para sim ou "n" para não:\n',
    (response) => {
      if (response === "s") {
        let mealData = [];
        const addMeal = () => {
          rl.question("Digite um nome para a refeição: ", (mealName) => {
            mealData.push(mealName);
            rl.question("Digite a data da refeição: ", (mealDate) => {
              mealData.push(mealDate);
              rl.question("Digite o horário da refeição: ", (mealTime) => {
                mealData.push(mealTime);
                meals.push(mealData);
                showMeals();
                askToAdd();
              });
            });
          });
        };
        addMeal();
      } else if (response === "n") {
        console.log("Obrigado por usar nosso app!");
        rl.close();
      } else {
        console.log("Digite uma opção válida");
      }
    }
  );
}
