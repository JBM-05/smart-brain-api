const handleImage=(postgres)=>(req, res) => {
    const { id } = req.body;
    postgres("users")
      .where("id", "=", id)
      .increment("entries", 1)
      .returning("entries")
      .then((entries) => {
        res.json(entries[0]);
      })
      .catch((err) => {
        res.status(400).json("error ");
      });
  }
  module.exports={
    handleImage:handleImage
  }