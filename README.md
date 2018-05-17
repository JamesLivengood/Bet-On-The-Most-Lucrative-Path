# Bet On The Most Lucrative Path

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

BotMLP is a gambling game featuring a custom built random maze generator using DFS node trees visualized in Canvas. 

[Live Site](https://jameslivengood.github.io/Bet-On-The-Most-Lucrative-Path/)

![Gif of maze generation](https://media.giphy.com/media/iMC9a1kBc8XZn8Qk5V/giphy.gif)

BotMLP also features a live node tree visualizer, which builds as the maze builds, to see the parent-child relationship that is used to solve the fastest maze path.


![Gif of maze / node tree generation](https://media.giphy.com/media/3HLBdudgdHWy24gBpT/giphy.gif)

## OOP

In order to create the maze, BotMLP uses an OOP design featuring a Grid, Nodes at each square of the Grid, and a Game class that coordinates everything together. 

## Random Maze Generation

The maze generator starts at the beginning of the maze, and chooses a random unvisited neighbor. Once it chooses that neighbor, it moves there, sets the parent-child relationship between the two nodes, and then checks again for unvisited neighbors. If the navigator gets "stuck," or has no unvisited neighbors, it will then backtrack through a queued history, until it reaches a node with at least one unvisited neighbor. 

## Visualizing the Maze

In order to visualize the maze, the maze generator creates walls. As the navigator visits each node, it creates a wall on every side unless that wall is connected to a parent or a child.

## async / await

To run the game logic, BotMLP relies heavily on JavaScript async / await. For example, the countdown timer cannot start until both mazes finish randomly generating, which takes a varying amount of time depending on how much back-tracking occured. Once both finish, a promise returns which triggers the countdown timer and allows the user to pick a side.
