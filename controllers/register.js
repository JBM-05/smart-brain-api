
const saltRounds = 10;
const handleRegister=(postgres,bcrypt)=>(req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password){
        return res.status(400).json("incorrect")
    }
    const hash = bcrypt.hashSync(password, saltRounds);
    console.log(hash)
    postgres
      .transaction((trx) => {
        trx
          .insert({
            email: email,
            hash: password,
          })
          .into("login")
          .returning("email")
          .then((loginEmail) => {
            return postgres("users")
              .returning("*")
              .insert({
                email: loginEmail[0].email,
                name: name,
                joined: new Date(),
              })
              .then((user) => {
                res.json(user[0]);
              });
          })
          .then(trx.commit)
          .catch(trx.rollback);
      })
      .catch((err) => res.status(400).json("unable to register"));
  }
  module.exports={
    handleRegister:handleRegister
  }
