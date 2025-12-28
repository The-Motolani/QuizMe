// import { useState } from "react";
// import { 
//   FaBars, FaTimes, FaChartLine, FaUserCircle, FaSignOutAlt, FaLock, FaQuestionCircle, FaBell 
// } from "react-icons/fa";
// import QuizMeFavicon from "../assets/images/QuziMeFavicon";
// import { UseAuth } from "../utils/UseAuth";
// import { toast } from "react-hot-toast";

// export default function Dashboard() {
//   const { user, login, logout } = UseAuth();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [profilePic, setProfilePic] = useState(user?.profilePicture || null);
//   const [editingProfile, setEditingProfile] = useState(false);
//   const [profileData, setProfileData] = useState({
//     username: user?.username || "",
//     email: user?.email || ""
//   });
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: ""
//   });
//   const [contactData, setContactData] = useState({
//     subject: "",
//     message: ""
//   });

//   const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);

//   const getGreeting = () => {
//     const name = user?.username || "User";
//     const hour = new Date().getHours();
//     if (hour < 12) return `Good morning, ${name}`;
//     if (hour < 18) return `Good afternoon, ${name}`;
//     return `Good evening, ${name}`;
//   };

//   const handleFileChange = (file) => {
//     if (!file) return;
//     if (file.size > 2 * 1024 * 1024) {
//       toast.error("Profile picture must be less than 2MB");
//       return;
//     }
//     const picURL = URL.createObjectURL(file);
//     setProfilePic(picURL);
//     login({ ...user, profilePicture: picURL });
//     toast.success("Profile picture updated!");
//   };

//   const handleProfileChange = (e) => setProfileData({ ...profileData, [e.target.name]: e.target.value });
//   const handlePasswordChange = (e) => setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
//   const handleContactChange = (e) => setContactData({ ...contactData, [e.target.name]: e.target.value });

//   const saveProfile = () => {
//     login({ ...user, username: profileData.username, email: profileData.email, profilePicture: profilePic });
//     toast.success("Profile updated successfully");
//     setEditingProfile(false);
//   };

//   const changePassword = () => {
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }
//     toast.success("Password updated successfully");
//     setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
//   };

//   const submitContact = (e) => {
//     e.preventDefault();
//     toast.success("Message sent!");
//     setContactData({ subject: "", message: "" });
//   };

//   const handleLogout = () => {
//     logout();
//     toast.success("Logged out successfully");
//   };

//   const sidebarItems = [
//     { label: "Dashboard", icon: FaChartLine, key: "dashboard" },
//     { label: "Profile", icon: FaUserCircle, key: "profile" },
//     { label: "Login & Security", icon: FaLock, key: "loginSecurity" },
//     { label: "Help & Support", icon: FaQuestionCircle, key: "help" },
//     { label: "Logout", icon: FaSignOutAlt, key: "logout", action: handleLogout }
//   ];

//   const renderContent = () => {
//     switch(activeTab) {
//       case "dashboard":
//         return (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
//               <h3 className="text-rose-300 text-xl font-bold">Quizzes Taken</h3>
//               <p className="text-teal-700 text-3xl mt-2">12</p>
//             </div>
//             <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
//               <h3 className="text-rose-300 text-xl font-bold">Accuracy</h3>
//               <p className="text-teal-700 text-3xl mt-2">85%</p>
//             </div>
//             <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
//               <h3 className="text-rose-300 text-xl font-bold">Quizzes Submitted</h3>
//               <p className="text-teal-700 text-3xl mt-2">10</p>
//             </div>
//           </div>
//         );
//       case "profile":
//         return (
//           <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
//             <h2 className="text-3xl font-bold text-rose-300 mb-6 text-center font-[Baloo]">Profile</h2>

//             <div className="flex flex-col items-center gap-4 mb-6">
//               <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100">
//                 {profilePic ? <img src={profilePic} alt="Profile" className="w-full h-full object-cover"/> : <FaUserCircle className="w-full h-full text-gray-300"/>}
//               </div>
//               <input type="file" accept="image/*" onChange={(e) => handleFileChange(e.target.files[0])} className="text-sm text-gray-600"/>
//               <span className="text-gray-400 text-sm">Change Profile Picture</span>
//             </div>

