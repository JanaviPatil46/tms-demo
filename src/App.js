import Sidebar from "./navbar/Sidebar";
import Tagcreate from "./pages/Tagscreate";
import NewTag from "./pages/NewTag";
import TagTable from "./pages/TagTable";
import Account from "./pages/Account";
import "./App.css";
import Header from "../src/component/Header";
import "boxicons";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import AdminLogin from "./pages/AdminLogin";
import AccountsData from "./pages/AccountsData";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ContactTable from "./pages/ContactTable";
import AdminSignup from "../src/pages/AdminSignUp";
import FolderTemplate from "../src/pages/FolderTemplate";
import Pipeline from '../src/pages/pipeline'
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import FolderTemp from "./pages/FolderTemp";
import Demo from "./pages/Demo";
import CreatePipeline from "./pages/CreatePipeline";
import FoldertempUpdate from "./pages/FoldertempUpdate";
import CreateJobTemplate from "./pages/JobTemplate"
import JobTemplateUpdate from "./pages/JobTemplateUpdate";
import AddJobs from "./pages/AddJobs"
import JobsData from "./pages/JobData"

import NewTemplate from "./pages/Emailtemp/NewTemplate";
import UpdateEmail from "./pages/Emailtemp/UpdateEmail";
import PipelineTemplateUpdate from "./pages/PipelineTemplateUpdate";
import CreateEmailTemp from "./pages/Emailtemp/CreateEmailTemp";
import EmailTempsend from "./pages/EmailTempsend";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/tags" element={<Tagcreate />} />
          <Route path="/folder_template" element={<FolderTemp />} />
          <Route path="/tagtable" element={<TagTable />} />
          <Route path="/accounts" element={<AccountsData />} />
          <Route path="/contacts" element={<ContactTable />} />
        
          <Route path="/demo" element={<Demo />} />

          <Route path="/createpipeline" element={<CreatePipeline />} />
          <Route path="/createpipeline/PipelineTemplateUpdate/:_id" element={<PipelineTemplateUpdate />} />

          <Route path="/job_template" element={<CreateJobTemplate />} />
          <Route path="/job_template/JobTemplateUpdate/:_id" element={<JobTemplateUpdate />} />

          <Route path="/AddJobs" element={<AddJobs />} />
          <Route path="/jobs" element={<JobsData/>} />

          <Route path="/resetpassword/:id/:token" element={<ResetPassword />} />
          <Route path="/forgotpass" element={<ForgotPassword />} />

          <Route path="/pipeline" element={<Pipeline/>} />
          <Route path="/FolderTemplate" element={<FolderTemplate />} />
          <Route path="/folder_template/FoldertempUpdate/:_id" element={<FoldertempUpdate />} />



          <Route path="/emailtemplate" element={<CreateEmailTemp/>} />
          <Route path="/newemailtemplate" element={<NewTemplate/>} />
          <Route path="/upemailtemplate/:_id" element={<UpdateEmail/>} />
          <Route path="/emailsenttemp" element={<EmailTempsend/>} />
          
          <Route path="*" element={<NoPage />} />
          {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
