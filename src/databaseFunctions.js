import {db} from "./main";
import {baseNames, messageLogLength,} from "./constants"
import {database_index, database_values, message_log} from "./deviceData";

export {getDatabaseIndexes, getDatabase, getLatestEntries, writeInBase, setDatabaseIndexes, getMessageLog}

function writeInBase(basename, data_index, data) {
  db.collection(basename).doc('ID' + data_index).set({data});
};

function getDatabase(basename, database) {
  var local_database = db.collection(basename);
  var myDataArray = local_database.orderBy("data", "desc").limit(messageLogLength.msg_number);
  var configList = myDataArray.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        var myData = doc.data();
      //  console.log(doc.data);
    //    console.log('this is msg_log database',database);
        database.unshift({
          date:myData.data.date,
          value: myData.data.value,
          status:myData.data.status,
          limit:myData.data.limit});
      })
    })
    .catch(err => {
      console.log('Error getting database', err);
    });
};

function setDatabaseIndexes() {
  console.log('this is database index');
  console.log('this is database_indexes', database_index);
  db.collection(baseNames.configuration_base).doc('config').set(database_index);
};

function getDatabaseIndexes() {

  // console.log('base name is', baseNames.configuration_base);
  // var localBase = baseNames.configuration_base;
  //
  // console.log(' this is local base file', localBase);

  var configuration = db.collection(baseNames.configuration_base);
  var configList = configuration.get()
    .then(snapshot => {
      snapshot.forEach(doc => {

        if (doc.id == 'config') {
          // console.log('This is configuration');
          var myConfig = doc.data();
          database_index.command_index = myConfig.command_index;
          //samples left side
          database_index.sample_index.left_side.speed_index = myConfig.sample_index.left_side.speed_index;
          database_index.sample_index.left_side.current_index = myConfig.sample_index.left_side.current_index;
          database_index.sample_index.left_side.temperature_index = myConfig.sample_index.left_side.temperature_index;
          //samples right side
          database_index.sample_index.right_side.speed_index = myConfig.sample_index.right_side.speed_index;
          database_index.sample_index.right_side.current_index = myConfig.sample_index.right_side.current_index;
          database_index.sample_index.right_side.temperature_index = myConfig.sample_index.right_side.temperature_index;
          //limits left side
          database_index.limit_index.left_side.speed_index = myConfig.limit_index.left_side.speed_index;
          database_index.limit_index.left_side.current_index = myConfig.limit_index.left_side.current_index;
          database_index.limit_index.left_side.temperature_index = myConfig.limit_index.left_side.temperature_index;
          //limits right side
          database_index.limit_index.right_side.speed_index = myConfig.limit_index.right_side.speed_index;
          database_index.limit_index.right_side.current_index = myConfig.limit_index.right_side.current_index;
          database_index.limit_index.right_side.temperature_index = myConfig.limit_index.right_side.temperature_index;
        }
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
};


function getLatestSampleEntry(basename, element) {
  console.log('Latest sample entry');
  var local_database = db.collection(basename);
  var myDataArray = local_database.orderBy("data", "desc").limit(1);
  var configList = myDataArray.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        element.date = doc.data().data.date;
        element.limit = doc.data().data.limit;
        element.status = doc.data().data.status;
        element.value = doc.data().data.value;
      })
    })
    .catch(err => {
      console.log('Error accessing database', err);
    });
};

function getLatestLimitEntry(basename, element) {
  var local_database = db.collection(basename);
  var myDataArray = local_database.orderBy("data", "desc").limit(1);
  console.log('my element is', myDataArray);
  var configList = myDataArray.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        element.date = doc.data().data.date;
        element.user = doc.data().data.user;
        element.value = doc.data().data.value;
        element.value_val = doc.data().data.value_val;
        console.log('limit element is ', doc.data().data)
      })
    })
    .catch(err => {
      console.log('Error accessing database', err);
    });
};

function getLatestEntries() {

  // left limits
  getLatestLimitEntry(baseNames.limit_base.left_side.speed_base, database_values.limit_value.left_side.speed);
  getLatestLimitEntry(baseNames.limit_base.left_side.temperature_base, database_values.limit_value.left_side.temperature);
  getLatestLimitEntry(baseNames.limit_base.left_side.current_base, database_values.limit_value.left_side.current);
  // right limits
  getLatestLimitEntry(baseNames.limit_base.right_side.speed_base, database_values.limit_value.right_side.speed);
  getLatestLimitEntry(baseNames.limit_base.right_side.temperature_base, database_values.limit_value.right_side.temperature);
  getLatestLimitEntry(baseNames.limit_base.right_side.current_base, database_values.limit_value.right_side.current);
  // left samples
  getLatestSampleEntry(baseNames.sample_base.left_side.speed_base, database_values.sample_value.left_side.speed);
  getLatestSampleEntry(baseNames.sample_base.left_side.temperature_base, database_values.sample_value.left_side.temperature);
  getLatestSampleEntry(baseNames.sample_base.left_side.current_base, database_values.sample_value.left_side.current);
  // right samples
  getLatestSampleEntry(baseNames.sample_base.right_side.speed_base, database_values.sample_value.right_side.speed);
  getLatestSampleEntry(baseNames.sample_base.right_side.temperature_base, database_values.sample_value.right_side.temperature);
  getLatestSampleEntry(baseNames.sample_base.right_side.current_base, database_values.sample_value.right_side.current);

};

function getMessageLog() {
  //
  getDatabase(baseNames.command_base, message_log.command_log);
  // left side
  getDatabase(baseNames.sample_base.left_side.speed_base, message_log.left_side.speed_log);
  getDatabase(baseNames.sample_base.left_side.temperature_base, message_log.left_side.temperature_log);
  getDatabase(baseNames.sample_base.left_side.current_base, message_log.left_side.current_log);
// right side
  getDatabase(baseNames.sample_base.right_side.speed_base, message_log.right_side.speed_log);
  getDatabase(baseNames.sample_base.right_side.temperature_base, message_log.right_side.temperature_log);
  getDatabase(baseNames.sample_base.right_side.current_base, message_log.right_side.current_log);

}
