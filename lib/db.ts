const mysqlssh = require("mysql-ssh");

export async function query(
  q: string,
  values: (string | number)[] | string | number = []
) {
  try {
    mysqlssh
      .connect(
        {
          host: process.env.SSH_HOST,
          user: process.env.SSH_USER,
          password: process.env.SSH_PASSWORD,
        },
        {
          host: process.env.MYSQL_HOST,
          user: process.env.MYSQL_USERNAME,
          password: process.env.MYSQL_PASSWORD,
          database: process.env.MYSQL_DATABASE,
        }
      )
      .then((client) => {
        client.query(q, function (err, results, fields) {
          if (err) throw err;

          mysqlssh.close();
          return results;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (e) {
    throw Error(e.message);
  }
}
