import UpdatePasswordForm from "../../components/admin-profile/UpdatePasswordForm"
import AdminLayout from "../../components/layout/AdminLayout"

export const MyProfile = () => {
  return (
   <AdminLayout title={"My Profile"}>
   <div>
    <h3>Update User Profile</h3>
    <hr/>
   </div>
   
   <div className="mt-3">
    <h3>Update user Password</h3>
    <hr/>
    <UpdatePasswordForm/>
   </div>
   </AdminLayout>
  )
}

export default MyProfile
