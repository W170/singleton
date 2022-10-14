import {PgConnectionManager} from "./PgConnectionManager.class";

describe("Singleton test suit", () => {

  it("getConnection method return instance of class", async () => {
    const connection = await new PgConnectionManager().getConnection();
    expect(connection).toBeInstanceOf(PgConnectionManager);
    await connection.end();
  });

  it("all connections must be the same", async () => {
    const seed = await new PgConnectionManager().getConnection();
    const connections: PgConnectionManager[] = [];

    for (let i = 0; i < 15; i++) {
      const connection = await new PgConnectionManager().getConnection();
      const version = await connection.query("SELECT VERSION()");
      console.info("Open connection #", i, version.rows[0].version);
      connections.push(connection);
    }

    const lastConnection = connections.reduce((prev, current) => {
      expect(prev === current).toEqual(true);
      return current;
    }, seed);

    expect(seed === lastConnection).toEqual(true);
    await seed.end();
    for (const connection of connections) {
      await connection.end();
    }
  });

});