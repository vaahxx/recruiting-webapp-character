# recruiting-webapp-character
This is my submission for the RPG Character Management coding assignment. I have completed the following requirements within the given time limit of 2 hours:

### Completed Requirements
- Created state and controls for each of the 6 attributes (Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma) to increment/decrement independently.
- Displayed classes on the screen and visually changed the UI when the character meets the minimum requirements for a class.
- Implemented the functionality to display the minimum required statistics for a class when clicked.
- Added ability modifiers to each attribute row based on the provided formula.
- Saved the characters to an API endpoint for persistence using a POST request and retrieved the data using a GET request.

Note: I was unable to implement the skills functionality (item 5) within the time restrictions. As I am not familiar with RPG concepts, it took me more time to understand the requirements and design a suitable solution. Unfortunately, I ran out of time to complete this part of the assignment.

### Insights
Although I faced a few challenges due to my lack of familiarity with RPG concepts, this coding assessment provided a valuable learning experience. I had the opportunity to work within a limited time frame and encountered a scenario where I needed to prioritize tasks. This challenge allowed me to improve my problem-solving skills and time management, and just because of that it was worth of doing.

### Steps to implement the remaining items
Here are high-level steps for how I would implement the remaining items if I had more time:

#### Implement Skills:

- Create a section in the UI to display each skill from the SKILL_LIST separately.
- Calculate the available skill points for each character based on the formula provided: 10 + (4 * Intelligence Modifier).
- Allow the user to allocate skill points to different skills for each character. Ensure that the points allocated for a skill do not exceed the available skill points.
- Display the points allocated, the ability modifier corresponding to the skill, and the total skill value (points + ability modifier) for each skill.

#### Implement Maximum Attribute Limit:

- Implement logic to check if the total attribute value exceeds 70 for any character.
- If the total attribute value is equal to 70, restrict the user from increasing another attribute until they decrease one.

#### Edit Multiple Characters:

- Modify the UI to support multiple characters simultaneously.
- Implement a map method that renders the main component for each class.
- Ensure that the rules and validations mentioned in the previous requirements apply to each character independently.

#### Skill Check Section:

- Add a separate section in the UI to perform skill checks for each character.
- Provide a dropdown to select the skill from the SKILL_LIST for the check.
- Include an input field to collect the DC (minimum value for success) for the skill check.
- Add a "Roll" button that triggers the generation of a random number between 1 and 20 (inclusive).
- Display the random number generated, and indicate whether the skill check was successful or a failure based on the comparison.

#### Party Skill Check Section:

- Implement a separate section for party skill checks.
- Determine the character with the highest total skill value across all characters.
- Use the highest-scoring character to attempt the skill check, following the same procedure as in the individual skill check section.
- Indicate which character was selected for the action in the UI.

### Installation and Usage
- Clone this repository to your local machine.
- Install the required dependencies by running npm install.
- Start the application with npm start.
- Access the RPG Character Management app through your browser at http://localhost:3000.

### Contact Information
If you have any questions or feedback regarding this coding assessment, please feel free to reach out to me via email at valengarav@gmail.com. I am open to discussing any aspects of the project and appreciate your time and consideration.

Thank you for reviewing my submission!

Best regards,
Valentina

_____________________________

# Create a repository from this template
- Click on `Use this template` dropdown on this repo page.
- select `Create a new repository`
- Write a name of the repo as `recruiting-webapp-character`
- Select `Public` as visibility
- Click `Create repository`

# Run the application
- Clone the newly created repo locally
- Run the following command to install node modules
```
npm i
```
- Run the following command to start web app
```
npm start
```

# Submitting your code
- Make sure your app can be set up and run via the following two commands: `npm i` and `npm start`
- Reply to the coding exercise email you received from our team with the link to this new public repository.

# Instructions

You will build a small web app around creating a character sheet for a tabletop RPG game like DnD, Pathfinder etc.

Find the requirements below, but it’s not expected that all of them will be complete. Please work in top-down order as best you can, unless you feel the need to move on because you’re stuck etc.

The goal is to see some of your code in the context of this problem, if things look good we’ll schedule a followup meeting to discuss the implementation details, some design choices you made, how we might extend this further, and some other technical questions.

