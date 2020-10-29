# Random Task Picker (for Trello)

![image](https://github.com/HassanKanj/random-task-picker/blob/main/documentation/images/pick-random-task.jpg)


## Why?

Have you ever felt hesitant/overwhelmed about which task to work on next that you ended up doing nothing!?

Well, I made this fun project that will pick a random task for you, and it may actually be helpful.

The idea is simple, it is a CLI tool that you link to your Trello account, then you can use it without the need to open Trello app, it will pick a random task for you, and it has a feature to move the last picked task to your 'done' list once it is finished.

## Usage

**Note**: Before you proceed, make sure that `node` and `npm` are installed on your machine.

1- Clone (or download) this repository: `git clone https://github.com/HassanKanj/random-task-picker`

2- go to the project path `cd random-task-picker` and run `npm install`

3- Rename the file **env.sample** to **.env**

4- Set these variables in your **.env** file:

- **TRELLO_APP_KEY**: This is your app key (check below on how to retreive it).

- **TRELLO_USER_TOKEN**: This is your user token (check below on how to retreive it).

To get the the app key and the user token, first login to Trello, then go to this link: https://trello.com/app-key and follow the steps below:

![image](https://github.com/HassanKanj/random-task-picker/blob/main/documentation/images/trello-app-key.jpg)

![image](https://github.com/HassanKanj/random-task-picker/blob/main/documentation/images/trello-user-token-step-1.jpg)

![image](https://github.com/HassanKanj/random-task-picker/blob/main/documentation/images/trello-user-token-step-2.jpg)

5- After you successfully set the values, you are now ready to start the app, simply type: `npm run prod`

## User Interface / Functionalities

When you run the app for the first time, you will be asked to specify the default board, this will be the board used to retreive your tasks.
and you will also be asked to specify the 'tasks' list, and the 'done' list from that board.

A task will be picked randomly from the 'tasks' list, and once marked as done it will be moved to the 'done' list.

**Note:** You will only be asked to specify these values once and then they will be saved, so the next time you open the app you will go directly to the main menu, but of course you can change these settings later if you want.

### Main menu

![image](https://github.com/HassanKanj/random-task-picker/blob/main/documentation/images/main-menu.jpg)

1- **Pick a random task for me:** This will pick a random task for you from the 'tasks' list that you specified earlier.

2- **What was the last picked task?:** Sometimes you don't want to pick another random task but rather just check the last picked one.

3- **Mark the last picked task as done:** After you finish the last picked task, select this option to mark it as done, which will move the task to the 'done' list that you specified earlier.

4- **Show current configs:** This will print the current configs (default Trello board, tasks list name, done list name, etc..)

5- **Update current configs:**: This will update your configs (default Trello board, tasks list name, done list name, etc..)



## About the author

My name is Hassan Kanj, I am an independent programmer (Freelancer), a maker, and a 3D printing enthusiast.

In case you want to know more about my skills or if you would like to hire me, feel free to check my website for more details: https://www.hassankanj.com.

And here's my LinkedIn profile as well: https://www.linkedin.com/in/hassankanj 

## License

MIT License

Copyright (c) 2020 Hassan Kanj

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

