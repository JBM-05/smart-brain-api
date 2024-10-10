const handleProfile= (postgres)=>(req, res) => {
    const { id } = req.params;
  
    postgres
      .select("*")
      .from("users")
      .where({
        id,
      })
      .then((user) => {
        console.log(user);
        if (user.length) {
          res.json(user[0]);
        } else {
          res.status(400).json("not found");
        }
      })
      .catch((err) => {
        res.status(400).json("error getting the user");
      });
  }
  module.exports={
    handleProfile:handleProfile
  }