
// const saltRounds = 10;
// const handleRegister=(postgres,bcrypt)=>(req, res) => {
//     const { name, email, password } = req.body;
//     if(!name || !email || !password){
//         return res.status(400).json("incorrect")
//     }
//     const hash = bcrypt.hashSync(password, saltRounds);
//     postgres
//       .transaction((trx) => {
//         trx
//           .insert({
//             email: email,
//             hash: hash,
//           })
//           .into("login")
//           .returning("email")
//           .then((loginEmail) => {
//             return postgres("users")
//               .returning("*")
//               .insert({
//                 email: loginEmail[0].email,
//                 name: name,
//                 joined: new Date(),
//               })
//               .then((user) => {
//                 res.json(user[0]);
//               });
//           })
//           .then(trx.commit)
//           .catch(trx.rollback);
//       })
//       .catch((err) => res.status(400).json("unable to register"));
//   }
//   module.exports={
//     handleRegister:handleRegister
//   }
const saltRounds = 10;

const handleRegister = (postgres, bcrypt) => async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json("Incorrect form submission");
  }

  try {
    const hash = bcrypt.hashSync(password, saltRounds);

    await postgres.transaction(async (trx) => {
      const loginEmail = await trx("login")
        .insert({
          email: email,
          hash: hash,
        })
        .returning("email");

      const user = await trx("users")
        .returning("*")
        .insert({
          email: loginEmail[0].email,
          name: name,
          joined: new Date(),
        });

      res.json(user[0]);
    });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(400).json("Unable to register");
  }
};

module.exports = {
  handleRegister,
};
