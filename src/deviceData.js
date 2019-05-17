export var database_values = {

  sample_value: {
    left_side: {
      speed: {
          date:0,
          limit:0,
          status:0,
          value:0
        },
      current:  {
        date:0,
        limit:0,
        status:0,
        value:0
      },
      temperature:  {
        date:0,
        limit:0,
        status:0,
        value:0
      },
    },
    right_side: {
      speed:  {
        date:0,
        limit:0,
        status:0,
        value:0
      },
      current:  {
        date:0,
        limit:0,
        status:0,
        value:0
      },
      temperature:  {
        date:0,
        limit:0,
        status:0,
        value:0
      },
    }
  },

  limit_value: {
    left_side: {
      speed:  {
        date:0,
        user:0,
        value:0,
        value_val:0
      },
      current: {
        date:0,
        user:0,
        value:0,
        value_val:0
      },
      temperature: {
        date:0,
        user:0,
        value:0,
        value_val:0
      },
    },
    right_side: {
      speed: {
        date:0,
        user:0,
        value:0,
        value_val:0
      },
      current: {
        date:0,
        user:0,
        value:0,
        value_val:0
      },
      temperature: {
        date:0,
        user:0,
        value:0,
        value_val:0
      },
    }
  }
};


export var message_log = {
  command_log:[],
  left_side:
    {
    speed_log:[],
    temperature_log:[],
    current_log:[]
  },
  right_side:
    {
    speed_log:[],
    temperature_log:[],
    current_log:[]
  }
}

