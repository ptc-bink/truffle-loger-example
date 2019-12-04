const MyDapp = artifacts.require("./MyDapp.sol");

contract("LogTest", accounts => {
  it("...should log properly", async () => {
    const myDapp = await MyDapp.deployed();

    // Execute a transaction
    const tx = await myDapp.doSomething({ from: accounts[0] });

    // Take all events, filter for our special __Log event
    const logEvts = tx.logs.filter(x => x.event === "__Log");
    console.log("No. of detected __Log events: ", logEvts.length);

  });
});
