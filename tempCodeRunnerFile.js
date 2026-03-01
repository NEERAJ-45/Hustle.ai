
const u = db.users.findOne({ email: "demo@hustle.ai" }, { _id: 1 });
console.log(u);
