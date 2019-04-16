export const events = {
  current: 'Current sample event',
  temperature: 'Temperature sample event',
  speed: 'Speed sample event',
  command: 'New command event'
};

export const limitEvents = {
  current: 'Current limit event',
  speed: 'Speed limit event',
  temperature: 'Temperature limit event'
};

export const baseNames = {
  current_base: 'current',
  speed_base: 'speed',
  temperature_base: 'temperature',
  command_base: 'command',
  configuration_base: 'configuration'
}

export var database_configuration = {
  command_index: 0,
  speed_index: 0,
  current_index: 0,
  temperature_index: 0,
}

export const limitValues = {

  Speed: {
    Low: 500,
    Medium: 800,
    High: 1000
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

export function getValue(limit_type, limit_value) {

  var my_limit_type = limitValues.Speed;
  switch (limit_type) {
    case 'Speed': {
      my_limit_type = limitValues.Speed;
      break;
    }
    case 'Current': {
      my_limit_type = limitValues.Current;
      break;
    }
    case 'Temperature': {
      my_limit_type = limitValues.Temperature;
      break;
    }
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
}

export const TimechartConfiguration = {

  speedChart: {
    title: 'Speed Chart',
    minValue: '200',
    maxValue: '800',
    sampleEvent: events.speed,
    limitEvent: limitEvents.speed
  },

  temperatureChart: {
    title: 'Temperature Chart',
    minValue: '20',
    maxValue: '30',
    sampleEvent: events.temperature,
    limitEvent: limitEvents.temperature
  },

  currentChart: {
    title: 'Current Chart',
    minValue: '0',
    maxValue: '50',
    sampleEvent: events.current,
    limitEvent: limitEvents.current
  },
};


