import { tasks } from "./task.js"
import Controller from "./controller"
import "./style.css"

const menuElem = document.getElementById("menu")
const listElem = document.getElementById("list")

export const controller = new Controller(menuElem, listElem)

controller.displayTasks(tasks)

// DOM related

const listFormElem = document.getElementById("list-form")
const taskFormElem = document.getElementById("task-form")
const allListBtn = document.getElementById("btn-all")
listFormElem.addEventListener("submit", controller.handleListFormSubmit)
taskFormElem.addEventListener("submit", controller.handleTaskFormSubmit)
allListBtn.addEventListener("click", () => controller.displayTasks(tasks))

window.addEventListener("DOMContentLoaded", controller.loadStorageData)

// Quick util

export function capitalize(string) {
  return string.at(0).toUpperCase() + string.slice(1).toLowerCase()
}