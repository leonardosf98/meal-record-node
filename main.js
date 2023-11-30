const readlinePromise = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");
const rlp = readlinePromise.createInterface({ input, output });
let meals = [];
async function start() {
  console.log("Diário alimentar do Léo");
  showMeals();
  await askToAdd();
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
  let mealData = [];
  const addMeal = async () => {
    const mealName = await rlp.question("Digite um nome para a refeição: ");
    mealData.push(mealName);
    const mealTime = await rlp.question("Digite a data da refeição: ");
    mealData.push(mealTime);
    const mealDate = await rlp.question("Digite o horário da refeição: ");
    mealData.push(mealDate);
    mealData.push(await addMealItem());
    await askToAddFoodItem();
    meals.push(mealData);
    showMeals();
    await askToAdd();
  };
  const defaultFn = () => {
    console.log("Digite uma opção válida");
  };
  const failedFn = () => {
    console.log("Obrigado por usar nosso app!");
  };
  await booleanQuestion(
    'Deseja adicionar uma refeição? Digite "s" para sim ou "n" para não:\n',
    addMeal,
    failedFn,
    defaultFn
  );
  rlp.close();
}
async function booleanQuestion(question, successFn, failedFn, defaultFn) {
  const response = await rlp.question(question);
  if (response === "s") {
    return successFn();
  }
  if (response === "n") {
    return failedFn();
  }
  return defaultFn();
}

async function addMealItem() {
  const mealItem = { itemName: "", itemQuantity: "", solid: false };
  mealItem.itemName = await rlp.question("Digite o nome do alimento: ");
  mealItem.itemQuantity = await rlp.question(
    "Digite a quantidade do alimento: "
  );
  itemType = await rlp.question(
    "Esse alimento é sólido? Digite 's' para sim e 'n' para não: "
  );
  if (itemType === "s") {
    mealItem.solid === true;
  } else {
    mealItem.solid === false;
  }
  return mealItem;
}

async function askToAddFoodItem() {
  let response = await rlp.question(
    "Deseja adicionar mais algum alimento? Digite 's ' para adicionar ou 'n' para seguir: "
  );
  if (response === "s") {
    await addMealItem();
  } else {
    return;
  }
}
