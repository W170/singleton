import {Client} from "pg";

export class PgConnectionManager extends Client {

  constructor() {
    super({
      connectionString: "postgresql://TTL_USER_DB:WeLoveToLearn@localhost:5432/Talenta",
      application_name: "TTL Singleton"
    })
  }

  public async getConnection(): Promise<PgConnectionManager> {
    return new Promise<PgConnectionManager>((resolve, reject) => this.connect((error: Error) => {
      if (error) {
        return reject(error);
      }
      return resolve(this);
    }));
  }
}