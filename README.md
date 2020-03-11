# Trivia

Interactive-frontend-project

My project will be a trivia style Interactive site that is focused with the mobile first approach.
The game will target a list of categories with multiple questions that are pulled from an API.
The user can choose from 3 difficulties and play the game for the duration of the 10 questions.
I have opted to not have a timer as I want the game to be enjoyable for the user and take their time whilst playing.
The game will display the correct / incorrect answer on screen.
I have also chosen to only allow 10 questions per game.

## Showcase

A deployed link to the website can be found [here](https://nemixu.github.io/trivia-rooms/).

## UX

### User Stories

The end user of this project is someone who wishes to play a relaxed game and test their general knowledge and other topics.

The game is aimed to be a relaxing and fun game that can also be played with friends on all types of devices.

The end user want to play a game that shows the correct answer even if the answer they chose is wrong.

The user can use this application on their, mobile device, table and laptop / desktop.

- As a user I want to play a game that has multiple topics
- As a user I want the game to be easy to play and not difficult to navigate
- As a user I want to be able to see the score I am currently on
- As a user I want to be able to see the correct / incorrect answers when I click a selection
- As a user I want to play the topic again once I have finished
- As a user I want to be able play this game on multiple devices
- As a user I want a friendly and relaxing game that has no time limit

### Strategy

#### User Needs

The needs of the user is to fulfil the capabilites of using this application on their mobile and tablet devices. They need the information to be easily accessible and easy to digest.

#### Technical Capabilites

It is capable to do this project with the bootstrap framework in a timely manner and implemet features that the user needs. Manipulating the dom with both js and jquery proved to be the best option over loading new pages when a user interacts with the site.

It was not possible to implement leader boards in this release due to time restrictions and was not planned in the original scope of the project, but is something to consider for future releases.

#### Scope

For my audience I want to present a fun and enjoyable game that is easy to digest and can be accessed on mobile devices and larger devices.
If they enjoy the game they will continue to try new topics.

#### Structure

The structure of this project is fairly straight forward, it is a single page application that uses dom manipulation to display features and hide features per user clicks. If you choose a topic in the drop down menus it feels like you have been navigated to a new page, this is the natural flow I was aiming for as I dont want user experience to be damaged. I have structured the game that the user cannot become lost. It is start point - Choose a topic and a difficulty - Answer your set of questions - See your score - Choose to play again or a new topic.

#### Skeleton

WireFrames:

[Landing page Mobile](https://github.com/nemixu/trivia-rooms/blob/master/assets/images/wireframes/Landing%20page%20mobile.png),

[Landing page Tablet](https://github.com/nemixu/trivia-rooms/blob/master/assets/images/wireframes/Landing%20page%20tablet.png),

[Landing page Desktop](https://github.com/nemixu/trivia-rooms/blob/master/assets/images/wireframes/Landing%20page%20Desktop.png),

[Game page Mobile](https://github.com/nemixu/trivia-rooms/blob/master/assets/images/wireframes/Start%20page%20mobile.png),

[Game page Tablet](https://github.com/nemixu/trivia-rooms/blob/master/assets/images/wireframes/start%20page%20tablet.png),

[Game page Desktop](https://github.com/nemixu/trivia-rooms/blob/master/assets/images/wireframes/Start%20Page%20Desktop.png),

[End page mobile](https://github.com/nemixu/trivia-rooms/blob/master/assets/images/wireframes/End%20screen%20moble.png),

[End page Tablet](https://github.com/nemixu/trivia-rooms/blob/master/assets/images/wireframes/End%20screen%20tablet.png),

[End page Desktop](https://github.com/nemixu/trivia-rooms/blob/master/assets/images/wireframes/Desktop%20end%20screen.png),

## Features

Features in this game

### Existing Features

- Feature 1 - allows users to choose a category, by having them choose a category in the dropdown box.
- Feature 2 - allows users to choose a difficulty, by having the choose a difficulty in the dropdown box.
- Feature 3 - If a user chooses a category that has no information from the API it returns a modal explaining what happened.
- Feature 4 - Displaying green and red colours on the buttons to show a user if they were correct or not.
- Feature 5 - Score counter to show a user their current score.
- Feature 6 - Display a final score and congratulations text.
- Feature 7 - Allow a user to choose a new category or a new set of questions for the same category they originally chose.
- Feature 8 - Loading spinner to notify the user their questions are being fetched and displayed.
- Feature 9 - Footer links to follow me on github for future projects.

### Features Left to Implement

- Future Feature 1 - future release should have a section to store user local data and allow them to have a nickname and scoreboard.
- Future Feature 2 - Share your score to friends via social media.
- Future Feature 3 - Allow additional question numbers e.g 15 questions, 20 questions.
- Future Feature 4 - Add a timer if the user chooses for a timed game.

## Technologies Used

- HTML5
- CSS3
- Bootstrap v4.4.1
- ES6+ JavaScript
- Google Chrome Dev tools for debugging
- Google Light house for audits
- vsCode as IDE
- JQuery

## Testing

### Testing planning.

At the beginning of this project I knew I wanted a very linear game that would have few areas for a user to go in the wrong direction.
I took into consideration the potential devices the end user would be using.

I planned testing on the below devices.

Chrome tools.
Iphone 4 (320 x 480)
Iphone 5se (320 x 568)
Iphone 6 up to iphone X (375 x 667, 414 x 736, 375 x 812)

Hand held device testing
One plus 5
One plus 6
Iphone X max

Screen testing
Laptop 15.6" (1920 x 1080)
24" Desktop Screen (1920 x 1080)
28" Desktop Screen (1920 x 1080)

[Lighthouse Audit result](https://github.com/nemixu/trivia-rooms/blob/master/assets/images/MS2-audit.PNG)

### Version control

I have added this version control section to show the projects beginning as I created a new repository and ended up overwriting some of the master using gitbash for the first time. I switched from using gitpod to using vscode, hence the issues with some of the pushes.
The Original project will show the early stages of the project and the second commit list will show half way through - the standard project commit list will show the end section.

Apologies for how messy this section is but I wanted to ensure you seen the original commits from the start.

Here is the original repository:
[Original project](https://github.com/nemixu/Milestone-2),

Here is link to the set of commits added before overwriting it with a push from my local machine
[Second Commit list](https://github.com/nemixu/trivia-rooms/commits/d8daa825b5e8c69ab79b5d1110ab4067d7f5808d),

### Implementation

As this was my second project I had some prior experience testing with google chrome dev tools, light house and user testing with devices and trying out potential ways to break the application or cause it to fail in some way.

I began testing from the smallest screen possible, although the application was designed for mobile (a special breakpoint needed to be added for the iphone 4 as it is the smallest device)
The overal project was designed to be created using the mobile first approach and then scale upwards towards the larger scale screens and devices.

Testing was done manually for this project.

when you choose no category the form does not validate if it is a required field, this is a known issue with this project and I have been unable to resolve this issue wit the pressing time of submission however I have implemented something that both works for a form validator and if the array of questions returns empty, it pops up a modal stating there was an error and the user should choose a category.
This solution does indeed help the user understand something is wrong and does not leave the user staring at a blank set of questions and answers on the page.

On both mobile and desktop devices, a user was originally able to spam the answer box after they answered a question correctly or incorrectly, to stop this I added a feature via Jquery that disabled the button during the time it is applying the correct / incorrect class and a timeout function to handle how long it is disabled, this proved to be very beneficial and resolved the issue of users being able to spam the game and potentially breaking the game.

An issue that was very difficult to overcome, from the api data some of the special characters that would be presented in the array of questions such as 's or & would not allow me to validate if the question was correct or not because it would not be and equal match of the answer displayed on the dom, I attempted many times during the process to try new decode or encode methods found on stackover flow and w3schools, but nothing would handle the input correctly. After noticing that when the question was displayed on the dom, the browser was already handling the encoding correctly so a quick fix was to add a hidden HTML element that passed in the correct answer and pull it back from the browser to check vs the correct answer a user clicked. This ended up working exactly to how I needed and got me out of a tough situation. This is something that was not part of the codeinstitute course content and was very difficult for a beginner to resolve.

Testing was done in this order.

1. Open site and click on a category and difficulty.
2. Wait for questions to load then click on an answer (rinse and repeat until end of game).
3. Click multiple times after answering a question to see if you could click multiple times (does not work due to fix implemented).
4. Watch the counter increase after clicking a correct answer.
5. Once the game has finished click one of the buttons to play again or get a new quiz.
6. Click nav items to see if they direct to a new page.

Testing on mobile devices for landscape was also done: this application was not approached for a landscape screen and would advise a user to not play the game that way as it may not provide the best visual appearance.

A loading spinner was added to ensure smoother ux for a user as it would display sample questions before the data would come back from the promise. This in return adds a nice modern flare to the game whilst the user waits 2seconds for the questions to fully load.

On mobile devices the game displays the game in a column order, question above with the answers following underneath.
On a tablet device the game displays in a row of 2 and 2, 2 above and 2 below, this helps cover the screen area and makes the game easier to read for a user.
On a desktop view it has the same display but increases the text size as the screen resolution is higher.

## Bugs and problems

- API BUG -
  Issue with the api that has been identified - some of the results from the api come back with no objects inside the array this is due to the api not having questions for the specific topics, to overcome this I will be removing the topics that come back with no data from the array so the user experience is continued.
  Below is the topics from the api that are currently showing results of [];

The category ID's which have been removed are listed below
[13, 19, 24, 25, 29, 30]

- Url fetch issue
  Changing the parameter of my const URL was showing issues in the debugging process - I was using google chrome tools for debugging, I began using the breakpoints to pause the action of a function to ensure things were running correctly - I found I was getting a failed promise from the api response as the URL details were incorrect - only after debugging and spending time trying to resolve the issue proved that the spelling of one word was incorrect, once this was changed the api began pulling the information correctly once again.

- Issue with removing 6 empty objects from the array at categoryDropDown.append - this was proven to be an issue to write clean code without having four if statements. I wanted to try and have the cleanest solution possible for this problem. The .includes method was the best solution and provided clean code and more readable for someone reading.

- Issues without shuffle it would always put the same answer down on the answer area, I adopted Fisher-Yates Shuffle algorithm to resolve this and it now randomizes the questions and displays into the dom.

- was unable to show a user the correct answer if they clicked the wrong answer, so to improve the user experience of the game I decided to add a class that would check inside an if statement.

- Issue with the final 10th question, once a user clicks it does not apply the class due to being in the else statement with no further arguements, this was resolved with a settimeout function for 1 and a half seconds.

- Decoding issue with the api data e.g Mc Donald's would show McDonald%26%23039%3Bs, solution to this problem was created a hidden HTML element - pass it to the HTML element forcing the browser to correctly decode the characters for a later comparison

issues with symbols such as & not encoding correctly with the user of .innerTEXT so to fix this I used .innerHTML

Found issues during user testing, some of the Questions in the array and answers in the questionArray would have ('s, & ) in the string, this would prove difficult for some of the functions to not be able to validate if the question was correct or not. I will be attempting to resolve this issue using regex epressions.

Some of the api has no data in specific topics, so they have been removed, other categories may have some questions for easy and medium but not hard, so this is handled by checking if the questions array is 0 then display a modal to alert the user there is no questions and to check back or choose another category.

## Results and outcomes

Problems with the app having good results on Iphone SE and Iphone 4, it is causing overflow which has since been resolved.

Testing of site performance, best practices and seo score was done via Lighthouse and returned a score of
94% Performance
100% Accessibility
93% Best practices
88% Seo score

## Deployment

To deploy this page to github pages from the repository the following steps were taken:

1. Click the settings tab on the repository.
2. Scroll down to the Github pages section.
3. Under Source, click the drop-down menu and choose master branch.
4. Give it time to load the repo onto the link provided.
5. Go back to step 3 and copy or click the link provided.

To clone or run this project locally:

1. Under the repository name, click "clone or download".
2. In the clone with https section, copy the clone url or download zip.
3. In your local IDE open git bash.
4. Change the current working directory to the location where you want the cloned directory to be made.
5. Type git clone, and then paste the URL you copied in step 2.
   git clone [Clone link](https://github.com/nemixu/trivia-rooms.git)
6. Press Enter. Your local clone will be created.

Additionally if you have issues cloning this repo follow this link [Help with cloing a repo](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)

## Credits

### Content

- [Fisher-Yates shuffle](https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array) to randomize my questions
- Original inspiration came from [JamesqQuick](https://github.com/jamesqquick/Build-A-Quiz-App-With-HTML-CSS-and-JavaScript) this project helped me organise what was needed for example a question counter, empty array to push data into etc.
- Spinner for game loading [Brad Traversy](https://www.youtube.com/watch?v=BxpjA9t4dJE).
- bootstrap documentation [Modal popup](https://getbootstrap.com/docs/4.4/getting-started/introduction/)
- fontawesome was used for the favicions throughout the page [Font Awesome](https://fontawesome.com/).
- Balsamiq for wireframes
- w3schools for :hover classes

### Media

- The api resource is used from the opensource API - [Open Trivia DB](https://opentdb.com/)
- Background Image was sourced from [Pexels](https://www.pexels.com/)

### Acknowledgements

- I received inspiration for this project from my Mentor Simen Daehlin who suggested doing a project like this.
- Slack community for the help with small issues that I was overlooking.
- Reggie Morgan (Senior Dev) who gave suggestions on best practices and arrow functions and also user tested the game
- Philip Kearney for user testing the game
- Andrew Gorman user testing the game and helping break the game and improve ux.
- Fisher-Yates Shuffle to shuffle the answers and place them in different formation