Please spend NO MORE THAN 2 hours on this. We don’t expect all requirements to be completed, and are more interested in your approach to the project and how you’re solving problems than the output at the end of this 2-hour limit.

Please view this short video of a partial implementation of the features below to give you an idea of what we’re asking for: https://www.loom.com/share/3afa00385d2d4fbc9720b88360036a54

Styling is not important, so long as the JS functionality is present and usable.

The 2 hours begins once you've read these instructions and run the application.

## What is a character sheet?

Character sheets are defined by the following high-level concepts
- Attributes: This represents a character's raw abilities 
- Attribute Modifier: calculated using the related Attribute, this value affects a character's skills
- Skills: A character's ability to perform a specific action



## Requirements

1. Create state and controls for each of the 6 attributes (see `ATTRIBUTE_LIST`) so they can be incremented/decremented independently.
2. Display classes on the screen (see `CLASS_LIST`) and visually change the UI when the character meets the minimum requirements for that class, that is, all attributes are greater than or equal to the class minimums
3. When clicking on a class, display the minimum required statistics for that class
4. Add an “ability modifier” to each attribute row, this is calculated as +1 for each 2 points above 10, for any attribute (let's take Intelligence for example) we would have the following ability modifiers for a given ability
  - Intelligence: 7 -> Intelligence Modifier: -2
  - Intelligence: 9 -> Intelligence Modifier: -1
  - Intelligence: 10 -> Intelligence Modifier: 0
  - Intelligence: 11 -> Intelligence Modifier: 0
  - Intelligence: 12 -> Intelligence Modifier: 1
  - Intelligence: 14 -> Intelligence Modifier: 2
  - Intelligence: 20 -> Intelligence Modifier: 5
5. Implement skills. See `SKILL_LIST` for the list of all skills and their attribute modifier 
  - Characters have 10 + (4 * Intelligence Modifier) points to spend between skills.
    - There is a minimum of 0, but no maximum aside from the total points available to spend.
    - for example, if a character has a 1 Intelligence Modifier, they may spend 14 points, and could add 7 to both Acrobatics and Perception (then would have no more to spend on others)
  - The total value of a skill is the sum of points spent and the skill’s corresponding ability modifier (see `SKILL_LIST` for what ability modifier affects each skill). 
    - For example. a character with a 2 Dexterity Modifier and spending 3 points on Acrobatics would have a total skill value of 5
  - Display each skill in a row in a separate section. For example, Acrobatics 
    - for a character with 12 dexterity may look like `Acrobatics - points: 3 [+] [-] modifier (Dex): 2 total: 5`
6. Save the character(s) to an API so they can be retrieved when the app starts next time. 
    - Make a post request with a JSON payload to https://recruiting.verylongdomaintotestwith.ca/api/{{github_username}}/character to save data, and a get request to https://recruiting.verylongdomaintotestwith.ca/api/{{github_username}}/character to retrieve the data. It will accept any valid JSON blob and return the most recent version
    - for example, if your github username is mjohnston, you would use https://recruiting.verylongdomaintotestwith.ca/api/{mjohnston}/character (include the curly braces)
    - you must include a content-type header of application/json for the post to be accepted 
7. Implement a maximum on all attributes of 70. For example, if a character has 20 strength and 10 for all other attributes, they must decrease one before they can increase another
8. Add the ability to edit multiple characters simultaneously with the same rules above
9. Add a Skill Check section for each character. This represents a character's attempt to perform an action
    - the character is successful if they meet or exceed the DC (see below) of the skill check. Add the total skill to a random number between 1 and 20 inclusive, if this meets or exceeds the DC the skill check is successful, otherwise it's a failure
    - Add the following controls to the UI
      - skill: a dropdown to specify what skill we're using in the check, see `SKILL_LIST`
      - DC: An input that collects a number. The minimum value the character must meet to succeed
      - Roll: a button that will trigger the random number generation
    - When the Roll button is clicked, display the following
      - What the random number generated was
      - If the skill check is successful or a failure
10. Add a party skill check section. This is the same as the above, except we should use the character with the highest skill total to attempt the action
  - Show which character was selected to attempt the action
