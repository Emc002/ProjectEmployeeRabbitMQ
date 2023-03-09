const mongoose = require('mongoose');

const ProjectClientSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true,`must provide code`],
  },
  client_code: {
    type: String,
    required: [true,`must provide client code`],
  },
  pic_email: {
    type: String,
    required: [true,`must provide pic email`],
    validate: {
      validator: function (v) {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
      },
      message: 'Please Input Email Correctly'
    },
  },
  opportunity_name: {
    type: String,
    required: [true,`must provide opportunity name`],
  },
  description: {
    type: String,
    required: [true,`must provide description`],
  },
  sales_email: {
    type: String,
    required: [true,`must provide sales email`],
    validate: {
      validator: function (v) {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
      },
      message: 'Please Input Email Correctly'
    },
  },
  status: {
    type: String,
    required: [true,`must provide status`],
  },
  last_modified: {
    type: Date,
    required: [true,`must provide lats modified`],
  },
  resources: [
    {
      qty: {
        type: Number,
        required: [true,`must provide quantity`],
      },
      position: {
        type: String,
        required: [true,`must provide position`],
        enum: {
          values: ['back end', 'front end', 'product owner'],
          message: '{VALUE} is not exist on the list',
        }
      },
      level: {
        type: String,
        required: [true,`must provide level`],
        enum: {
          values: ['junior', 'senior'],
          message: '{VALUE} is not exist on the list',
        }
      },
      ctc: {
        type: Number,
      },
      project_duration: {
        type: Number,
        required: [true,`must provide project duration`],
      },
    }
  ]

})

module.exports = mongoose.model('ProjectClient', ProjectClientSchema )
