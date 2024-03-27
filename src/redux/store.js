import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter";
import happyqAdminReducer from "./slices/HappyQ_Admin/Admin_Dashboard";
import happyqAdminTicketReducer from "./slices/HappyQ_Admin/Admin_Tickets";
import happyqAdminBookingReducer from "./slices/HappyQ_Admin/Admin_Booking";
import happyqAdminCompanyReducer from "./slices/HappyQ_Admin/Admin_Company";
import happyqAdminEmployeeReducer from "./slices/HappyQ_Admin/Admin_Employee";
import happyqAdminBranchReducer from "./slices/HappyQ_Admin/Admin_Branch";
import happyqAdminSurveyReducer from "./slices/HappyQ_Admin/Admin_Survey";
import happyqAdminProfileReducer from "./slices/HappyQ_Admin/Admin_Profile";

import happyqCompanyProfileReducer from "./slices/HappyQ_Company/Company_Profile";
import happyqCompanySurveyReducer from "./slices/HappyQ_Company/Company_Survey";
import happyqCompanyDashboardReducer from "./slices/HappyQ_Company/Company_Dashboard";
import happyqCompanyTicketReducer from "./slices/HappyQ_Company/Company_Tickets";
import happyqCompanyBranchReducer from "./slices/HappyQ_Company/Company_Branch";
import happyqCompanyBookingReducer from "./slices/HappyQ_Company/Company_Booking";
import happyqCompanyEmployeeReducer from "./slices/HappyQ_Company/Company_Employee";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    happyqAdminDashboard: happyqAdminReducer,
    happyqAdminTicket: happyqAdminTicketReducer,
    happyqAdminBooking: happyqAdminBookingReducer,
    happyqAdminCompany: happyqAdminCompanyReducer,
    happyqAdminEmployee: happyqAdminEmployeeReducer,
    happyqAdminBranch: happyqAdminBranchReducer,
    happyqAdminSurvey: happyqAdminSurveyReducer,
    happyqAdminProfile: happyqAdminProfileReducer,

    happyqCompanyProfile: happyqCompanyProfileReducer,
    happyqCompanySurvey: happyqCompanySurveyReducer,
    happyqCompanyDashboard: happyqCompanyDashboardReducer,
    happyqCompanyTicket: happyqCompanyTicketReducer,
    happyqCompanyBranch: happyqCompanyBranchReducer,
    happyqCompanyBooking: happyqCompanyBookingReducer,
    happyqCompanyEmployee: happyqCompanyEmployeeReducer,
  },
});