//             {!editingProfile ? (
//               <div className="flex flex-col gap-4">
//                 <p><strong>Username:</strong> {profileData.username}</p>
//                 <p><strong>Email:</strong> {profileData.email}</p>
//                 <button
//                   onClick={() => setEditingProfile(true)}
//                   className="bg-slate-200 text-gray-700 py-2 px-6 rounded-full font-semibold hover:bg-white hover:shadow-md"
//                 >
//                   Edit Info
//                 </button>
//               </div>
//             ) : (
//               <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); saveProfile(); }}>
//                 <input type="text" name="username" value={profileData.username} onChange={handleProfileChange} placeholder="Username" className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-200"/>
//                 <input type="email" name="email" value={profileData.email} onChange={handleProfileChange} placeholder="Email" className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-200"/>
//                 <button type="submit" className="bg-slate-200 text-gray-700 py-2 px-6 rounded-full font-semibold hover:bg-white hover:shadow-md">Save Changes</button>
//               </form>
//             )}
//           </div>
//         );
//       case "loginSecurity":
//         return (
//           <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
//             <h2 className="text-3xl font-bold text-rose-300 mb-6 text-center font-[Baloo]">Login & Security</h2>
//             <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); changePassword(); }}>
//               <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} placeholder="Current Password" className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-200"/>
//               <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} placeholder="New Password" className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-200"/>
//               <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} placeholder="Confirm Password" className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-200"/>
//               <button type="submit" className="bg-slate-200 text-gray-700 py-2 px-6 rounded-full font-semibold hover:bg-white hover:shadow-md">Change Password</button>
//             </form>
//           </div>
//         );
//       case "help":
//         return (
//           <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
//             <h2 className="text-3xl font-bold text-rose-300 mb-6 text-center font-[Baloo]">Help & Support</h2>
//             <form className="flex flex-col gap-4" onSubmit={submitContact}>
//               <input type="text" name="subject" value={contactData.subject} onChange={handleContactChange} placeholder="Subject" className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-200"/>
//               <textarea name="message" value={contactData.message} onChange={handleContactChange} placeholder="Message" rows={5} className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-200"/>
//               <button type="submit" className="bg-slate-200 text-gray-700 py-2 px-6 rounded-full font-semibold hover:bg-white hover:shadow-md">Send Message</button>
//             </form>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-pink-50">
//       {/* Sidebar */}
//       <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg p-6">
//         <div className="flex items-center gap-2 mb-8">
//           <QuizMeFavicon />
//           <h2 className="font-bold text-xl text-teal-700">QuizMe</h2>
//         </div>

//         <div className="flex flex-col items-center gap-2 mb-6">
//           <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
//             {profilePic ? <img src={profilePic} alt="Profile" className="w-full h-full object-cover"/> : <FaUserCircle className="w-full h-full text-gray-300"/>}
//           </div>
//           <span className="text-teal-700 font-semibold">{getGreeting()}</span>
//         </div>

//         <nav className="flex flex-col gap-3">
//           {sidebarItems.map(item => (
//             <button
//               key={item.key}
//               onClick={item.action ? item.action : () => setActiveTab(item.key)}
//               className={`flex items-center gap-2 p-3 rounded-xl hover:bg-pink-50 transition ${
//                 activeTab === item.key ? "bg-pink-100 font-semibold" : ""
//               }`}
//             >
//               <item.icon /> {item.label}
//             </button>
//           ))}
//         </nav>
//       </aside>

//       {/* Mobile Sidebar */}
//       <div className="md:hidden">
//         <button className="p-4" onClick={toggleMobileMenu}>
//           {mobileMenuOpen ? <FaTimes className="text-2xl text-teal-600"/> : <FaBars className="text-2xl text-teal-600"/>}
//         </button>
//         {mobileMenuOpen && (
//           <div className="absolute top-16 left-0 w-64 bg-white shadow-lg p-6 z-50 flex flex-col gap-3">
//             <div className="flex flex-col items-center gap-2 mb-6">
//               <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
//                 {profilePic ? <img src={profilePic} alt="Profile" className="w-full h-full object-cover"/> : <FaUserCircle className="w-full h-full text-gray-300"/>}
//               </div>
//               <span className="text-teal-700 font-semibold">{getGreeting()}</span>
//             </div>
//             {sidebarItems.map(item => (
//               <button
//                 key={item.key}
//                 onClick={() => {
//                   if (item.action) item.action();
//                   else setActiveTab(item.key);
//                   setMobileMenuOpen(false);
//                 }}
//                 className={`flex items-center gap-2 p-3 rounded-xl hover:bg-pink-50 transition ${
//                   activeTab === item.key ? "bg-pink-100 font-semibold" : ""
//                 }`}
//               >
//                 <item.icon /> {item.label}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Main Content */}
//       <main className="flex-1 p-6 md:p-10">
//         {renderContent()}
//       </main>
//     </div>
//   );
// }
import Sidebar from "../components/layout/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}
