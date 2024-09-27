import Task, { tasks } from "./task.js"
import Controller from "./controller"
import "./style.css"

const menuElem = document.getElementById("menu")
const listElem = document.getElementById("list")
console.log(listElem)

export const controller = new Controller(menuElem, listElem)

Task.create("hello")
Task.create("world")
Task.create("daz")

controller.displayTasks(tasks) 




// DOM related

const listFormElem = document.getElementById("list-form")
const taskFormElem = document.getElementById("task-form")
const allListBtn = document.getElementById("btn-all")
listFormElem.addEventListener("submit", controller.handleListFormSubmit)
taskFormElem.addEventListener("submit", controller.handleTaskFormSubmit)
allListBtn.addEventListener("click", () => controller.displayTasks(tasks))