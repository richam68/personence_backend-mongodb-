const { string } = require('joi');
const mongoose = require('mongoose');

/**
 * Attendance Policies Schema
 * @private
 */
const attendancePoliciesSchema = new mongoose.Schema({

  client_id: {
    type: String
  },
  totalHours: {
    type: String,
  },
  manualInput: {
    fullDay: {
      type: String,
      default:''
    },
    halfDay: {
      type: String,
      default:''
    }
  },
  shiftHours: {
    fullDay: {
      type: String,
      default:''
    },
    halfDay: {
      type: String,
      default:''
    }
  },

  lanientMode: {
    perDayHour: {
      type: String,
      default:''
    },
    fromTime: {
      type: String,
      default:''
    },
    toTime: {
      type: String,
      default:''
    }

  },
  minimumHoursReqForDay: {
    enableMode: {
      type: String
    },



  },

  showOvertime: {
    type: String
  },
  //Per day/ hours Calculation
  includeWeekend: {
    type: String,
  },
  includeHolidays: {
    type: String,
  },
  carryOverTime: {
    type: String,
  },

  // Permission
  webCheckInOut: {
    type: String,
  },
  mobileCheckInOut: {
    type: String,
  },
  // capturePhoto: {
  //   webCheckInOut: {
  //     type: String
  //   },
  //   mobileCheckInOut: {
  //     type: String
  //   }
  // },

  locationSharing:{
    type:String
  },
  webCheckInOut: {
    type: String
  },
  mobileCheckInOut: {
    type: String
  },
  desktopCheckInOut: {
    type: String
  },
  showAllCheckInOut: {
    type: String,
  },
  viewReportees: {
    type: String
  },
  reporteesEntries: {
    type: String
  },
  showNotify: {
    type: Array
  },
  employeeList: [
    {
      type: String
    }
  ],
  policyName: {
    type: String
  },
  breakTime:{
    type:String,
    default:''
  }
},
  {
    timestamps: true,
  }
);



/**
 * @typedef AttendancePolicies
 */
module.exports = mongoose.model('AttendancePolicies', attendancePoliciesSchema);
