export const  events = {

  command: 'command event',

  left_side: {
    current: 'Current sample left side event',
    temperature: 'Temperature sample left side event',
    speed: 'Speed sample event left side ',
    command: 'New command event left side'
  },
  right_side: {
    current: 'Current sample event right side',
    temperature: 'Temperature sample event right side',
    speed: 'Speed sample event right side',
    command: 'New command event right side'
  }
};

export const limitEvents = {

  left_side: {
    current: 'Current limit left side event',
    speed: 'Speed limit left side  event',
    temperature: 'Temperature limit left side  event'
  },
  right_side: {
    current: 'Current limit right side event',
    speed: 'Speed limit right side  event',
    temperature: 'Temperature limit right side  event'
  }
};

export const baseNames = Object.freeze({

  configuration_base: 'configuration',

  command_base: 'commands',

  sample_base: {
    left_side: {
      speed_base: 'sample_left_speed',
      temperature_base: 'sample_left_temperature',
      current_base: 'sample_left_current',
    },
    right_side: {
      speed_base: 'sample_right_speed',
      temperature_base: 'sample_right_temperature',
      current_base: 'sample_right_current',
    }
  },
  limit_base: {
    left_side: {
      speed_base: 'limit_left_speed',
      temperature_base: 'limit_left_temperature',
      current_base: 'limit_left_current',
    },
    right_side: {
      speed_base: 'limit_right_speed',
      temperature_base: 'limit_right_temperature',
      current_base: 'limit_right_current',
    }
  },
});

export const messageLogLength = Object.freeze({msg_number: 50});

export const limitTypes = {
    left_side: {
      speed: 'limit_left_speed',
      temperature: 'limit_left_temperature',
      current: 'limit_left_current',
    },
    right_side: {
      speed: 'limit_right_speed',
      temperature: 'limit_right_temperature',
      current: 'limit_right_current',
    }
};

export const limitValues = {

  Speed: {
    Low: 0,
    Medium: 1,
    High: 2
  },

  Current: {
    Low: 20,
    Medium: 30,
    High: 50
  },

  Temperature: {
    Low: 25,
    Medium: 27,
    High: 30
  }

};

export function getSpeedValue(speed)
{
  var my_limit_value = 0

  switch(speed)
  {
    case 0: 
    my_limit_value = 0;
    break;
   
    case 1:
    my_limit_value = 1000;
    break;
    
    case 2:
    my_limit_value = 2500;
    break;
    
  }

  return my_limit_value;

}

export function castSpeedValue(speed)
{
  var my_limit_value = 0;
  
  switch(speed)
  {
    case 0:
    my_limit_value = 0;
    break;
    
    case 1000:
    my_limit_value = 1;
    break;

    case 2500:
    my_limit_value = 2;
    break;

  }

  return my_limit_value;
}

export function getValue(limit_type, limit_value) {

  var my_limit_type = limitValues.Speed;

  switch (limit_type) {
    case limitTypes.right_side.speed:
    case limitTypes.left_side.speed:
      my_limit_type = limitValues.Speed;
      break;

    case limitTypes.right_side.current:
    case limitTypes.left_side.current:
      my_limit_type = limitValues.Current;
      break;

    case limitTypes.right_side.temperature:
    case limitTypes.left_side.temperature:
      my_limit_type = limitValues.Temperature;
      break;

  }

  var my_limit_value = my_limit_type.Low;
  switch (limit_value) {

    case 'Low': {
      my_limit_value = my_limit_type.Low;
      break;
    }
    case 'Medium': {
      my_limit_value = my_limit_type.Medium;
      break;
    }
    case 'High': {
      my_limit_value = my_limit_type.High;
      break;
    }
  }

  return my_limit_value;
}

export var deviceValues = {
  speed: 'Low',
  temperature: 'Low',
  current: 'Low'
};




