const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const mypw = "madang";
let listBook = async () => {
  const connection = await oracledb.getConnection({
    user: "c##madang",
    password: mypw,
    connectString: "localhost:1521/XE",
  });
  const result = await connection.execute(`select * from book100`);

  return result.rows;
  await connection.close();
};

let insertBook = async (doc) => {
  const connection = await oracledb.getConnection({
    user: "c##madang",
    password: mypw,
    connectString: "localhost:1521/XE",
  });
  const result = await connection.execute(
    `INSERT INTO book100(bookid,bookname,price,publisher) 
        VALUES (:bookid, :bookname,:price,:publisher)`,
    doc
  );
  connection.commit();
  console.log("Rows inserted " + result.rowsAffected);
  return result.rows;
  await connection.close();
};
let updateBook = async (doc) => {
  const connection = await oracledb.getConnection({
    user: "c##madang",
    password: mypw,
    connectString: "localhost:1521/XE",
  });
  const result = await connection.execute(
    `update book100 set bookname=:bookname,price=:price,publisher=:publisher
            where bookid=:bookid`,
    doc
  );
  connection.commit();
  console.log("Rows inserted " + result.rowsAffected);
  return result.rows;
  await connection.close();
};

let deleteBook = async (bookid) => {
  const connection = await oracledb.getConnection({
    user: "c##madang",
    password: mypw,
    connectString: "localhost:1521/XE",
  });
  var sql = "delete book100 where bookid = " + bookid;
  console.log(sql);
  const result = await connection.execute(sql);
  connection.commit();
  console.log("Rows inserted " + result.rowsAffected);
  return result.rows;
  await connection.close();
};

let getNextBookID = async () => {
  const connection = await oracledb.getConnection({
    user: "c##madang",
    password: mypw,
    connectString: "localhost:1521/XE",
  });
  const result = await connection.execute(
    `select nvl(max(bookid),0) + 1 bookid from book100`
  );
  return result.rows[0].BOOKID; // [{bookid:10}]
  await connection.close();
};

module.exports = {
  listBook,
  insertBook,
  updateBook,
  deleteBook,
  getNextBookID,
};
