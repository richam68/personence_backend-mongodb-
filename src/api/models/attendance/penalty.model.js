const mongoose = require("mongoose");

/**
 * Penalty Schema
 * @private
 */
const penaltySchema = new mongoose.Schema(
  {
    // attendancePolicyId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   unique: true,
    //   trim: true,
    //   lowercase: true,
    // },
    client_id: {
      type: String,
    },
    name: {
      type: String,
    },
    startDate: {
      type: String,
    },
    attachWorkingShifts: {
      type: String,
    },
    description: {
      type: String,
    },

    //latePunchIn
    latePunchInShowView: {
      enableMode: {
        type: String,
      },
      afterEvery: {
        type: String,
      },
      graceInstance: {
        disordered: {
          type: Boolean,
        },
        consecutive: {
          type: Boolean,
        },
      },
      notification: {
        on: {
          type: Boolean,
        },
        off: {
          type: Boolean,
        },
      },
      empMakeLatePunchIn: {
        type: String,
      },
      Deduct: {
        halfDay: {
          type: String,
        },
        fullDay: {
          type: String,
        },
      },
      earlyPunchOutDeduction: {
        type: String,
      },
    },

    //earlyPunchOut
    penaltyEarlyPunchOut: {
      enableMode: {
        type: String,
      },
      afterEvery: {
        type: String,
      },
      graceInstance: {
        disordered: {
          type: Boolean,
        },
        consecutive: {
          type: Boolean,
        },
      },
      notification: {
        on: {
          type: Boolean,
        },
        off: {
          type: Boolean,
        },
      },
      empMakeLatePunchIn: {
        type: String,
      },
      thenDeduct: {
        halfDay: {
          type: String,
        },
        fullDay: {
          type: String,
        },
      },
      earlyPunchOutDeduction: {
        type: String,
      },
    },

    //absentPenalityOverWeekOff
    // absentPenaltyOverWeekOff
    penaltyWeekOffShowView: {
      enableMode: {
        type: Boolean,
      },
      empAbsentBeforeWeekOff: {
        type: Boolean,
      },
      notification: {
        on: {
          type: String,
        },
        off: {
          type: String,
        },
      },
      condition: {
        or: {
          type: Boolean,
        },
        and: {
          type: Boolean,
        },
      },
      absentAfterWeekOff: {
        or: {
          type: String,
        },
      },
    },

    //absentPenalityOverHolidays
    // absentPenaltyOverHolidays: {
    absentPenality: {
      enableMode: {
        type: Boolean,
      },
      empAbsentBeforeHoliday: {
        type: Boolean,
      },
      notification: {
        on: {
          type: String,
        },
        off: {
          type: String,
        },
      },
      condition: {
        or: {
          type: Boolean,
        },
        and: {
          type: Boolean,
        },
      },
      absentAfterHolidayWeekOff: {
        or: {
          type: String,
        },
      },
    },

    //
    autoPunchOutPolicy: {
      enable: {
        type: String,
      },
      afterEvery: {
        type: String,
      },
      graceInstance: {
        disordered: {
          type: Boolean,
        },
        consecutive: {
          type: Boolean,
        },
      },
      notification: {
        on: {
          type: Boolean,
        },
        off: {
          type: Boolean,
        },
      },
      empMakeLatePunchIn: {
        type: String,
      },
      thenDeduct: {
        halfDay: {
          type: String,
        },
        fullDay: {
          type: String,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Penalty
 */
module.exports = mongoose.model("Penalty", penaltySchema);
