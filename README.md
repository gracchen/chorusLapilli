CS 35L Eggert due May 1, 2022

Assignment 3 - Chorus-Lapilli
codepen.io demo: https://codepen.io/graychen03/pen/rNJNrry

![image](https://user-images.githubusercontent.com/103862883/166164107-829a1041-0607-431f-b253-9b832b3dcc65.png)

Rules:
Chorus lapilli is like tic-tac-toe in that players take turn placing pieces on a 3×3 board and the goal is to get three pieces in a row. However, it differs from tic-tac-toe in two ways:

After your first three moves, instead of adding further pieces you must instead move one of your existing pieces to an empty square that is adjacent vertically, horizontally, or diagonally. Therefore, after your third move you always occupy three squares.
If you have three pieces on the board and one of your pieces is in the center square, you must either win or vacate the center square in your next move.

==================================================

Running the game locally: 

1. 
in command prompt in windows: 
SET PATH=C:\Users\grace\Downloads\node 16.14.2\node-v16.14.2-win-x64;%PATH%
this temporarily includes the directory where my node installation is located on my computer into the PATH variable so the command prompt can find npm and node

2. 
cd C:\Users\grace\ReactProjects
command prompt is now in ReactProjects folder

3.
npx create-react-app my-app
cd C:\Users\grace\ReactProjects\my-app
now react has created a project for me in the directory I navigated to. 

4.
now, unzip my chorus-lapilli.tgz file in a different place
inside it's package folder, copy everything and paste in C:\Users\grace\ReactProjects\my-app
and select "replace all the files in the destination"

5. 
type: 
npm start

6. now the react project will open up in the browser with address "localhost:3000"
and it should say "next player: X" followed by an empty 3x3 box.
now, the game should work as normal in the browser


![image](https://user-images.githubusercontent.com/103862883/166164249-cc775816-5450-4a08-ae69-ab57c80b816f.png)
