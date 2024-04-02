import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { MdOutlineMail } from "react-icons/md";

import { MdOutlinePayments, MdOutlineMiscellaneousServices, MdAccountBalance } from "react-icons/md";

import { TfiLayersAlt } from "react-icons/tfi";
import { IoDocumentTextOutline, IoSettingsOutline, IoPeopleOutline, IoDocumentAttachSharp } from "react-icons/io5";
import { ImInsertTemplate } from "react-icons/im";
import { FiHome } from "react-icons/fi";
import { FaUserTag, FaRegCreditCard } from "react-icons/fa";
import { IoIosContacts } from "react-icons/io";
import { FcParallelTasks } from "react-icons/fc";
import { SlCalender } from "react-icons/sl";
import { SiCoinmarketcap } from "react-icons/si";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { BsMicrosoftTeams } from "react-icons/bs";
import { GiRadialBalance } from "react-icons/gi";
import { TbSettings } from "react-icons/tb";

const SidebarItems = [
  {
    title: "Insights",
    path: "/",
    icon: <AiOutlineAppstoreAdd />,
  },

  {
    title: "Inbox +",
    path: "/inbox",
    icon: <MdOutlineMail />,
  },
  {
    title: "Clients", // Main menu item with submenus
    icon: <IoPeopleOutline />,
    subNavOpen: false,
    subNav: [
      {
        title: "Accounts",
        path: "/accounts",
        icon: <MdAccountBalance />,
      },
      {
        title: "Contacts",
        path: "/contacts",
        icon: <IoIosContacts />,
      },
    ],
  },
  {
    title: "Workflow", // Main menu item with submenus
    icon: <TfiLayersAlt />,
    subNavOpen: false,
    subNav: [
      {
        title: "Tasks",
        path: "/marketplace",
        icon: <FcParallelTasks />,
      },
      {
        title: "Jobs",
        path: "/jobs",
        icon: <FiHome />,
      },
      {
        title: "Jobrecurrences",
        path: "/tags",
        icon: <FiHome />,
      },
      {
        title: "Pipelines",
        path: "/pipeline",
        icon: <FiHome />,
      },
      {
        title: "Calendar",
        path: "/customfields",
        icon: <SlCalender />,
      },
    ],
  },
  {
    title: "Documents", // Main menu item with submenus
    icon: <IoDocumentTextOutline />,
    subNavOpen: false,
    subNav: [
      {
        title: "Clientsdocs",
        path: "/submenu1",
        icon: <IoDocumentAttachSharp />,
      },
      {
        title: "Wiki",
        path: "/submenu2",
        icon: <FiHome />,
      },
    ],
  },

  {
    title: "Billing", // Main menu item with submenus
    icon: <MdOutlinePayments />,
    subNavOpen: false,
    subNav: [
      {
        title: "Invoices",
        path: "/submenu1",
        icon: <LiaFileInvoiceSolid />,
      },
      {
        title: "Recurring invoices",
        path: "/submenu2",
        icon: <LiaFileInvoiceSolid />,
      },
      {
        title: "Time entries",
        path: "/submenu2",
        icon: <FiHome />,
      },
      {
        title: "WIP",
        path: "/submenu2",
        icon: <FiHome />,
      },
      {
        title: "Personals & ELS",
        path: "/submenu2",
        icon: <FiHome />,
      },
      {
        title: "Payments",
        path: "/submenu2",
        icon: <FaRegCreditCard />,
      },
    ],
  },

  {
    title: "Templates", // Main menu item with submenus
    icon: <ImInsertTemplate />,
    subNavOpen: false,
    subNav: [
      {
        title: "Email templates",
        path: "/emailtemplate",
        icon: <SiCoinmarketcap />,
      },
      {
        title: "Market place",
        path: "/submenu1",
        icon: <SiCoinmarketcap />,
      },
      {
        title: "Firm templates",
        path: "/submenu2",
        icon: <FiHome />,
      },
      {
        title: "Tags",
        path: "/tags",
        icon: <FaUserTag />,
      },
      {
        title: "Folder Template",
        path: "/folder_template",
        icon: <FaUserTag />,
      }, 
      {
        title: "Services",
        path: "/demo",
        icon: <MdOutlineMiscellaneousServices />,
      },
      {
        title: "Create Pipeline",
        path: "/createpipeline",
        icon: <FiHome />,
      },
      {
        title: "Job Template",
        path: "/job_template",
        icon: <FiHome />,
      },
    ],
  },
  {
    title: "Settings", // Main menu item with submenus
    icon: <IoSettingsOutline />,
    subNavOpen: false,
    subNav: [
      {
        title: "My account",
        path: "/submenu1",
        icon: <MdAccountBalance />,
      },
      {
        title: "Firm settings",
        path: "/submenu2",
        icon: <TbSettings />,
      },
      {
        title: "Integrations",
        path: "/submenu2",
        icon: <FiHome />,
      },
      {
        title: "Teams & Plans",
        path: "/submenu2",
        icon: <BsMicrosoftTeams />,
      },
      {
        title: "Firm balance",
        path: "/submenu2",
        icon: <GiRadialBalance />,
      },
      {
        title: "Invoice",
        path: "/submenu2",
        icon: <LiaFileInvoiceSolid />,
      },
    ],
  },
];

export default SidebarItems;
