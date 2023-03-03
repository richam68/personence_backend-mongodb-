const { string } = require("joi");
const mongoose = require("mongoose");

/**
 * Employee Schema
 * @private
 */

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String },
    roleId: { type: String,default:'632570414212d70012f2bfed' },

    location_id: { type: String },
    location_name: { type: String },
    location_code:{type:String},

    division_id: { type: String },
    division_name: { type: String },
    division_code:{type:String},

    department_id: { type: String },
    department_name: { type: String },
    department_code:{type:String},

    zone_id: { type: String },
    zone_name: { type: String },
    zone_code:{type:String},

    designation_id: { type: String },
    designation_name: { type: String },
    designation_code:{type:String},

    reporting_manager_id: { type: String },
    reporting_manager_name: { type: String },
    reporting_manager_email: { type: String },
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    client_name: { type: String },
    client_code:{type:String},

    emp_id: { type: String },
    organisation_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organisation",
    },
    set_id_series: { type: String },
    employee_email: { type: String },
    personal_email: { type: String },
    employee_gender: { type: String },
    employee_pan: { type: String },
    driving_license: { type: String },
    employment_type: { type: String },
    replacement_of: { type: String },
    notice_tenure: { type: String },
    leaving_date: { type: String },
    leaving_reason: { type: String },
    dob: { type: String },
    phone_number: { type: String },
    blood_group: { type: String },
    adhaar: { type: String },
    joining_date: { type: String },
    confirmation_date: { type: String },
    resignationDate: { type: String },
    reason_of_leaving: { type: String },
    dateOfLeaving: { type: String },
    actualDateOfLeaving: { type: String },
    notice_expiry: { type: String },
    pf_number: { type: String },
    profile_pic: { type: String },
    EmpCognitoID: { type: String },
    isfirstlogin: { type: String, default: false },
    m_name: { type: String },
    l_name: { type: String },
    alternate_number: { type: String },
    address: { type: String },
    pincode: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    probation_type: { type: String },
    probation_duration: { type: String },
    uan_no: { type: String },
    pf_no: { type: String },
    esic_no: { type: String },
    insurance_no: { type: String },
    insurance_pf: { type: String },
    hierarchy_id: { type: Number },
    description: { type: String },
    employee_level: { type: String },
    comapny: [
      {
        from_date_co: { type: String },
        to_date_co: { type: String },
        comapny_name: { type: String },
        comapany_name: { type: String },
        designation: { type: String },
        last_sal: { type: String },
        reporting_to: { type: String },
        mo_no: { type: String },
        letter: { type: String },
        remark: { type: String },
      },
    ],
    education: [
      {
        from_date_edu: { type: String },
        to_date_edu: { type: String },
        course_name: { type: String },
        institute_name: { type: String },
        percent: { type: String },
        certificate: { type: String },
        education_detail: { type: String },

      },
    ],
    status: {
      type: String,
      default: 'true'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Role Association With RoleRight
// Virtual populate
employeeSchema.virtual(
  "Employee",
  {
    ref: "Employee", //must be changed to the name you used for Comment model.
    foreignField: "EmpCognitoID",
    localField: "reporting_manager_id",
  }
  //  {
  //     ref: "Onboarding",   //must be changed to the name you used for Comment model.
  //     foreignField: "EmpCognitoID",
  //     localField: "EmpCognitoID"
  //   }
);
//   employeeSchema.virtual("Onboarding", {
//     ref: "Onboarding",   //must be changed to the name you used for Comment model.
//     foreignField: "EmpCognitoID",
//     localField: "EmpCognitoID"
//   });

/**
 * @typedef Employee
 */
module.exports = mongoose.model("Employee", employeeSchema);
