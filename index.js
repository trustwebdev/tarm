const jsonfile = require("jsonfile");
const simpleGit = require("simple-git");
const randomInt = require("./random.js").randomInt;

const FILE_PATH = "./data.json";

const makeCommit = (n) => {
  if (n === 0) return simpleGit().push();

  const DATE = new Date();

  // Set the date to January 1 of the current year
  DATE.setUTCMonth(0, 2);

  // Generate 30 commits for each day
  for (let i = 0; i < 30; i++) {
    const commitDate = new Date(DATE);
    commitDate.setDate(commitDate.getDate() + i);

    const data = {
      date: commitDate.valueOf(),
    };

    console.log(commitDate);

    jsonfile.writeFile(FILE_PATH, data, () => {
      // git commit --date=""
      simpleGit()
        .add([FILE_PATH])
        .commit(
          commitDate.toISOString(),
          { "--date": commitDate.toISOString() },
          makeCommit.bind(this, --n)
        );
    });
  }
};

makeCommit(10); 