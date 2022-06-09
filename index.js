#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "Are you a programmer? Take this quiz and prove it xD\n"
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue("HOW TO PLAY")} 
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed("killed")}
    So get all the questions right...
  `);
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
  } else {
    spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
    process.exit(1);
  }
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });

  playerName = answers.player_name;
}

function winner() {
  console.clear();
  figlet(`Congrats , ${playerName} !\n Verified `, (err, data) => {
    console.log(gradient.pastel.multiline(data) + "\n");

    console.log(
      chalk.green(
        `Programming isn't about what you know; it's about making the command line look cool`
      )
    );
    process.exit(0);
  });
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "What two words every programmer learned to code first?\n",
    choices: [
      "Prog Ramming",
      "Hello World",
      "Software Engineering",
      "Mama Baba",
    ],
  });

  return handleAnswer(answers.question_1 === "Hello World");
}

async function question2() {
  const answers = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message: "What is the most popular programming problem?\n",
    choices: [
      "Programming is the problem",
      "Adding an extra bracket",
      "We have no problems",
      "Missing a semicolon",
    ],
  });
  return handleAnswer(answers.question_2 === "Missing a semicolon");
}

async function question3() {
  const answers = await inquirer.prompt({
    name: "question_3",
    type: "list",
    message: `Where did programmers learn to program?\n`,
    choices: ["Universities", "Bootcamps ", "StackOverflow", "Dark rooms"],
  });

  return handleAnswer(answers.question_3 === "StackOverflow");
}

async function question4() {
  const answers = await inquirer.prompt({
    name: "question_4",
    type: "list",
    message: "What is the golden rule in programming?\n",
    choices: [
      "If it works, don’t touch it",
      "Never write code from scratch",
      "NEVER update your IDE",
      "You don't code, you google it", // Correct
    ],
  });
  return handleAnswer(answers.question_4 === "If it works, don’t touch it");
}

async function question5() {
  const answers = await inquirer.prompt({
    name: "question_5",
    type: "list",
    message: "How do programmers propose?\n",
    choices: [
      "Using a ring",
      "Push their statement to github",
      "Programmers don't propose, ارفع علومك!",
      "They use sudo",
    ],
  });

  return handleAnswer(answers.question_5 === "They use sudo");
}

async function question6() {
  const answers = await inquirer.prompt({
    name: "question_5",
    type: "list",
    message: "Why do programmers keep pressing the F5 button?\n",
    choices: [
      "It looks cool",
      "To save their work",
      "Because it’s refreshing",
      "It does nothing",
    ],
  });

  return handleAnswer(answers.question_5 === "Because it’s refreshing");
}

async function question7() {
  const answers = await inquirer.prompt({
    name: "question_5",
    type: "list",
    message: "Why should you marry a programmer?\n",
    choices: [
      "They are not afraid to commit",
      "They make a lot of money",
      "Why shouldn’t you?",
      "You shouldn’t",
    ],
  });

  return handleAnswer(answers.question_5 === "They are not afraid to commit");
}

// Run it with top-level await
console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await question6();
await question7();
winner();
