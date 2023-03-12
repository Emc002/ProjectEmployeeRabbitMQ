const errorHandleRabit = (err) => {

  if (err.name === 'ValidationError') {
    const errors = {};
    for (let field in err.errors) { 

      if(err.errors[field].name == "CastError")
      {
        errors[field] = `You must enter a valid ${err.errors[field].path}`;
      }
      else{
        errors[field] = err.errors[field].message;
      }
    }
    const resources=[];
    for (let field in errors) {
      if (/.+\./.test(field)) {
        const [index, nestedField] = field.split('.').slice(1);
        if (!resources[index]) {
          resources[index] = {};
        }
        resources[index][nestedField] = errors[field];
        delete errors[field];
      }
    }
    const message = err.name
    if(resources.length === 0 ){
      return console.log(JSON.stringify({message }));
    }
    return console.log(JSON.stringify({errors: { ...errors, resources }, message}));
  }

  else if (err.statusCode === 404) {
    const message = err.message
    return console.log(JSON.stringify({ message }));
  }

  else if (err.name === 'CastError') {
    const message = 'Invalid ID';
    return console.log(JSON.stringify({ message }));
  }

  else if (err.code === 11000) {
    let message = Object.keys(err.keyValue)[0];
    message += " Already Exist"
    return console.log(JSON.stringify({ message }));
  }

  else if (err.name === 'MongoNotConnectedError') {
    const message = 'Server Not Connected';
    return console.log(JSON.stringify({ message }));
  }
  return console.log(JSON.stringify({ message: 'Something went wrong, please try again' }));
};

module.exports = errorHandleRabit;
