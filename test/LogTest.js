const MyDapp = artifacts.require("./MyDapp.sol");

contract("LogTest", accounts => {
  it("...should log properly", async () => {
    const myDapp = await MyDapp.deployed();

    // Execute a transaction
    const tx = await myDapp.doSomething({ from: accounts[0] });

    // Take all events, filter for our special __Log event
    const logEvts = tx.logs.filter(x => x.event === "_TruffleLog");
    console.log("No. of detected _TruffleLog events: ", logEvts.length);

    // For each __TLog event
    logEvts.forEach(evt => {
      const result = evt.args;

      // A mapping to show how to output into our console
      const outputMap = {
        num: result[0].toString(),
        boolean: result[0],
        str: result[0],
        b32: result[0],
        addr: result[0],
      };

      // A list of all "supported" types: ["num", "boolean", "str", ...]
      const types = Object.keys(outputMap);

      // Find out what type our result is, and log it out if it matches
      types.forEach(type => {
        if (result.hasOwnProperty(type)) {
          console.log(outputMap[type]);
        }
      });
    });
  });
});
